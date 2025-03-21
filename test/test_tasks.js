const gb = require('glov-build');
const path = require('path');
const babel = require('glov-build-babel');
// const glov_build_browserify = require('glov-build-browserify');
const glov_build_browserify = require('..');

const targets = {
  dev: path.join(__dirname, 'out/test1/dev'),
};
exports.targets = targets;

const WORK_DIR = path.join(__dirname, 'work');
exports.WORK_DIR = WORK_DIR;
const STATE_DIR = path.join(__dirname, 'out/test1/.gbstate');
exports.STATE_DIR = STATE_DIR;

function configure() {
  gb.configure({
    source: WORK_DIR,
    statedir: STATE_DIR,
    targets,
    log_level: gb.LOG_SILLY,
  });
}
exports.configure = configure;

exports.registerTasks = function () {
  configure();

  gb.task({
    name: 'babel',
    input: '**/*.js',
    ...babel({
      sourcemap: {
        inline: true,
      },
      babel: {
        babelrc: false,
        presets: [['@babel/env', {
          targets: {
            ie: '10'
          },
          loose: true,
        }]],
      },
    }),
  });

  gb.task({
    name: 'bundle',
    target: 'dev',
    ...glov_build_browserify({
      entrypoint: 'client/main.js',
      source: 'babel',
      out: 'client/main.bundle.js',
      browserify: {
        transform: [],
        bundleExternal: true,
      },
      post_bundle_cb: (buf) => {
        // This super inefficient, don't do it like this, modifying the Buffer
        //   in-place is way better!
        return Buffer.from(buf.toString().replace('BUILD_TIMESTAMP', `"${Date.now()}"`));
      },
    }),
  });

  gb.task({
    name: 'default',
    deps: ['bundle'],
  });
};
