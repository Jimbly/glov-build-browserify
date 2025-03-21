const { doTestList, multiTest } = require('./test_runner.js');

const FILE_MAIN_JS = `
  const { test } = require('../common/foo.js');
  const isInteger = require('is-finite');
  test(console.log.bind(console, isFinite(7.7), 'Done!'));
`;
const FILE_FOO_JS = `
  export function test(next) {
    console.log('test!');
    next();
  }
`;
const OUT_BUNDLE_JS = `(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

module.exports = Number.isFinite || function (value) {
\treturn !(typeof value !== 'number' || value !== value || value === Infinity || value === -Infinity);
};

},{}],2:[function(require,module,exports){
"use strict";

var _require = require('../common/foo.js'),
    test = _require.test;

var isInteger = require('is-finite');

test(console.log.bind(console, isFinite(7.7), 'Done!'));

},{"../common/foo.js":3,"is-finite":1}],3:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.test = test;

function test(next) {
  console.log('test!');
  next();
}

},{}]},{},[2])


//# sourceMappingURL=main.bundle.js.map
`;
const OUT_BUNDLE_MAP = `{"version":3,"sources":["node_modules/browser-pack/_prelude.js","node_modules/is-finite/index.js","main.js","../common/common/foo.js"],"names":[],"mappings":"AAAA;ACAA;AACA;AACA;AACA;AACA;AACA;;;;ACJE,eAAiB,OAAO,CAAC,kBAAD,CAAxB;AAAA,IAAQ,IAAR,YAAQ,IAAR;;AACA,IAAM,SAAS,GAAG,OAAO,CAAC,WAAD,CAAzB;;AACA,IAAI,CAAC,OAAO,CAAC,GAAR,CAAY,IAAZ,CAAiB,OAAjB,EAA0B,QAAQ,CAAC,GAAD,CAAlC,EAAyC,OAAzC,CAAD,CAAJ;;;;;;;;ACFO,SAAS,IAAT,CAAc,IAAd,EAAoB;AACzB,EAAA,OAAO,CAAC,GAAR,CAAY,OAAZ;AACA,EAAA,IAAI;AACL","file":"main.bundle.js","sourceRoot":"","sourcesContent":["(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c=\\"function\\"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error(\\"Cannot find module '\\"+i+\\"'\\");throw a.code=\\"MODULE_NOT_FOUND\\",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u=\\"function\\"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()","'use strict';\\n\\nmodule.exports = Number.isFinite || function (value) {\\n\\treturn !(typeof value !== 'number' || value !== value || value === Infinity || value === -Infinity);\\n};\\n","\\n  const { test } = require('../common/foo.js');\\n  const isInteger = require('is-finite');\\n  test(console.log.bind(console, isFinite(7.7), 'Done!'));\\n","\\n  export function test(next) {\\n    console.log('test!');\\n    next();\\n  }\\n"]}`;

const FILE_DOUBLE_DEP = `
  const { test2 } = require('./delayed.js');
  const { test1 } = require('./dep1.js');
`;

doTestList([
  multiTest({ watch: true, serial: true }, [{
    name: 'canonical',
    tasks: ['default'],
    ops: {
      add: {
        'client/main.js': FILE_MAIN_JS,
        'common/foo.js': FILE_FOO_JS,
      }
    },
    outputs: {
      dev: {
        'client/main.bundle.js': OUT_BUNDLE_JS,
        'client/main.bundle.js.map': OUT_BUNDLE_MAP,
      },
    },
    results: {
      jobs: 3,
    },
  }]),

  multiTest({ watch: true, serial: true }, [{
    name: 'initial',
    tasks: ['default'],
    ops: {
      add: {
        'client/main.js': FILE_MAIN_JS,
        'common/foo.js': FILE_FOO_JS,
      }
    },
    outputs: {
      dev: {
        'client/main.bundle.js': OUT_BUNDLE_JS,
        'client/main.bundle.js.map': OUT_BUNDLE_MAP,
      },
    },
    results: {
      jobs: 3,
    },
  }, {
    name: 'spurious change',
    tasks: ['default'],
    ops: {
      spurious: [
        'client/main.js',
      ]
    },
    outputs: {
      dev: {
        'client/main.bundle.js': OUT_BUNDLE_JS,
        'client/main.bundle.js.map': OUT_BUNDLE_MAP,
      },
    },
    results: {
      errors: 0,
      warnings: 0,
      jobs: 0,
    },
  }]),

  multiTest({ watch: true, serial: true }, [{
    name: 'initial: missing file',
    tasks: ['default'],
    ops: {
      add: {
        'client/main.js': FILE_MAIN_JS,
      }
    },
    results: {
      errors: 1,
      jobs: 2,
    },
  }, {
    name: 'fixed',
    tasks: ['default'],
    ops: {
      add: {
        'common/foo.js': FILE_FOO_JS,
      }
    },
    outputs: {
      dev: {
        'client/main.bundle.js': OUT_BUNDLE_JS,
        'client/main.bundle.js.map': OUT_BUNDLE_MAP,
      },
    },
    results: {
      jobs: 2,
    },
  }]),

  multiTest({ watch: true, serial: true }, [{
    name: 'initial: missing file',
    tasks: ['default'],
    ops: {
      add: {
        'client/main.js': FILE_MAIN_JS,
      }
    },
    results: {
      errors: 1,
      jobs: 2,
    },
  }, {
    name: 'fixed',
    tasks: ['default'],
    ops: {
      add: {
        'common/foo.js': FILE_FOO_JS,
      }
    },
    outputs: {
      dev: {
        'client/main.bundle.js': OUT_BUNDLE_JS,
        'client/main.bundle.js.map': OUT_BUNDLE_MAP,
      },
    },
    results: {
      jobs: 2,
    },
  // TODO: need a depsReset somewhere, or some way to remove deps
  // }, {
  //   name: 'add old file looked for',
  //   tasks: ['default'],
  //   ops: {
  //     add: {
  //       'foo.js.js': 'unused',
  //     }
  //   },
  //   outputs: {
  //     dev: {
  //       'client/main.bundle.js': OUT_BUNDLE_JS,
  //       'client/main.bundle.js.map': OUT_BUNDLE_MAP,
  //     },
  //   },
  //   results: {
  //     jobs: 1,
  //   },
  }]),

  // Caused "job.depAdd() called on job that is no longer executing!" after test finished
  // Only happened reliably with a setTimeout in `isFile()`
  multiTest({ watch: true, serial: true }, [{
    name: 'multiple missing deps',
    tasks: ['default'],
    ops: {
      add: {
        'client/main.js': FILE_DOUBLE_DEP,
      }
    },
    results: {
      errors: 1,
      jobs: 2,
    },
  }]),

]);
