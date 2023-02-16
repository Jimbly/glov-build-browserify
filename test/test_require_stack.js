/* eslint-disable quote-props */
/* eslint-disable max-len */
const assert = require('assert');

const { requireStack } = require('../require_stack.js');

function forwardSlashes(str) {
  return str.replace(/\\/g, '/');
}

const SIMPLE = {
  1: {
    file: 'a',
    deps: {
      'assert': undefined,
      'b': 2,
    }
  },
  2: {
    file: 'b',
    deps: {},
  },
};
assert.deepEqual(requireStack(SIMPLE, 2), 'a => b');
assert.deepEqual(requireStack(SIMPLE, 1), 'a');

const MULTI = {
  1: {
    file: 'a',
    deps: {
      'assert': undefined,
      'b': 2,
      'c': 3,
    }
  },
  2: {
    file: 'b',
    deps: {
      'c': 3,
    },
  },
  3: {
    file: 'c',
    deps: {
      'b': 2,
    },
  },
};
assert.deepEqual(requireStack(MULTI, 2), 'a => b');
assert.deepEqual(requireStack(MULTI, 3), 'a => c');

const LOOP = {
  1: {
    file: 'a',
    deps: {
      'b': 2,
    }
  },
  2: {
    file: 'b',
    deps: {
      'assert': undefined,
      'a': 1,
      'c': 3,
    },
  },
  3: {
    file: 'c',
    deps: {},
  },
};
assert.deepEqual(requireStack(LOOP, 1), 'b => a'); // fine, I guess
assert.deepEqual(requireStack(LOOP, 2), 'a => b');
assert.deepEqual(requireStack(LOOP, 3), 'a => b => c');


const TRICKY = {
  1: {
    file: 'a',
    deps: {
      'b': 2,
    }
  },
  2: {
    file: 'b',
    deps: {
      'c': 3,
      'd': 4,
    },
  },
  3: {
    file: 'c',
    deps: {
      'd': 4,
    },
  },
  4: {
    file: 'd',
    deps: {},
  },
};
assert.deepEqual(requireStack(TRICKY, 4), 'a => b => d');

const REAL = {
  '1': {
    file: 'workdir/client/worker.js',
    deps: {
      '../glov/client/worker_thread.js': 57,
      '../glov/client/textures': 51
    }
  },
  '2': {
    file: 'workdir/glov/client/bootstrap.js',
    deps: { './polyfill.js': 38 }
  },
  '3': {
    file: 'workdir/glov/client/browser.js',
    deps: {}
  },
  '4': {
    file: 'workdir/glov/client/build_ui.js',
    deps: {
      './camera2d.js': 5,
      './ui.js': 53,
      './font.js': 17,
      './engine.js': 11,
      '../common/util.js': 71,
      '../common/vmath.js': 73,
      './net.js': 33,
      './scroll_area.js': 41
    }
  },
  '5': {
    file: 'workdir/glov/client/camera2d.js',
    deps: { assert: undefined, './engine.js': 11 }
  },
  '6': {
    file: 'workdir/glov/client/client_config.js',
    deps: { assert: undefined, '../common/enums': 65 }
  },
  '7': {
    file: 'workdir/glov/client/cmds.js',
    deps: {
      './error_report.js': 13,
      './engine.js': 11,
      './shaders.js': 44,
      './local_storage.js': 29,
      './textures.js': 51,
      '../common/cmd_parse.js': 62,
      '../common/wscommon.js': 74,
      './net.js': 33
    }
  },
  '8': {
    file: 'workdir/glov/client/dyn_geom.js',
    deps: {
      assert: undefined,
      'gl-mat4/lookAt': undefined,
      '../common/util.js': 71,
      './geom.js': 19,
      '../common/vmath.js': 73,
      './textures.js': 51,
      './shaders.js': 44,
      './sprites.js': 49,
      './engine.js': 11
    }
  },
  '9': {
    file: 'workdir/glov/client/edit_box.js',
    deps: {
      assert: undefined,
      './camera2d.js': 5,
      '../common/verify.js': 72,
      './localization.js': 30,
      './ui.js': 53,
      './spot.js': 48,
      './engine.js': 11,
      './input.js': 26
    }
  },
  '10': {
    file: 'workdir/glov/client/effects.js',
    deps: {
      assert: undefined,
      './engine.js': 11,
      './framebuffer.js': 18,
      './geom.js': 19,
      './sprites.js': 49,
      './shaders.js': 44,
      './textures.js': 51,
      '../common/vmath.js': 73
    }
  },
  '11': {
    file: 'workdir/glov/client/engine.js',
    deps: {
      assert: undefined,
      'gl-mat3/fromMat4': undefined,
      'gl-mat4/copy': undefined,
      'gl-mat4/invert': undefined,
      'gl-mat4/multiply': undefined,
      'gl-mat4/transpose': undefined,
      'gl-mat4/perspective': undefined,
      './local_storage.js': 29,
      './settings.js': 42,
      './shaders.js': 44,
      './textures.js': 51,
      '../common/util.js': 71,
      './urlhash.js': 54,
      './cmds.js': 7,
      './browser.js': 3,
      '../common/perfcounters.js': 69,
      '../common/verify.js': 72,
      '../common/vmath.js': 73,
      './effects.js': 10,
      './camera2d.js': 5,
      './framebuffer.js': 18,
      './profiler.js': 39,
      './bootstrap.js': 2,
      './geom.js': 19,
      './transition.js': 52,
      './particles.js': 34,
      './profiler_ui.js': 40,
      './client_config.js': 6,
      './shader_debug_ui.js': 43,
      './font.js': 17,
      './spot.js': 48,
      './build_ui.js': 4,
      './error_report.js': 13,
      './input.js': 26,
      './perf.js': 35,
      './sprites.js': 49,
      './ui.js': 53,
      './sound.js': 47,
      './models.js': 32
    }
  },
  '12': {
    file: 'workdir/glov/client/environments.js',
    deps: {
      assert: undefined,
      './client_config': 6,
      './cmds': 7,
      './net': 33,
      './urlhash': 54
    }
  },
  '13': {
    file: 'workdir/glov/client/error_report.js',
    deps: { './client_config.js': 6, './fetch.js': 15, './environments': 12 }
  },
  '14': {
    file: 'workdir/glov/client/fbinstant.js',
    deps: {
      './local_storage.js': 29,
      '../common/enums.js': 65,
      './urlhash.js': 54,
      './error_report.js': 13,
      '../common/util.js': 71,
      './social.js': 46
    }
  },
  '15': {
    file: 'workdir/glov/client/fetch.js',
    deps: { assert: undefined, '../common/util.js': 71 }
  },
  '16': {
    file: 'workdir/glov/client/filewatch.js',
    deps: { assert: undefined }
  },
  '17': {
    file: 'workdir/glov/client/font.js',
    deps: {
      assert: undefined,
      './camera2d.js': 5,
      './geom.js': 19,
      './engine.js': 11,
      './shaders.js': 44,
      '../common/util.js': 71,
      '../common/vmath.js': 73,
      './sprites.js': 49,
      './textures.js': 51,
      './localization.js': 30
    }
  },
  '18': {
    file: 'workdir/glov/client/framebuffer.js',
    deps: {
      assert: undefined,
      './browser.js': 3,
      './cmds.js': 7,
      './effects.js': 10,
      './engine.js': 11,
      './settings.js': 42,
      './textures.js': 51,
      './perf.js': 35
    }
  },
  '19': {
    file: 'workdir/glov/client/geom.js',
    deps: {
      assert: undefined,
      './shaders.js': 44,
      './engine.js': 11,
      './settings.js': 42,
      './perf.js': 35,
      './cmds.js': 7
    }
  },
  '20': {
    file: 'workdir/glov/client/glb/decode-utf8.js',
    deps: {}
  },
  '21': {
    file: 'workdir/glov/client/glb/gltf-type-utils.js',
    deps: {}
  },
  '22': {
    file: 'workdir/glov/client/glb/parser.js',
    deps: {
      assert: undefined,
      './gltf-type-utils.js': 21,
      './unpack-binary-json.js': 23,
      './decode-utf8.js': 20,
      './unpack-glb-buffers.js': 24
    }
  },
  '23': {
    file: 'workdir/glov/client/glb/unpack-binary-json.js',
    deps: {}
  },
  '24': {
    file: 'workdir/glov/client/glb/unpack-glb-buffers.js',
    deps: { assert: undefined, './gltf-type-utils.js': 21 }
  },
  '25': {
    file: 'workdir/glov/client/in_event.js',
    deps: { assert: undefined }
  },
  '26': {
    file: 'workdir/glov/client/input.js',
    deps: {
      assert: undefined,
      '../common/util.js': 71,
      './browser.js': 3,
      './camera2d.js': 5,
      './engine.js': 11,
      './cmds.js': 7,
      '../common/vmath.js': 73,
      './local_storage.js': 29,
      './sound.js': 47,
      './settings.js': 42,
      './spot.js': 48,
      './input_constants': 27,
      './in_event.js': 25,
      './pointer_lock.js': 37
    }
  },
  '27': {
    file: 'workdir/glov/client/input_constants.js',
    deps: {}
  },
  '28': {
    file: 'workdir/glov/client/link.js',
    deps: {
      assert: undefined,
      './font.js': 17,
      './in_event.js': 25,
      './engine.js': 11,
      './camera2d.js': 5,
      './ui.js': 53,
      './settings.js': 42,
      './spot.js': 48,
      './input.js': 26
    }
  },
  '29': {
    file: 'workdir/glov/client/local_storage.js',
    deps: { assert: undefined }
  },
  '30': {
    file: 'workdir/glov/client/localization.js',
    deps: {}
  },
  '31': {
    file: 'workdir/glov/client/mat43.js',
    deps: {}
  },
  '32': {
    file: 'workdir/glov/client/models.js',
    deps: {
      assert: undefined,
      '../common/vmath.js': 73,
      './engine.js': 11,
      './geom.js': 19,
      './shaders.js': 44,
      './textures.js': 51,
      './webfs.js': 56,
      './glb/gltf-type-utils.js': 21,
      './fetch.js': 15,
      './glb/parser.js': 22
    }
  },
  '33': {
    file: 'workdir/glov/client/net.js',
    deps: {
      './filewatch.js': 16,
      '../common/wscommon.js': 74,
      './wsclient.js': 58,
      '../common/packet.js': 68,
      './subscription_manager.js': 50
    }
  },
  '34': {
    file: 'workdir/glov/client/particles.js',
    deps: {
      assert: undefined,
      '../common/vmath.js': 73,
      './textures.js': 51,
      './sprites.js': 49
    }
  },
  '35': {
    file: 'workdir/glov/client/perf.js',
    deps: {
      './camera2d.js': 5,
      './cmds.js': 7,
      './engine.js': 11,
      '../common/perfcounters.js': 69,
      './font.js': 17,
      './profiler_ui.js': 40,
      '../common/vmath.js': 73,
      './sprites.js': 49,
      './settings.js': 42,
      './ui.js': 53,
      './input.js': 26,
      './net.js': 33,
      './perf_net.js': 36
    }
  },
  '36': {
    file: 'workdir/glov/client/perf_net.js',
    deps: {
      './settings': 42,
      '../common/wscommon': 74,
      './cmds': 7,
      './perf': 35
    }
  },
  '37': {
    file: 'workdir/glov/client/pointer_lock.js',
    deps: { '../common/util.js': 71 }
  },
  '38': {
    file: 'workdir/glov/client/polyfill.js',
    deps: {}
  },
  '39': {
    file: 'workdir/glov/client/profiler.js',
    deps: { assert: undefined, './engine.js': 11, './local_storage.js': 29 }
  },
  '40': {
    file: 'workdir/glov/client/profiler_ui.js',
    deps: {
      './engine.js': 11,
      './camera2d.js': 5,
      './cmds.js': 7,
      './font.js': 17,
      './input.js': 26,
      './perf.js': 35,
      './ui.js': 53,
      './sprites.js': 49,
      './settings.js': 42,
      '../common/util.js': 71,
      '../common/vmath.js': 73,
      './profiler.js': 39,
      './net.js': 33
    }
  },
  '41': {
    file: 'workdir/glov/client/scroll_area.js',
    deps: {
      assert: undefined,
      '../common/vmath': 73,
      './input.js': 26,
      './ui.js': 53,
      './engine.js': 11,
      './sprites.js': 49,
      './camera2d.js': 5,
      './spot.js': 48,
      '../common/util.js': 71,
      '../common/verify.js': 72
    }
  },
  '42': {
    file: 'workdir/glov/client/settings.js',
    deps: {
      assert: undefined,
      '../common/util.js': 71,
      './engine.js': 11,
      './cmds.js': 7
    }
  },
  '43': {
    file: 'workdir/glov/client/shader_debug_ui.js',
    deps: {
      './font.js': 17,
      './camera2d.js': 5,
      './cmds.js': 7,
      './engine.js': 11,
      './shaders.js': 44,
      './input.js': 26,
      '../common/vmath.js': 73,
      '../common/util.js': 71,
      './ui.js': 53,
      './settings.js': 42,
      './scroll_area.js': 41,
      './fetch.js': 15
    }
  },
  '44': {
    file: 'workdir/glov/client/shaders.js',
    deps: {
      assert: undefined,
      './filewatch.js': 16,
      './engine.js': 11,
      '../common/util.js': 71,
      './textures.js': 51,
      './error_report.js': 13,
      './webfs.js': 56
    }
  },
  '45': {
    file: 'workdir/glov/client/slider.js',
    deps: {
      assert: undefined,
      '../common/vmath.js': 73,
      '../common/util.js': 71,
      './spot.js': 48,
      './input.js': 26,
      './ui.js': 53
    }
  },
  '46': {
    file: 'workdir/glov/client/social.js',
    deps: {
      assert: undefined,
      './client_config': 6,
      '../common/enums': 65,
      './cmds': 7,
      '../common/util': 71,
      './input': 26,
      './net': 33,
      './sprites': 49,
      './textures': 51,
      '../common/friends_data': 66
    }
  },
  '47': {
    file: 'workdir/glov/client/sound.js',
    deps: {
      assert: undefined,
      '@jimbly/howler/src/howler.core.js': undefined,
      './cmds': 7,
      '../common/util': 71,
      './filewatch': 16,
      './browser': 3,
      './urlhash': 54,
      './settings': 42,
      './fbinstant': 14
    }
  },
  '48': {
    file: 'workdir/glov/client/spot.js',
    deps: {
      assert: undefined,
      '../common/verify': 72,
      './font.js': 17,
      './camera2d.js': 5,
      './engine.js': 11,
      './input.js': 26,
      './settings.js': 42,
      './ui.js': 53,
      './input_constants': 27
    }
  },
  '49': {
    file: 'workdir/glov/client/sprites.js',
    deps: {
      assert: undefined,
      './camera2d.js': 5,
      './geom.js': 19,
      './textures.js': 51,
      './engine.js': 11,
      '../common/util.js': 71,
      '../common/vmath.js': 73,
      './shaders.js': 44,
      './dyn_geom.js': 8
    }
  },
  '50': {
    file: 'workdir/glov/client/subscription_manager.js',
    deps: {
      assert: undefined,
      './client_config': 6,
      '../common/packet': 68,
      '../common/perfcounters': 69,
      './local_storage': 29,
      './fbinstant': 14,
      '../common/util': 71,
      './net': 33,
      '../common/md5': 67,
      '../common/tiny-events': 70,
      './walltime': 55,
      '../common/dot-prop': 64,
      '../common/chunked_send': 61
    }
  },
  '51': {
    file: 'workdir/glov/client/textures.js',
    deps: {
      assert: undefined,
      './filewatch': 16,
      '../common/util': 71,
      './local_storage': 29,
      './urlhash': 54,
      './shaders': 44,
      './engine': 11,
      './settings': 42
    }
  },
  '52': {
    file: 'workdir/glov/client/transition.js',
    deps: {
      assert: undefined,
      './engine.js': 11,
      './framebuffer.js': 18,
      './effects.js': 10,
      './sprites.js': 49,
      './shaders.js': 44,
      './textures.js': 51,
      './ui.js': 53,
      '../common/util.js': 71,
      '../common/vmath.js': 73,
      '../common/verify.js': 72,
      './camera2d.js': 5
    }
  },
  '53': {
    file: 'workdir/glov/client/ui.js',
    deps: {
      assert: undefined,
      './camera2d.js': 5,
      './effects.js': 10,
      './engine.js': 11,
      './font.js': 17,
      './input.js': 26,
      './sound.js': 47,
      './spot.js': 48,
      '../common/util.js': 71,
      './textures.js': 51,
      './sprites.js': 49,
      '../common/vmath.js': 73,
      './scroll_area.js': 41,
      './localization.js': 30,
      './mat43.js': 31,
      './slider.js': 45,
      './edit_box.js': 9,
      './link.js': 28
    }
  },
  '54': {
    file: 'workdir/glov/client/urlhash.js',
    deps: { assert: undefined, '../common/util.js': 71 }
  },
  '55': {
    file: 'workdir/glov/client/walltime.js',
    deps: {}
  },
  '56': {
    file: 'workdir/glov/client/webfs.js',
    deps: {
      assert: undefined,
      './filewatch.js': 16,
      './urlhash.js': 54,
      '../common/util.js': 71
    }
  },
  '57': {
    file: 'workdir/glov/client/worker_thread.js',
    deps: { assert: undefined, './polyfill.js': 38 }
  },
  '58': {
    file: 'workdir/glov/client/wsclient.js',
    deps: {
      assert: undefined,
      '../common/ack.js': 59,
      './environments': 12,
      './error_report.js': 13,
      './urlhash.js': 54,
      '../common/perfcounters.js': 69,
      './fetch.js': 15,
      './client_config.js': 6,
      '../common/wscommon.js': 74
    }
  },
  '59': {
    file: 'workdir/glov/common/ack.js',
    deps: { assert: undefined, './packet.js': 68, './perfcounters.js': 69 }
  },
  '60': {
    file: 'workdir/glov/common/base64.js',
    deps: { buffer: undefined }
  },
  '61': {
    file: 'workdir/glov/common/chunked_send.js',
    deps: {
      assert: undefined,
      'glov-async': undefined,
      './packet.js': 68,
      './crc32.js': 63
    }
  },
  '62': {
    file: 'workdir/glov/common/cmd_parse.js',
    deps: { assert: undefined, './util.js': 71, './perfcounters.js': 69 }
  },
  '63': {
    file: 'workdir/glov/common/crc32.js',
    deps: {}
  },
  '64': {
    file: 'workdir/glov/common/dot-prop.js',
    deps: { './util.js': 71 }
  },
  '65': {
    file: 'workdir/glov/common/enums.js',
    deps: {}
  },
  '66': {
    file: 'workdir/glov/common/friends_data.js',
    deps: {}
  },
  '67': {
    file: 'workdir/glov/common/md5.js',
    deps: { assert: undefined }
  },
  '68': {
    file: 'workdir/glov/common/packet.js',
    deps: {
      assert: undefined,
      buffer: undefined,
      './util.js': 71,
      './base64.js': 60
    }
  },
  '69': {
    file: 'workdir/glov/common/perfcounters.js',
    deps: {}
  },
  '70': {
    file: 'workdir/glov/common/tiny-events.js',
    deps: { assert: undefined }
  },
  '71': {
    file: 'workdir/glov/common/util.js',
    deps: { assert: undefined }
  },
  '72': {
    file: 'workdir/glov/common/verify.js',
    deps: {}
  },
  '73': {
    file: 'workdir/glov/common/vmath.js',
    deps: { 'gl-mat3/create': undefined, 'gl-mat4/create': undefined }
  },
  '74': {
    file: 'workdir/glov/common/wscommon.js',
    deps: {
      assert: undefined,
      './perfcounters.js': 69,
      './packet.js': 68,
      './ack.js': 59
    }
  }
};

const path = require('path');
const base_path = 'workdir/client/';
function mapper(file) {
  return forwardSlashes(path.relative(base_path, file));
}

assert.deepEqual(requireStack(REAL, 54, mapper), 'worker.js => ../glov/client/textures.js => ../glov/client/urlhash.js');

console.log('OK');
