const { doTestList, multiTest } = require('./test_runner.js');

const FILE_MAIN_JS = `
  const { test } = require('./foo.js');
  const { asyncSeries } = require('glov-async');
  asyncSeries([test, test], console.log.bind(console, 'Done!'));
`;
const FILE_FOO_JS = `
  export function test(next) {
    console.log('test!');
    next();
  }
`;
// eslint-disable-next-line max-len
const OUT_BUNDLE_JS = `(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.test = test;

function test(next) {
  console.log('test!');
  next();
}

},{}],2:[function(require,module,exports){
"use strict";

var _require = require('./foo.js'),
    test = _require.test;

var _require2 = require('glov-async'),
    asyncSeries = _require2.asyncSeries;

asyncSeries([test, test], console.log.bind(console, 'Done!'));

},{"./foo.js":1,"glov-async":undefined}]},{},[2])


//# sourceMappingURL=main.bundle.js.map
`;
// eslint-disable-next-line max-len, quotes
const OUT_BUNDLE_MAP = `{"version":3,"sources":["../../../../../../../node_modules/browser-pack/_prelude.js","foo.js","main.js"],"names":[],"mappings":"AAAA;;;;;;ACCS,SAAS,IAAT,CAAc,IAAd,EAAoB;AACzB,EAAA,OAAO,CAAC,GAAR,CAAY,OAAZ;AACA,EAAA,IAAI;AACL;;;;;ACHD,eAAiB,OAAO,CAAC,UAAD,CAAxB;AAAA,IAAQ,IAAR,YAAQ,IAAR;;AACA,gBAAwB,OAAO,CAAC,YAAD,CAA/B;AAAA,IAAQ,WAAR,aAAQ,WAAR;;AACA,WAAW,CAAC,CAAC,IAAD,EAAO,IAAP,CAAD,EAAe,OAAO,CAAC,GAAR,CAAY,IAAZ,CAAiB,OAAjB,EAA0B,OAA1B,CAAf,CAAX","file":"generated.js","sourceRoot":"","sourcesContent":["(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c=\\"function\\"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error(\\"Cannot find module '\\"+i+\\"'\\");throw a.code=\\"MODULE_NOT_FOUND\\",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u=\\"function\\"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()","\\n  export function test(next) {\\n    console.log('test!');\\n    next();\\n  }\\n","\\n  const { test } = require('./foo.js');\\n  const { asyncSeries } = require('glov-async');\\n  asyncSeries([test, test], console.log.bind(console, 'Done!'));\\n"]}`;

doTestList([
  multiTest({ watch: true, serial: true }, [{
    name: 'initial',
    tasks: ['default'],
    ops: {
      add: {
        'main.js': FILE_MAIN_JS,
        'foo.js': FILE_FOO_JS,
      }
    },
    outputs: {
      dev: {
        'main.bundle.js': OUT_BUNDLE_JS,
        'main.bundle.js.map': OUT_BUNDLE_MAP,
      },
    },
    results: { // same for both
      fs_read: 2,
      fs_write: 4,
      fs_stat: 2,
      fs_delete: 0,
      jobs: 3,
    },
  }]),
]);
