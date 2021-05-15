const assert = require('assert');
const fs = require('fs');
const path = require('path');
const sourcemap = require('glov-build-sourcemap');
// const through = require('through2');

function forwardSlashes(str) {
  return str.replace(/\\/g, '/');
}

module.exports = function bundle(opts) {
  // entrypoint: 'client/app.js',
  // source: 'client_intermediate',
  // out: 'client/app.bundle.js',
  // sourcemap: false, // defaults true
  // browserify: {}
  // post_bundle_cb: function
  const { entrypoint, out, post_bundle_cb } = opts;
  let source = opts.source || 'source';
  let do_sourcemaps = opts.sourcemap !== false;
  let browserify_opts = { ...(opts.browserify || {}) };
  if (do_sourcemaps) {
    browserify_opts.debug = true;
  }
  let out_name = out || entrypoint.replace('.js', '.bundle.js'); // Or just use entrypoint?

  let browserify;
  function bundleTaskInit(next) {
    browserify = require('@jimbly/browserify'); // eslint-disable-line global-require
    if (browserify_opts.transform) {
      browserify_opts.transform.forEach((row) => {
        if (typeof row[0] === 'string') {
          // pre-load for timing/pipelining purposes
          require(row[0]); // eslint-disable-line global-require
        }
      });
    }
    next();
  }

  // This option is passed to `module-deps`
  // It allows us to source our own files from our job layer instead of requiring
  //   them to exist on-disk relative to any particular path.
  function persistentCache(job,
    file_name, // the path to the file that is loaded
    id,   // the id that is used to reference this file
    pkg,  // the package that this file belongs to fallback
    fallback, // async fallback handler to be called if the cache doesn't hold the given file
    cb    // callback handler that receives the cache data
  ) {
    let user_data = job.getUserData();
    let { base_path, cache } = user_data;
    let relative = forwardSlashes(path.relative(base_path, file_name));
    // TODO: if outside of our base, or node_modules, just do simple caching and/or just pass it to `fallback`?
    let key = `${source}:${relative}`;
    let cache_entry = cache[key];
    if (cache_entry) {
      if (cache_entry.cbs) {
        cache_entry.cbs.push(cb);
      } else {
        cb(cache_entry.err, cache_entry.data);
      }
      return;
    }
    if (!user_data.job_in_progress) {
      return void cb('Job already completed');
    }
    // TODO: when/how do we reset or remove deps?  Bundle will grow until build task is restarted, otherwise
    cache_entry = {
      cbs: [cb],
    };
    cache[key] = cache_entry;
    function handleResult(err, data) {
      let cbs = cache_entry.cbs;
      cache_entry.err = err;
      cache_entry.data = data;
      cache_entry.cbs = null;
      for (let ii = 0; ii < cbs.length; ++ii) {
        cbs[ii](cache_entry.err, cache_entry.data);
      }
    }
    job.depAdd(key, function (err, buildfile) {
      assert.equal(buildfile.key, key);
      if (err) {
        return void handleResult(err);
      }

      fallback(buildfile.contents.toString(), function (error, cacheableEntry) {
        // cacheableEntry = {
        //   source: buildfile.contents.toString(),
        //   package: pkg, // The package for housekeeping
        //   deps: {
        //       'id':  // id that is used to reference a required file
        //       'file' // file path to the required file
        //   }
        // }
        return void handleResult(error, cacheableEntry);
      });
    });
  }

  function resolveOpts(job, base_path) {
    return {
      readFile: function readFile(file_name, cb) {
        file_name = forwardSlashes(file_name);
        assert(file_name.endsWith('package.json')); // This is the only file that should be read by `resolve`?
        if (file_name.startsWith(base_path)) {
          // A file in our source directory, get it from the build system and
          // add it as a dependency, even if it does not (yet) exist.
          let relative = forwardSlashes(path.relative(base_path, file_name));
          let key = `${source}:${relative}`;
          return job.depAdd(key, function (err, buildfile) {
            cb(err, buildfile.contents);
          });
        }
        // Outside of the build directories (node_modules dependency) - just hit
        //   the disk, will not get dynamic reprocessing if it changes
        fs.readFile(file_name, cb);
      },
      isFile: function isFile(file_name, cb) {
        file_name = forwardSlashes(file_name);
        if (file_name.startsWith(base_path)) {
          // A file in our source directory, get it from the build system and
          // add it as a dependency, even if it does not (yet) exist.
          let relative = forwardSlashes(path.relative(base_path, file_name));
          let key = `${source}:${relative}`;
          return job.depAdd(key, function (err, buildfile) {
            cb(null, !err);
          });
        }
        if (file_name.startsWith(job.gb.config.statedir)) {
          // Inside our state dir, but not our source; block
          return cb(null, false);
        }
        if (file_name.indexOf('/node_modules') === -1) {
          // Not in the node_modules folder, shouldn't be of interest or accessing this
          return cb(null, false);
        }
        // Outside of the build directories (node_modules dependency) - just hit
        //   the disk, will not get dynamic reprocessing if it changes
        fs.stat(file_name, function (err, stat) {
          if (!err) {
            return cb(null, stat.isFile() || stat.isFIFO());
          }
          if (err.code === 'ENOENT' || err.code === 'ENOTDIR') {
            return cb(null, false);
          }
          return cb(err);
        });
      },
      isDirectory: function isDirectory(file_name, cb) {
        file_name = forwardSlashes(file_name);
        // This is only called for finding the node_modules folder?
        assert(file_name.indexOf('/node_modules') !== -1);
        if (file_name.startsWith(job.gb.config.statedir)) {
          // Inside our state dir
          return cb(null, false);
        }
        fs.stat(file_name, function (err, stat) {
          if (!err) {
            return cb(null, stat.isDirectory());
          }
          if (err.code === 'ENOENT' || err.code === 'ENOTDIR') {
            return cb(null, false);
          }
          return cb(err);
        });
      },
    };
  }

  function bundleTask(job, done) {
    let user_data = job.getUserData();
    let { b, cache } = user_data;
    let the_file = job.getFile();
    if (!b) {
      cache = {};
      user_data.cache = cache;
      let base_path = the_file.getBucketDir();
      user_data.base_path = base_path;
      browserify_opts.persistentCache = persistentCache.bind(null, job);

      let disk_path = the_file.getDiskPath();
      browserify_opts.basedir = path.dirname(disk_path);
      browserify_opts.resolve = resolveOpts(job, base_path);
      b = browserify(disk_path, browserify_opts);
      user_data.b = b;
      b.on('log', job.log.bind(job)); // output build logs to terminal
    }

    let updated = job.getFilesUpdated();
    for (let ii = 0; ii < updated.length; ++ii) {
      let file = updated[ii];
      delete cache[file.key];
    }

    // b.pipeline.get('deps').push(through.obj(function (obj, enc, next) {
    //   let log = {};
    //   for (let key in obj) {
    //     let v = obj[key];
    //     if (v && v.length && v.length > 80) {
    //       v = `${v.slice(0,40)}...${v.slice(-37)}`;
    //     }
    //     log[key] = v;
    //   }
    //   console.log(log);
    //   this.push(obj);
    //   next();
    // }));


    user_data.job_in_progress = true;
    b.bundle(function (err, buf) {
      if (!user_data.job_in_progress) {
        // already called this!  Probably an error, log this somewhere, though?
        return;
      }
      user_data.job_in_progress = false;
      if (err) {
        return void done(err);
      }

      if (post_bundle_cb) {
        buf = post_bundle_cb(buf) || buf;
      }

      if (do_sourcemaps) {
        sourcemap.out(job, {
          relative: out_name,
          contents: String(buf),
          inline: false,
        });
      } else {
        job.out({
          relative: out_name,
          contents: buf,
        });
      }

      done();
    });
  }

  return {
    type: 'single',
    init: bundleTaskInit,
    func: bundleTask,
    input: `${source}:${entrypoint}`,
  };
};
