Browserify task processor for [glov-build](https://github.com/Jimbly/glov-build)
=============================

Efficient caching and run-time dynamic reprocessing of bundles with `browserify`.

API usage:
```javascript
const browserify = require('glov-build-browserify');


gb.task({
  name: ...,
  ...browserify(options),
});

```
Options
* **`entrypoint`** - Required. The main/entrypoint file to start bundling. This is passed to `browserify` as the first argument, after resolving to an on-disk path
* **`source`** - Optional source bucket to find the entrypoint and other dependencies.  Default: `"source"`
* **`out`** - Optional output file.  Default: `entrypoint.replace('.js', '.bundle.js')`
* **`sourcemap`** - Specify false if you are crazy and do not want sourcemaps loaded and generated.  Default: `true`
* **`browserify`** - Arbitrary options to pass to `browserify`.  Default: `{}`
* **`post_bundle_cb`** - Optional function to run on the bundled source code (as a Buffer) before outputting.  Allows injecting build timestamps or similar things.  Note that for anything more complicated than character replacement, this is not modifying sourcemaps, so your sourcemaps may become invalid.  For those cases, prefer a separate task that takes the output from this task.

Example usage:
```javascript

// In this example, we *first* pass our source files through `babel`, and
// then bundle them in browserify.  This is _orders of magnitude_ more efficient
// than using babel as a transform in browserify's pipeline, because babel
// (which is very slow) only ever gets run on each source file once per change,
// even between restarts of your build pipeline.

const babel = require('glov-build-babel');
gb.task({
  name: 'babel',
  input: '*.js',
  ...babel(),
});

const glov_build_browserify = require('glov-build-browserify');
gb.task({
  name: 'bundle',
  target: 'dev',
  ...glov_build_browserify({
    entrypoint: 'client/main.js',
    source: 'babel',
    out: 'main.bundle.js',
    browserify: {
      transform: [],
      bundleExternal: false,
    },
    post_bundle_cb: (buf) => {
      // This super inefficient, don't do it like this, modifying the Buffer
      //   in-place is way better!
      return Buffer.from(buf.toString().replace('BUILD_TIMESTAMP', `"${Date.now()}"`));
    },
  }),
});

```
