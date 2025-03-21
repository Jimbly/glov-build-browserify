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
assert.deepEqual(requireStack(SIMPLE, 2, 'a'), 'a => b');
assert.deepEqual(requireStack(SIMPLE, 1, 'a'), 'a');

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
assert.deepEqual(requireStack(MULTI, 2, 'a'), 'a => b');
assert.deepEqual(requireStack(MULTI, 3, 'a'), 'a => c');

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
assert.deepEqual(requireStack(LOOP, 1, 'a'), 'a');
assert.deepEqual(requireStack(LOOP, 2, 'a'), 'a => b');
assert.deepEqual(requireStack(LOOP, 3, 'a'), 'a => b => c');


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
assert.deepEqual(requireStack(TRICKY, 4, 'a'), 'a => b => d');

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

assert.deepEqual(requireStack(REAL, 54, 'workdir/client/worker.js', mapper), 'worker.js => ../glov/client/textures.js => ../glov/client/urlhash.js');

const BIG = {"1":{"file":"workdir/client/abtests_worlds_client.js","deps":{"../glov/client/abtests_client":242,"../glov/client/engine.js":255,"../common/abtests_worlds_common":193}},"2":{"file":"workdir/client/access_control.js","deps":{"../common/editvolume_common.js":197,"../common/globals.js":201,"./editvolume_client.js":72,"./layout.js":100,"./menu.js":119,"./main_menu.js":115,"./status.js":158,"./styles.js":162,"./waygate_ui.js":183,"./user_data.js":174,"./voxel_data.js":179,"../common/world_constants.js":217,"./world_info_view.js":188,"./world_comm.js":186,"./main.js":114,"./ui_util.js":172,"../glov/client/cmds.js":249,"../glov/client/engine.js":255,"../glov/client/input.js":276,"./localization/localization":110,"../glov/client/selection_box.js":295,"../glov/client/net.js":284,"../glov/client/scroll_area.js":294,"../glov/client/ui.js":311,"../glov/common/vmath.js":337,"../glov/common/util.js":335}},"3":{"file":"workdir/client/account_ui.js","deps":{"./analytics.js":5,"./styles.js":162,"../glov/client/external_users_client":261,"../glov/client/subscription_manager":308,"./localization/localization":110,"../glov/client/engine.js":255,"../glov/client/local_storage.js":279,"../glov/client/font.js":265,"../glov/common/util.js":335,"../glov/common/vmath.js":337,"../glov/client/link.js":278,"../glov/client/net.js":284,"../glov/client/input.js":276,"../glov/client/ui.js":311,"../glov/client/wsclient.js":318,"../glov/client/sprites.js":307,"../glov/client/client_config.js":248,"./iframe_content_handlers.js":88,"../common/external_users/external_users_provider_ids":200,"./abtests_worlds_client":1}},"4":{"file":"workdir/client/ai.js","deps":{"../common/entity_worlds_common":199,"../common/globals":201,"./client_entities":35,"./voxel_data":179,"./main":114,"./voxel_chunk_manager":178,"../glov/client/engine":255,"../glov/common/vmath":337}},"5":{"file":"workdir/client/analytics.js","deps":{"../common/globals":201,"../glov/client/fbinstant":262,"../glov/client/client_config":248,"../glov/client/environments":259,"../glov/client/net":284,"../glov/common/md5":329,"../frvr/client/frvr-analytics.js":220}},"6":{"file":"workdir/client/analytics_ftue.js","deps":{"./analytics":5,"../glov/client/subscription_manager":308}},"7":{"file":"workdir/client/animation.js","deps":{"./animation_enum.js":8,"./client_entities.js":35,"./particle_system.js":128,"../glov/client/engine.js":255,"../glov/client/fetch.js":263,"../glov/client/net.js":284,"../glov/client/filewatch.js":264,"../glov/common/util.js":335,"../glov/common/vmath.js":337,"../glov/client/quat.js":292,"../glov/client/urlhash.js":312,"../glov/client/webfs.js":314}},"8":{"file":"workdir/client/animation_enum.js","deps":{}},"9":{"file":"workdir/client/animation_player.js","deps":{"./cosmetics.js":55,"./animation.js":7,"./voxel_data_xraw.js":180,"../glov/common/util.js":335,"../glov/client/engine.js":255}},"10":{"file":"workdir/client/app_access.js","deps":{"./world_comm.js":186,"../glov/client/client_config":248,"./localization/localization":110,"../glov/client/net.js":284}},"11":{"file":"workdir/client/app_settings.js","deps":{"./character_controller.js":30,"../glov/client/browser.js":244,"../glov/client/cmds.js":249,"../glov/client/settings.js":296}},"12":{"file":"workdir/client/atlas_params.json","deps":{}},"13":{"file":"workdir/client/auto_activate_ui.js","deps":{"../common/leapgate_common":205,"../common/ids":202,"./leapgate_ui":101,"./main":114,"./status":158,"./waygate_ui":183,"../glov/client/engine":255,"../glov/common/vmath":337}},"14":{"file":"workdir/client/autogen/item_defs.js","deps":{"../../common/ids.js":202,"../tiles.js":164,"../../common/materials_common":206,"../items.js":99,"../../glov/common/vmath.js":337,"../localization/localization":110,"../../glov/common/util.js":335}},"15":{"file":"workdir/client/autogen/liquid_tiles_data.js","deps":{"../tiles_const":165,"../../common/ids":202,"../../common/materials_common":206,"../../glov/common/vmath":337,"../../glov/client/hsv":274}},"16":{"file":"workdir/client/autogen/tiles_data.js","deps":{"../../common/materials_common":206,"../../common/ids":202,"../tiles_const":165,"../../glov/common/vmath":337,"../../glov/client/hsv":274}},"17":{"file":"workdir/client/baking.js","deps":{"./palette":125,"./main":114,"../common/materials_common.js":206,"./tiles":164,"./voxel_data_xraw":180,"../common/globals":201,"./voxel_data":179,"../glov/client/engine":255,"../glov/client/filewatch":264,"../glov/client/webfs":314,"../glov/client/quat":292,"../glov/common/vmath":337,"../glov/common/util":335,"../glov/common/verify":336,"./mesh_calc":120,"./task_sched":163}},"18":{"file":"workdir/client/base_controller.js","deps":{"../common/globals":201,"./camera":28,"./voxel_data":179,"../glov/common/util":335,"../glov/common/verify":336,"../glov/common/vmath":337}},"19":{"file":"workdir/client/biome_details.js","deps":{"../common/globals.js":201,"./proc_gen_biomes.js":135,"./proc_gen.js":134,"./tiles.js":164,"./rand_seed.js":147,"./proc_gen_constants.js":136,"../common/voxel_data_common.js":214,"../glov/common/rand_alea.js":332,"../glov/common/util.js":335,"../glov/common/vmath.js":337,"./detail_gen_base.js":63,"./detail_generators.js":65}},"20":{"file":"workdir/client/biome_types.js","deps":{"../common/globals":201,"../common/materials_common":206,"./flora_constants":85,"../common/ids":202,"./tiles":164,"./proc_gen_constants":136,"../common/waygate_common":215}},"21":{"file":"workdir/client/block_intersections.js","deps":{"./main.js":114,"./camera.js":28,"./proc_gen_biomes.js":135,"./tiles.js":164,"./voxel_data.js":179,"../glov/client/cmds.js":249,"../glov/client/settings.js":296,"../glov/client/engine.js":255,"../glov/common/vmath.js":337}},"22":{"file":"workdir/client/bluebox_edit_list.js","deps":{"./camera.js":28,"./bluebox_ui.js":23,"./main.js":114,"../common/globals.js":201,"./settlement.js":150,"./voxel_data.js":179,"../glov/client/engine.js":255,"../glov/client/cmds.js":249,"../glov/client/shaders.js":298,"../glov/client/settings.js":296,"../glov/common/util.js":335,"../glov/common/vmath.js":337,"./voxel_chunk_manager.js":178,"../common/world_constants.js":217,"../glov/client/aabbtree.js":241,"./huds.js":87,"../glov/client/geom.js":268,"../glov/client/textures.js":309,"../glov/client/draw_list.js":251,"./megachunk_client.js":118}},"23":{"file":"workdir/client/bluebox_ui.js","deps":{"../common/globals":201,"../common/ids":202,"../common/materials_common":206,"../common/voxel_data_common":214,"./bluebox_edit_list":22,"./blueprint":24,"./build_mode":27,"./inventory":94,"./item_anims":96,"./editvolume_client":72,"./items":99,"./main":114,"./menu":119,"./quickbar":144,"./props":143,"./status":158,"./user_data":174,"./tiles":164,"./ui_util":172,"./voxel_data":179,"./styles":162,"./world_comm":186,"./world_metadata":190,"./user_info_view":175,"../glov/common/vmath":337,"../glov/client/input":276,"../glov/client/cmds":249,"../glov/client/ui":311,"../glov/client/engine":255,"../glov/client/settings":296,"../glov/client/net":284,"../glov/common/util":335,"../glov/client/mat4ScaleRotateTranslate":282,"../glov/common/verify":336,"../glov/client/urlhash":312,"./localization/localization":110,"../common/world_constants":217,"../common/blueprint_common":196,"./file_management":82,"./build_menu":26,"../glov/client/draw_list":251,"./layout":100,"../glov/client/effects":254,"../glov/client/scroll_area":294,"./item_info_view":97,"./inventory_ui":95,"./account_ui":3,"./main_menu":115}},"24":{"file":"workdir/client/blueprint.js","deps":{"../common/materials_common":206,"./status":158,"../common/ids":202,"./items":99,"./tiles":164,"./main":114,"./voxel_data":179,"./world_comm":186,"../glov/common/util":335,"../glov/client/engine":255,"../glov/client/local_storage":279,"../glov/common/verify":336,"../glov/common/vmath":337,"../glov/client/net":284,"./localization/localization":110,"../common/blueprint_common":196,"./analytics":5,"../common/megachunk_common":207,"./crafting":57,"./file_management":82,"./build_menu":26}},"25":{"file":"workdir/client/blueprint_manage.js","deps":{"../common/blueprint_common":196,"./analytics":5,"../common/ids":202,"./bluebox_ui":23,"./fbinstant_worlds":80,"./build_menu":26,"./blueprint":24,"./items":99,"./menu":119,"./main":114,"./world_comm":186,"./quickbar":144,"./item_info_view":97,"../glov/client/cmds":249,"../glov/client/ui":311,"../glov/client/engine":255,"../glov/client/input":276,"../glov/client/environments":259,"./localization/localization":110,"../glov/common/util":335}},"26":{"file":"workdir/client/build_menu.js","deps":{"../common/ids":202,"../common/world_constants.js":217,"../common/materials_common":206,"./analytics.js":5,"../common/items_common":204,"./build_mode.js":27,"./blueprint.js":24,"./inventory.js":94,"./flora_constants.js":85,"./item_info_view.js":97,"./inventory_ui.js":95,"./main.js":114,"./layout.js":100,"./items.js":99,"./quickbar.js":144,"./menu.js":119,"./styles.js":162,"./settlement.js":150,"./tiles_ui":166,"./tiles.js":164,"./world_metadata.js":190,"./ui_util.js":172,"./user_data.js":174,"./worlds_sound.js":191,"./world_comm.js":186,"../glov/client/engine.js":255,"../glov/client/camera2d.js":246,"../glov/client/cmds.js":249,"../glov/client/input.js":276,"../glov/client/net.js":284,"../glov/client/scroll_area.js":294,"../glov/common/util.js":335,"../glov/client/ui.js":311,"../glov/client/settings.js":296,"../glov/common/vmath.js":337,"../glov/client/sprites.js":307,"./localization/localization":110,"./app_access.js":10}},"27":{"file":"workdir/client/build_mode.js","deps":{"../common/globals":201,"../common/voxel_data_common":214,"../common/materials_common":206,"../common/ids":202,"../common/world_trans":218,"./bluebox_ui":23,"./blueprint":24,"./inventory":94,"./camera":28,"./bluebox_edit_list":22,"./items":99,"./editvolume_client":72,"./main":114,"./materials":116,"./particle_system":128,"./props":143,"./status":158,"./tiles":164,"./ui_util":172,"./voxel_data":179,"./world_comm":186,"./worlds_sound":191,"./user_data":174,"./worlds_soundscape":192,"./world_metadata":190,"./quickbar":144,"../glov/client/cmds":249,"../glov/client/engine":255,"../glov/client/net":284,"../glov/client/settings":296,"../glov/client/input":276,"../glov/client/ui":311,"../glov/client/ui.js":311,"../glov/common/vmath":337,"../glov/common/verify":336,"../glov/common/util":335,"./localization/localization":110,"./megachunk_client":118,"../common/world_constants":217,"./analytics":5,"../common/megachunk_common":207,"./build_menu":26,"./debug":62,"./layout":100,"./client_entities":35,"./proc_gen_biomes":135,"./line3d":104,"./proc_gen_debug":137,"./voxel_mesh":182,"./tutorial":170,"../glov/client/textures":309,"../glov/client/camera2d":246,"./stone_tiers":159,"./dowser_ui":68,"./draw_line3d":69,"./world_claims":185,"../glov/client/spot":305,"./todo_list":167,"../common/entity_worlds_common":199,"./dowser_simple":67,"./proc_gen":134,"./mobs":122,"./voxel_gen":181}},"28":{"file":"workdir/client/camera.js","deps":{"../common/globals.js":201,"./main.js":114,"./status.js":158,"./voxel_data.js":179,"./world_comm.js":186,"./tiles.js":164,"../glov/client/cmds.js":249,"../glov/client/engine.js":255,"../glov/client/settings.js":296,"../glov/client/input.js":276,"../glov/common/vmath.js":337,"./debug.js":62,"./controller_common.js":40}},"29":{"file":"workdir/client/cave_generators.js","deps":{"../common/ids":202,"../common/globals":201,"../common/materials_common":206,"./detail_gen_base":63,"./flora_constants":85,"../glov/client/quat":292,"./line3d":104,"./proc_gen_biomes":135,"./line2d":103,"./proc_gen_constants":136,"./proc_gen_details":138,"../glov/client/rand_fast":293,"./tiles":164,"../glov/common/util":335,"../glov/common/vmath":337,"./maze_gen":117}},"30":{"file":"workdir/client/character_controller.js","deps":{"../common/globals.js":201,"../common/ids":202,"./baking.js":17,"../common/world_trans.js":218,"./camera.js":28,"./build_mode.js":27,"./main.js":114,"./props.js":143,"./settlement.js":150,"./quickbar.js":144,"./status.js":158,"./user_data.js":174,"./sky.js":153,"./world_comm.js":186,"./ui_util.js":172,"./worlds_soundscape.js":192,"./worlds_sound.js":191,"./world_metadata.js":190,"./tiles.js":164,"./voxel_data.js":179,"../glov/common/vmath.js":337,"../glov/client/engine.js":255,"../glov/client/net.js":284,"../glov/client/ui.js":311,"../glov/client/urlhash.js":312,"../glov/common/util.js":335,"./localization/localization":110,"../glov/client/settings.js":296,"./huds.js":87,"./controller_common.js":40,"./animation_enum.js":8,"./proc_gen_constants.js":136,"./state_machine.js":157,"./proc_gen_biomes.js":135,"../glov/client/error_report.js":260,"./debug.js":62,"./auto_activate_ui.js":13,"./base_controller.js":18,"./race_ui":146,"./controller_modes/freecam_mode.js":47,"./controller_modes/sitting_mode.js":51,"./controller_modes/mode_common.js":49,"./photo_mode.js":130,"./user_party.js":176,"./controller_components/feet_check_comp.js":44,"./controller_components/auto_crouch_comp.js":41,"./controller_components/debug_comp.js":43,"./controller_modes/fly_mode.js":46,"./controller_modes/ladderclimbing_mode.js":48,"./controller_modes/walk_mode.js":53,"./controller_modes/swimming_mode.js":52,"./client_entities":35}},"31":{"file":"workdir/client/character_customization.js","deps":{"./cosmetics":55,"./costume_edit.js":56,"../common/entitlements":198,"./main":114,"./layout":100,"./main_menu":115,"./menu":119,"./red_dot":148,"./styles":162,"./ui_util":172,"./ui_util_2":173,"./world_comm":186,"../glov/client/camera2d":246,"../glov/client/engine":255,"../glov/client/net":284,"../glov/client/scroll_area":294,"../glov/client/input":276,"../glov/client/ui":311,"../glov/common/vmath":337,"../glov/client/sprites":307,"../glov/common/util":335,"./in_app_purchases/iap_client_worlds":93,"./localization/localization":110,"./paperdoll":127,"../glov/client/sprite_animation":306,"./cosmetic_thumbnails.js":54,"./store":160}},"32":{"file":"workdir/client/chat_floater.js","deps":{"./floater":84,"./styles.js":162,"../glov/client/font.js":265,"../glov/common/util.js":335,"../glov/common/vmath.js":337,"../glov/client/ui.js":311}},"33":{"file":"workdir/client/chunk_searcher.js","deps":{"../common/globals.js":201,"./voxel_data.js":179,"../glov/client/engine.js":255,"../glov/common/vmath":337}},"34":{"file":"workdir/client/client_cmds.js","deps":{"../common/ids":202,"../common/entitlements":198,"../common/megachunk_common":207,"../common/globals":201,"../common/world_constants":217,"../common/world_trans":218,"./editvolume_client":72,"./main":114,"./build_mode":27,"./main_menu":115,"./items":99,"./materials":116,"./energy_well":73,"./proc_gen":134,"./user_data":174,"./orient":124,"./race_ui":146,"./voxel_data":179,"./tiles":164,"./task_sched":163,"./world_comm":186,"./world_metadata":190,"./inventory":94,"../glov/client/cmds":249,"../glov/client/engine":255,"../glov/client/fscreen":267,"../glov/client/localization":280,"../glov/client/net":284,"../glov/client/urlhash":312,"../glov/client/ui":311,"../glov/common/md5.js":329,"../glov/common/verify":336,"../glov/common/util":335,"./localization/localization":110,"../common/waygate_common":215,"./stuck":161}},"35":{"file":"workdir/client/client_entities.js","deps":{"../common/globals.js":201,"../common/entity_worlds_common.js":199,"../common/items_common":204,"../common/world_trans.js":218,"./world_comm":186,"../glov/client/engine":255,"../glov/client/cmds":249,"../glov/client/net.js":284,"../glov/common/verify":336,"../glov/common/vmath.js":337,"./ai.js":4,"../glov/client/entity_position_manager":258,"../glov/client/entity_manager_client":257,"./entity_worlds_client":74}},"36":{"file":"workdir/client/context.js","deps":{}},"37":{"file":"workdir/client/continent.js","deps":{"../common/globals.js":201,"./proc_gen_biomes.js":135,"./proc_gen_constants.js":136,"../glov/common/vmath.js":337,"./continent_serialize.js":39}},"38":{"file":"workdir/client/continent_loader.js","deps":{"./file_management.js":82,"./loading_custom.js":107,"./proc_gen_biomes.js":135,"./user_data.js":174,"./voxel_gen.js":181,"./task_sched.js":163,"../common/globals.js":201,"./world_comm.js":186,"../glov/client/error_report.js":260,"./localization/localization":110,"../glov/client/net.js":284,"../glov/common/rand_alea.js":332,"../glov/common/vmath.js":337,"../common/async_dictionary.js":194}},"39":{"file":"workdir/client/continent_serialize.js","deps":{"../glov/common/packet.js":330}},"40":{"file":"workdir/client/controller_common.js","deps":{"./base_controller.js":18,"./layout.js":100,"./user_data.js":174,"./quickbar.js":144,"./styles.js":162,"./main.js":114,"./ui_util.js":172,"../glov/client/cmds.js":249,"../glov/common/vmath.js":337,"../glov/client/camera2d.js":246,"../glov/client/engine.js":255,"../glov/client/input.js":276,"../glov/common/util.js":335,"../glov/client/ui.js":311,"./localization/localization":110,"../glov/client/settings.js":296}},"41":{"file":"workdir/client/controller_components/auto_crouch_comp.js","deps":{"../../glov/common/vmath.js":337,"./component.js":42}},"42":{"file":"workdir/client/controller_components/component.js","deps":{}},"43":{"file":"workdir/client/controller_components/debug_comp.js","deps":{"../../common/globals.js":201,"../base_controller.js":18,"../debug.js":62,"../voxel_data.js":179,"../controller_modes/mode_common.js":49,"./component.js":42}},"44":{"file":"workdir/client/controller_components/feet_check_comp.js","deps":{"../camera.js":28,"../debug.js":62,"../voxel_data.js":179,"../../glov/common/vmath.js":337,"../../glov/client/engine.js":255,"./component.js":42}},"45":{"file":"workdir/client/controller_modes/char_mode_common.js","deps":{"../voxel_data":179,"../props":143,"../../common/ids":202,"../../glov/common/vmath":337,"./mode_common":49}},"46":{"file":"workdir/client/controller_modes/fly_mode.js","deps":{"../../common/ids":202,"../animation_enum":8,"../state_machine":157,"../props":143,"../user_data":174,"../../glov/common/vmath":337,"./mode_common":49,"./char_mode_common":45}},"47":{"file":"workdir/client/controller_modes/freecam_mode.js","deps":{"../state_machine":157,"../../glov/client/cmds":249,"../../glov/common/vmath":337,"./mode_common":49,"../../glov/client/settings.js":296}},"48":{"file":"workdir/client/controller_modes/ladderclimbing_mode.js","deps":{"../../common/ids":202,"../animation_enum":8,"../props":143,"../state_machine":157,"../user_data":174,"../../glov/common/vmath":337,"./mode_common":49,"./char_mode_common":45}},"49":{"file":"workdir/client/controller_modes/mode_common.js","deps":{"../../common/globals.js":201,"../base_controller.js":18,"../photo_mode.js":130,"../voxel_data.js":179,"../user_data.js":174,"../status.js":158,"../world_metadata.js":190,"../../glov/client/engine.js":255,"../../glov/client/ui.js":311,"../../glov/common/vmath.js":337,"../../glov/common/util.js":335,"../localization/localization":110,"../controller_components/auto_crouch_comp.js":41,"../../glov/client/settings.js":296}},"50":{"file":"workdir/client/controller_modes/phtmove_mode.js","deps":{"../state_machine":157,"../../glov/common/vmath":337,"./mode_common":49}},"51":{"file":"workdir/client/controller_modes/sitting_mode.js","deps":{"../animation_enum.js":8,"../controller_common.js":40,"../state_machine.js":157,"../voxel_data.js":179,"../../glov/common/vmath.js":337,"../../glov/client/settings.js":296,"./mode_common.js":49}},"52":{"file":"workdir/client/controller_modes/swimming_mode.js","deps":{"../animation_enum":8,"../user_data":174,"../state_machine":157,"../../glov/common/vmath":337,"./mode_common":49,"./char_mode_common":45}},"53":{"file":"workdir/client/controller_modes/walk_mode.js","deps":{"../../common/globals":201,"../state_machine":157,"../user_data":174,"../animation_enum":8,"../../glov/client/input":276,"../../glov/common/util":335,"../../glov/common/vmath":337,"../../glov/client/settings.js":296,"./mode_common":49,"./char_mode_common":45}},"54":{"file":"workdir/client/cosmetic_thumbnails.js","deps":{"./animation_enum":8,"./client_entities":35,"./cosmetics":55,"./animation_player":9,"./mobs":122,"./items":99,"./voxel_data":179,"./props":143,"../glov/client/quat":292,"../glov/client/engine":255,"../glov/common/vmath":337,"../glov/client/snapshot":300}},"55":{"file":"workdir/client/cosmetics.js","deps":{"../common/entitlements":198,"./costume_edit":56,"./palette":125,"./voxel_data_xraw":180,"./styles":162,"./world_comm":186,"../glov/common/enums":326,"../glov/client/engine":255,"../glov/client/filewatch":264,"../glov/client/webfs":314,"../glov/common/util":335,"../glov/common/vmath":337,"./localization/localization":110,"./store":160}},"56":{"file":"workdir/client/costume_edit.js","deps":{"../common/entitlements":198,"./world_comm":186,"./client_cmds":34,"./cosmetics":55,"../glov/client/cmds":249,"../glov/client/net":284,"../glov/client/engine":255,"../glov/common/util":335,"../glov/client/walltime":313,"./store":160}},"57":{"file":"workdir/client/crafting.js","deps":{"./inventory":94,"../common/ids":202,"../common/materials_common":206,"./items":99}},"58":{"file":"workdir/client/crafting_mods.js","deps":{"./localization/localization":110,"../glov/client/engine.js":255,"./ui_util.js":172}},"59":{"file":"workdir/client/crafting_recipes.js","deps":{"../common/ids":202,"../common/world_constants":217,"../common/materials_common":206,"./crafting_mods":58,"./materials":116,"./tiles":164,"./proc_gen":134,"./stone_tiers":159,"./voxel_data":179,"./items.js":99,"../glov/client/error_report.js":260,"../glov/common/vmath":337,"../glov/client/engine":255,"../glov/common/util":335,"./localization/localization":110}},"60":{"file":"workdir/client/create_first_world.js","deps":{"./analytics_ftue.js":6,"./main_menu":115,"./analytics.js":5,"./menu.js":119,"./styles.js":162,"./ui_util.js":172,"../glov/client/sprites.js":307,"../glov/client/net.js":284,"../glov/client/ui.js":311,"./localization/localization":110,"./prompt.js":141}},"61":{"file":"workdir/client/credits_menu.js","deps":{"./styles.js":162,"./layout.js":100,"../glov/client/ui.js":311}},"62":{"file":"workdir/client/debug.js","deps":{"../glov/client/engine.js":255,"../glov/common/vmath.js":337,"../glov/client/ui.js":311,"../glov/client/font.js":265}},"63":{"file":"workdir/client/detail_gen_base.js","deps":{"../common/globals.js":201,"./proc_gen_details.js":138,"./tiles.js":164}},"64":{"file":"workdir/client/detail_gen_rendered.js","deps":{"../common/globals.js":201,"./proc_gen.js":134,"./tiles.js":164,"../glov/common/util.js":335,"../glov/common/vmath.js":337,"./detail_gen_base.js":63}},"65":{"file":"workdir/client/detail_generators.js","deps":{"../common/globals.js":201,"./tiles.js":164,"./detail_gen_base.js":63,"../glov/client/rand_fast.js":293,"../glov/common/util.js":335,"../glov/common/vmath.js":337}},"66":{"file":"workdir/client/dowser_advanced.js","deps":{"./build_mode.js":27,"./debug.js":62,"./main.js":114,"../common/ids":202,"./tiles.js":164,"./voxel_data.js":179,"../glov/client/engine.js":255,"../glov/common/vmath.js":337,"../glov/common/util.js":335}},"67":{"file":"workdir/client/dowser_simple.js","deps":{"./debug.js":62,"../common/globals.js":201,"./tiles.js":164,"./proc_gen.js":134,"./main.js":114,"./voxel_data.js":179,"../glov/client/engine.js":255,"../glov/common/util.js":335,"../glov/common/vmath.js":337,"./chunk_searcher.js":33}},"68":{"file":"workdir/client/dowser_ui.js","deps":{"../common/ids":202,"./dowser_simple.js":67,"./dowser_advanced.js":66,"./materials":116,"./tiles.js":164,"./styles":162,"../glov/client/ui.js":311,"../glov/client/engine.js":255,"../glov/client/camera2d.js":246,"../glov/common/vmath.js":337,"../glov/common/util.js":335,"./localization/localization":110}},"69":{"file":"workdir/client/draw_line3d.js","deps":{"./voxel_data.js":179,"../glov/client/draw_list.js":251,"../glov/client/mat4ScaleRotateTranslate.js":282,"../glov/client/geom.js":268,"../glov/client/shaders.js":298,"../glov/client/engine.js":255,"../glov/common/vmath.js":337,"../glov/client/textures.js":309,"../glov/client/quat.js":292}},"70":{"file":"workdir/client/draw_sprite3d.js","deps":{"./camera.js":28,"../glov/client/engine.js":255,"../glov/client/mat4ScaleRotateTranslate.js":282,"../glov/client/geom.js":268,"../glov/common/vmath.js":337,"../glov/client/shaders.js":298,"../glov/client/quat.js":292,"../glov/client/sprites.js":307,"../glov/client/textures.js":309}},"71":{"file":"workdir/client/editvolume_clear.js","deps":{"../common/editvolume_common":197,"../common/ids":202,"./editvolume_client":72,"../common/globals":201,"./main":114,"./status":158,"./user_data":174,"./voxel_data":179,"./world_comm":186,"../glov/client/camera2d":246,"../glov/client/engine":255,"../glov/common/vmath":337,"./localization/localization":110,"../glov/client/ui":311}},"72":{"file":"workdir/client/editvolume_client.js","deps":{"../common/globals.js":201,"./main.js":114,"./world_comm.js":186,"./world_metadata.js":190,"./voxel_data.js":179,"./user_data.js":174,"../glov/client/cmds.js":249,"../glov/client/settings.js":296,"../glov/client/net.js":284,"../glov/common/util.js":335,"../glov/common/vmath.js":337,"./megachunk_client.js":118,"../common/world_constants.js":217,"./editvolume_clear.js":71,"../common/editvolume_common.js":197,"../common/waygate_upgrade_common.js":216,"./client_cmds.js":34}},"73":{"file":"workdir/client/energy_well.js","deps":{"./build_mode":27,"../common/ids":202,"./crafting_mods":58,"./styles":162,"./settlement":150,"./ui_util":172,"./user_data":174,"./worlds_sound":191,"./main":114,"../glov/client/net":284,"../glov/client/ui":311,"../glov/client/engine":255,"./localization/localization":110,"./huds":87,"./layout":100,"./waygate_upgrade":184,"../glov/client/walltime":313,"./waygate_ui":183,"./analytics":5}},"74":{"file":"workdir/client/entity_worlds_client.js","deps":{"../common/entity_worlds_common":199,"./ai":4,"../glov/client/entity_base_client":256}},"75":{"file":"workdir/client/external_users/external_users_client_apple.js","deps":{"../../glov/client/client_config":248,"../../glov/common/external_users_common":327,"../../glov/common/util":335,"../../common/external_users/external_users_provider_ids":200,"../../frvr/client/xplay/signin_with_apple/ios":239,"../../glov/common/types":334}},"76":{"file":"workdir/client/external_users/external_users_client_facebook_gaming.js","deps":{"../../glov/common/external_users_common":327,"../../common/external_users/external_users_provider_ids":200,"../../glov/common/util":335,"../../frvr/client/xplay/facebook/facebook":229,"../../glov/common/types":334}},"77":{"file":"workdir/client/external_users/external_users_client_facebook_instant.js","deps":{"../../glov/common/util":335,"../../glov/client/fbinstant.js":262,"../../common/external_users/external_users_provider_ids":200,"../../glov/common/external_users_common":327}},"78":{"file":"workdir/client/external_users/external_users_client_worlds.js","deps":{"../../glov/client/external_users_client":261,"../../glov/client/client_config":248,"./external_users_client_facebook_instant":77,"./external_users_client_facebook_gaming":76,"./external_users_client_apple":75}},"79":{"file":"workdir/client/factory_ui.js","deps":{"../common/ids":202,"../common/materials_common":206,"../common/globals":201,"./items":99,"./build_mode":27,"./crafting_mods":58,"./inventory":94,"./menu":119,"./main":114,"./materials":116,"./settlement":150,"./status":158,"./props":143,"./styles":162,"./ui_util":172,"./user_data":174,"./voxel_data":179,"./world_metadata":190,"../glov/client/cmds":249,"../glov/client/engine":255,"../glov/client/input":276,"../glov/client/settings":296,"../glov/client/net":284,"../glov/client/ui":311,"./localization/localization":110,"../glov/common/util":335,"./crafting":57,"./item_info_view":97,"./inventory_ui":95,"./layout":100,"./todo_list":167,"../glov/client/scroll_area":294,"../glov/client/walltime":313,"../glov/client/camera2d":246,"../glov/common/rand_alea":332,"./crafting_recipes":59,"./red_dot":148,"./tutorial":170}},"80":{"file":"workdir/client/fbinstant_worlds.js","deps":{"./blueprint.js":24,"./analytics.js":5,"./file_management.js":82,"./main_menu.js":115,"./photo_mode.js":130,"../glov/client/environments":259,"../glov/client/fbinstant.js":262,"../glov/client/localization.js":280,"../glov/client/settings.js":296,"../glov/client/net.js":284,"../glov/client/ui.js":311,"../glov/common/enums.js":326,"../glov/common/rand_alea.js":332,"../glov/common/util.js":335,"./localization/localization":110,"../glov/client/social.js":301,"../glov/client/urlhash.js":312,"../common/waygate_common.js":215}},"81":{"file":"workdir/client/feedback.js","deps":{"./status":158,"./main_menu":115,"../glov/client/client_config":248,"../glov/client/engine":255,"../glov/client/net":284,"./localization/localization":110}},"82":{"file":"workdir/client/file_management.js","deps":{"./main.js":114,"./localization/localization":110,"../glov/common/base64.js":320,"../glov/common/chunked_send.js":321,"../glov/client/urlhash.js":312,"../glov/client/net.js":284}},"83":{"file":"workdir/client/fixed_octree.js","deps":{}},"84":{"file":"workdir/client/floater.js","deps":{"./styles.js":162,"./camera.js":28,"../glov/client/engine.js":255,"../glov/client/ui.js":311,"../glov/client/font.js":265,"../glov/common/vmath.js":337,"../glov/client/input.js":276,"../glov/common/util.js":335,"./photo_mode.js":130,"../glov/client/camera2d.js":246}},"85":{"file":"workdir/client/flora_constants.js","deps":{"../common/materials_common":206,"../common/ids":202}},"86":{"file":"workdir/client/fx_util.js","deps":{"../glov/client/textures.js":309,"../glov/common/util.js":335}},"87":{"file":"workdir/client/huds.js","deps":{"./layout.js":100,"../common/world_constants":217,"./energy_well":73,"./layout":100,"../common/ids":202,"./main_menu":115,"./build_mode":27,"./quickbar":144,"./race_ui":146,"./share_menu":152,"./main":114,"./settlement":150,"./styles":162,"./status":158,"./sky":153,"./user_data":174,"./world_metadata":190,"./ui_util":172,"./world_comm":186,"./world_info_view":188,"./crafting_mods":58,"../glov/client/camera2d":246,"../glov/client/sound":302,"../glov/common/vmath":337,"../glov/client/cmds":249,"../glov/client/ui":311,"../glov/client/settings":296,"../glov/client/engine":255,"../glov/common/util":335,"./localization/localization":110}},"88":{"file":"workdir/client/iframe_content_handlers.js","deps":{"./main_menu":115,"./localization/localization":110,"../glov/client/urlhash.js":312,"../glov/client/engine.js":255}},"89":{"file":"workdir/client/img/font/inknut24.20.json","deps":{}},"90":{"file":"workdir/client/img/font/ubuntu32.20.json","deps":{}},"91":{"file":"workdir/client/in_app_purchases/iap_client.js","deps":{"../../common/in_app_purchases/iap_common":203}},"92":{"file":"workdir/client/in_app_purchases/iap_client_facebook_instant.js","deps":{"../../common/in_app_purchases/iap_common":203,"../../glov/common/util":335}},"93":{"file":"workdir/client/in_app_purchases/iap_client_worlds.js","deps":{"../../common/globals":201,"../analytics":5,"../worlds_sound":191,"../../glov/client/cmds":249,"../../glov/client/net":284,"../../glov/client/client_config":248,"../../glov/client/ui":311,"../../glov/common/util":335,"../localization/localization":110,"../../common/in_app_purchases/iap_common":203,"./iap_client":91,"./iap_client_facebook_instant":92}},"94":{"file":"workdir/client/inventory.js","deps":{"../common/ids":202,"./ui_util":172,"../common/globals":201,"./blueprint":24,"./build_mode":27,"../common/voxel_data_common":214,"./item_anims":96,"./editvolume_client":72,"../common/materials_common":206,"./items":99,"../common/world_trans":218,"./main":114,"./quickbar":144,"./props":143,"./tiles":164,"./materials":116,"./status":158,"./world_metadata":190,"./voxel_data":179,"./user_data":174,"./world_comm":186,"./worlds_sound":191,"./localization/localization":110,"../glov/common/vmath":337,"../glov/common/verify":336,"../glov/client/ui":311,"../glov/client/cmds":249,"../glov/common/util":335,"./tiles_ui":166}},"95":{"file":"workdir/client/inventory_ui.js","deps":{"../common/globals":201,"../common/materials_common":206,"./build_mode":27,"./huds":87,"./item_info_view":97,"./inventory":94,"./items":99,"./layout":100,"./main":114,"./quickbar":144,"./menu":119,"./status":158,"./styles":162,"./ui_util":172,"./user_data":174,"./voxel_data":179,"./tutorial":170,"./worlds_sound":191,"../glov/client/cmds":249,"../glov/client/engine":255,"../glov/client/input":276,"../glov/client/net":284,"../glov/client/settings":296,"../glov/client/ui":311,"../glov/common/verify":336,"../glov/common/util":335,"../glov/common/vmath":337,"./localization/localization":110,"./paperdoll":127}},"96":{"file":"workdir/client/item_anims.js","deps":{"../common/ids":202,"../common/voxel_data_common":214,"../common/globals":201,"./items":99,"./inventory":94,"./voxel_data":179,"./props":143,"../glov/client/engine":255,"../glov/common/vmath":337,"../glov/client/quat":292,"../glov/common/util":335,"./mobs":122}},"97":{"file":"workdir/client/item_info_view.js","deps":{"../common/ids":202,"../common/materials_common":206,"../common/items_common":204,"./blueprint":24,"./inventory_ui":95,"./crafting_recipes":59,"./items":99,"./layout":100,"./main":114,"./factory_ui":79,"./menu":119,"./inventory":94,"./todo_list":167,"./styles":162,"./ui_util":172,"./world_metadata":190,"./world_comm":186,"../glov/client/input":276,"../glov/common/vmath":337,"../glov/client/scroll_area":294,"../glov/client/ui":311,"../glov/client/camera2d":246,"../glov/client/engine":255,"./localization/localization":110,"./blueprint_manage":25}},"98":{"file":"workdir/client/item_unlock_ui.js","deps":{"../common/ids.js":202,"./inventory_ui.js":95,"./items.js":99,"./styles.js":162,"./worlds_sound.js":191,"../glov/client/camera2d.js":246,"../glov/client/font.js":265,"../glov/client/engine.js":255,"../glov/client/ui.js":311,"../glov/common/util.js":335,"./localization/localization.js":110}},"99":{"file":"workdir/client/items.js","deps":{"../common/items_common":204,"../common/globals":201,"../common/ids":202,"../common/entitlements":198,"../common/materials_common":206,"./build_mode":27,"./baking":17,"./blueprint":24,"./crafting_mods":58,"./inventory":94,"./status":158,"./main":114,"./materials":116,"./ui_util":172,"./tiles":164,"./props":143,"./settlement":150,"./world_metadata":190,"./user_data":174,"./world_comm":186,"../glov/common/vmath":337,"../glov/client/engine":255,"../glov/common/util":335,"../glov/client/localization":280,"../glov/common/verify":336,"./localization/localization":110,"../common/world_constants":217,"./crafting":57,"./build_menu":26,"./waygate_upgrade":184,"./dowser_simple":67,"./proc_gen":134,"./stone_tiers":159,"./crafting_recipes":59,"../glov/client/sprites":307,"../glov/client/error_report":260,"../glov/client/camera2d":246,"../glov/common/rand_alea":332,"../glov/common/words/profanity_common":338,"./dowser_advanced":66,"./autogen/item_defs":14}},"100":{"file":"workdir/client/layout.js","deps":{"./main.js":114,"../glov/client/camera2d.js":246,"../glov/client/cmds.js":249,"../glov/client/settings.js":296,"../glov/client/ui.js":311,"../glov/common/vmath.js":337}},"101":{"file":"workdir/client/leapgate_ui.js","deps":{"../common/leapgate_common":205,"./client_cmds.js":34,"../common/materials_common":206,"../common/ids":202,"../common/world_constants":217,"./inventory":94,"./inventory_ui":95,"./items":99,"./layout":100,"./item_info_view":97,"./menu":119,"./prop_edit":142,"./status":158,"./ui_util":172,"./styles":162,"./world_metadata.js":190,"./waygate_ui":183,"./tiles_const":165,"./main":114,"../glov/common/rand_alea":332,"../glov/common/util":335,"../glov/client/engine":255,"./localization/localization":110,"../glov/client/ui":311,"../glov/client/input.js":276,"./settlement_edit":151}},"102":{"file":"workdir/client/light_calc.js","deps":{"../common/globals.js":201,"./tiles.js":164,"../common/voxel_data_common.js":214}},"103":{"file":"workdir/client/line2d.js","deps":{"../glov/common/vmath.js":337}},"104":{"file":"workdir/client/line3d.js","deps":{"../glov/common/vmath.js":337}},"105":{"file":"workdir/client/liquid.js","deps":{"./editvolume_client.js":72,"../common/globals.js":201,"./rand_seed.js":147,"./tiles.js":164,"./main.js":114,"./voxel_data.js":179,"../common/world_trans.js":218,"../glov/client/engine.js":255,"../glov/common/vmath.js":337}},"106":{"file":"workdir/client/lists.js","deps":{"../common/globals.js":201,"../glov/client/aabbtree.js":241,"../glov/common/util.js":335,"./fixed_octree.js":83}},"107":{"file":"workdir/client/loading_custom.js","deps":{"./items":99,"./camera":28,"./build_mode":27,"./main_menu":115,"./props":143,"./photo_mode":130,"./styles":162,"./ui_util":172,"./tiles":164,"./voxel_data":179,"../glov/client/camera2d":246,"../glov/client/quat":292,"../glov/common/util":335,"../glov/common/vmath":337,"../glov/client/engine":255,"../glov/client/font":265,"../glov/client/sprites":307,"../glov/client/snapshot":300,"./localization/localization":110,"../glov/client/transition":310}},"108":{"file":"workdir/client/localization/lang_en-US.json","deps":{}},"109":{"file":"workdir/client/localization/lang_pt-PT.json","deps":{}},"110":{"file":"workdir/client/localization/localization.js","deps":{"../../glov/client/localization":280,"../../glov/client/cmds":249,"../../glov/client/client_config":248,"../../glov/common/util":335,"../../glov/client/ui":311,"./lang_pt-PT.json":109,"./lang_en-US.json":108}},"111":{"file":"workdir/client/lods.js","deps":{"./camera.js":28,"../common/globals.js":201,"./continent_loader.js":38,"./debug.js":62,"./main.js":114,"./proc_gen_debug.js":137,"../common/voxel_data_common.js":214,"./megachunk_client.js":118,"./proc_gen_biomes.js":135,"./voxel_chunk_manager.js":178,"./voxel_data.js":179,"./task_sched.js":163,"../glov/client/browser.js":244,"../glov/client/cmds.js":249,"../glov/client/geom.js":268,"../glov/client/engine.js":255,"../glov/client/shaders.js":298,"../glov/common/vmath.js":337,"../glov/common/util.js":335,"./lods_shared.js":112}},"112":{"file":"workdir/client/lods_shared.js","deps":{"../common/globals":201,"./proc_gen_biomes":135,"./proc_gen_hydro":139,"./tiles":164,"../glov/common/vmath":337,"../glov/common/util":335}},"113":{"file":"workdir/client/login_rewards.js","deps":{"../common/store_data":213,"./analytics":5,"./social_referral":155,"./status":158,"./store":160,"../glov/client/net":284,"../glov/client/ui":311,"./localization/localization":110,"../common/rewards_common":210}},"114":{"file":"workdir/client/main.js","deps":{"../common/world_trans.js":218,"./blueprint.js":24,"../common/globals.js":201,"./bluebox_edit_list.js":22,"./build_mode.js":27,"./character_controller.js":30,"./baking.js":17,"./item_anims.js":96,"./atlas_params.json":12,"./camera.js":28,"./palette.js":125,"./items.js":99,"./inventory.js":94,"./menu.js":119,"./particle_system.js":128,"./props.js":143,"./prop_edit.js":142,"./quickbar.js":144,"./sky.js":153,"./settlement.js":150,"./styles.js":162,"./status.js":158,"./user_info_view.js":175,"./user_data.js":174,"./ui_util.js":172,"./voxel_data_xraw":180,"./voxel_data.js":179,"./world_comm.js":186,"./worlds_sound.js":191,"./worlds_soundscape.js":192,"./world_metadata.js":190,"../glov/client/client_config":248,"../glov/client/local_storage":279,"../glov/client/cmds.js":249,"../glov/client/input.js":276,"../glov/client/engine.js":255,"../glov/client/filewatch.js":264,"../glov/client/environments":259,"../glov/client/shaders.js":298,"../glov/client/net.js":284,"../glov/client/snapshot.js":300,"../glov/client/settings.js":296,"../glov/client/webfs.js":314,"../glov/client/urlhash.js":312,"../glov/common/verify.js":336,"../glov/common/vmath":337,"../glov/common/util.js":335,"../glov/client/ui.js":311,"./localization/localization":110,"./huds.js":87,"./megachunk_client.js":118,"./voxel_chunk_manager.js":178,"./analytics":5,"./build_menu.js":26,"./task_sched.js":163,"./debug.js":62,"./client_cmds.js":34,"./item_info_view.js":97,"./layout.js":100,"./main_menu.js":115,"./auto_activate_ui.js":13,"./client_entities.js":35,"./race_ui":146,"./user_party.js":176,"./photo_mode.js":130,"./proc_gen.js":134,"./mobs.js":122,"./todo_list.js":167,"./voxel_gen.js":181,"./tutorial.js":170,"./red_dot.js":148,"./character_customization":31,"../common/roles_common":211,"./draw_sprite3d.js":70,"./ui_sounds.js":171,"../glov/client/draw_list.js":251,"../glov/client/textures.js":309,"../glov/client/effects.js":254,"../glov/client/scroll_area.js":294,"../glov/client/walltime.js":313,"../glov/client/camera2d.js":246,"../glov/client/spot.js":305,"../glov/client/browser.js":244,"../glov/client/worker_comm.js":316,"./img/font/inknut24.20.json":89,"./img/font/ubuntu32.20.json":90,"./waygate_upgrade.js":184,"./editvolume_clear.js":71,"./app_settings.js":11,"./block_intersections.js":21,"./loading_custom.js":107,"./item_unlock_ui.js":98,"./mod_api_host.js":123,"./ui_util_2.js":173,"./social_referral.js":155,"../glov/client/error_report.js":260,"../glov/client/abtests_client":242,"../glov/client/fbinstant.js":262,"../glov/client/slider.js":299,"../glov/client/worker_perf.js":317,"./fbinstant_worlds.js":80,"./proc_gen_debug.js":137,"./world_init.js":189,"./share_menu.js":152,"./cosmetics.js":55,"./costume_edit.js":56,"../glov/client/chat_ui.js":247,"./voxel_atlas.js":177,"../glov/client/social":301,"../frvr/client/xplay/host/host":233,"./continent_loader.js":38,"./lods.js":111,"./photo_controller.js":129,"./in_app_purchases/iap_client_worlds":93,"./external_users/external_users_client_worlds":78,"../frvr/client/xplay/login":238,"../frvr/client/platforms/adapter":222}},"115":{"file":"workdir/client/main_menu.js","deps":{"../common/world_constants.js":217,"./analytics.js":5,"./account_ui.js":3,"./client_cmds.js":34,"./continent_loader.js":38,"./fbinstant_worlds.js":80,"./debug.js":62,"./main.js":114,"./layout.js":100,"./menu.js":119,"./mod_api_host.js":123,"./tiles.js":164,"./red_dot.js":148,"./user_data.js":174,"./ui_util.js":172,"./user_info_view.js":175,"./photo_mode.js":130,"./waygate_ui.js":183,"./status.js":158,"./voxel_gen.js":181,"./user_party.js":176,"./world_comm.js":186,"./world_metadata.js":190,"./styles.js":162,"../glov/client/browser.js":244,"../glov/client/camera2d.js":246,"../glov/client/client_config.js":248,"../glov/client/engine.js":255,"../glov/client/cmds.js":249,"../glov/client/fbinstant.js":262,"../glov/client/input.js":276,"../glov/client/link.js":278,"../glov/client/local_storage.js":279,"../glov/client/scroll_area.js":294,"../glov/client/fscreen.js":267,"../glov/client/settings.js":296,"../glov/client/selection_box.js":295,"../glov/client/edit_box.js":253,"../glov/client/sprites.js":307,"../glov/common/util.js":335,"../glov/common/md5.js":329,"../glov/client/wsclient.js":318,"../glov/common/rand_alea.js":332,"../glov/common/vmath.js":337,"../glov/client/spot":305,"../glov/client/ui.js":311,"../glov/client/urlhash.js":312,"../glov/client/social.js":301,"../glov/client/shaders.js":298,"../glov/client/net.js":284,"./localization/localization":110,"../frvr/client/platforms/adapter.js":222,"./app_access.js":10,"../common/waygate_common.js":215,"./paperdoll":127,"./iframe_content_handlers.js":88,"./analytics_ftue.js":6,"./feedback":81,"./world_info_local_cache.js":187,"./login_rewards":113,"./create_first_world.js":60}},"116":{"file":"workdir/client/materials.js","deps":{"../common/materials_common":206}},"117":{"file":"workdir/client/maze_gen.js","deps":{"../glov/common/rand_alea.js":332,"../glov/common/util.js":335}},"118":{"file":"workdir/client/megachunk_client.js","deps":{"../common/globals.js":201,"../common/megachunk_common.js":207,"./editvolume_client.js":72,"./lods.js":111,"./main.js":114,"./voxel_gen.js":181,"./proc_gen_constants.js":136,"./proc_gen_biomes.js":135,"./settlement.js":150,"./user_data.js":174,"./voxel_chunk_manager.js":178,"./world_comm.js":186,"./voxel_mesh.js":182,"./voxel_data.js":179,"../common/world_constants.js":217,"../common/voxel_data_common.js":214,"./world_metadata.js":190,"../glov/client/engine.js":255,"../glov/common/dot-prop.js":324,"../glov/client/net.js":284,"../glov/client/input.js":276,"../glov/client/ui.js":311,"../glov/common/rand_alea.js":332,"../glov/common/util.js":335,"../glov/common/vmath.js":337,"./proc_gen_details.js":138}},"119":{"file":"workdir/client/menu.js","deps":{"./blueprint.js":24,"./bluebox_ui.js":23,"./build_mode.js":27,"./factory_ui.js":79,"./race_results.js":145,"./main.js":114,"./prop_edit.js":142,"./styles.js":162,"./voxel_data.js":179,"./user_data.js":174,"./ui_util.js":172,"./world_metadata.js":190,"../glov/common/vmath.js":337,"../glov/client/ui.js":311,"../glov/client/engine.js":255,"../glov/client/input.js":276,"../glov/client/cmds.js":249,"./localization/localization":110,"../glov/client/localization.js":280,"../glov/client/settings.js":296,"../glov/client/urlhash.js":312,"./analytics.js":5,"./build_menu.js":26,"./item_info_view.js":97,"./inventory_ui.js":95,"./layout.js":100,"./main_menu.js":115,"./waygate_ui.js":183,"./race_ui":146,"./photo_mode.js":130,"./access_control.js":2,"../glov/client/camera2d.js":246,"../glov/client/browser.js":244,"./orient.js":124,"./photo_ui.js":131,"./social_menu.js":154,"../glov/client/fscreen.js":267,"./world_info_view.js":188,"./leapgate_ui.js":101,"./settings_menu.js":149,"./character_customization.js":31,"./voxel_chunk_manager.js":178}},"120":{"file":"workdir/client/mesh_calc.js","deps":{"./tiles.js":164,"./light_calc.js":102,"../common/globals.js":201,"../glov/common/vmath.js":337}},"121":{"file":"workdir/client/mesh_exporter.js","deps":{"../glov/common/util.js":335,"../glov/common/vmath.js":337}},"122":{"file":"workdir/client/mobs.js","deps":{"../common/globals":201,"../common/roles_common":211,"../common/ids":202,"../common/items_common":204,"./camera":28,"./animation_enum":8,"./client_entities":35,"./character_controller":30,"./baking":17,"./costume_edit":56,"./items":99,"./inventory":94,"./floater":84,"./photo_mode":130,"./quickbar":144,"./main":114,"./tiles_const":165,"./user_data":174,"./styles":162,"./user_info_view":175,"./voxel_data":179,"./world_comm":186,"./world_metadata":190,"./props":143,"../glov/client/chat_ui":247,"../glov/client/cmds":249,"../glov/client/engine":255,"../glov/client/font":265,"../glov/client/mat4ScaleRotateTranslate":282,"../glov/client/settings":296,"../glov/client/input":276,"../glov/client/quat":292,"../glov/common/util":335,"../glov/common/vmath":337,"../glov/client/net":284,"../glov/client/words/profanity":315,"./entity_worlds_client":74,"./animation":7,"./animation_player":9,"./chat_floater":32}},"123":{"file":"workdir/client/mod_api_host.js","deps":{"../glov/client/error_report.js":260,"../glov/client/ui.js":311,"./localization/localization":110}},"124":{"file":"workdir/client/orient.js","deps":{"../glov/common/util.js":335}},"125":{"file":"workdir/client/palette.js","deps":{"./main":114,"./tiles":164,"./materials":116,"./voxel_data":179,"./voxel_data_xraw":180,"../glov/client/engine":255,"../glov/client/filewatch":264,"../glov/client/webfs":314,"../glov/common/util":335,"../glov/common/verify":336,"../glov/common/vmath":337,"./palette/ranges.json":126}},"126":{"file":"workdir/client/palette/ranges.json","deps":{}},"127":{"file":"workdir/client/paperdoll.js","deps":{"./animation_enum":8,"./camera":28,"./animation_player":9,"./character_customization":31,"./cosmetics":55,"./client_entities":35,"./costume_edit":56,"./menu":119,"./inventory_ui":95,"./mobs":122,"./main":114,"./main_menu":115,"./props":143,"./styles":162,"./ui_util":172,"./voxel_data":179,"./user_data":174,"../glov/client/camera2d":246,"../glov/client/engine":255,"../glov/client/quat":292,"../glov/client/input":276,"../glov/client/ui":311,"../glov/client/net":284,"../glov/client/snapshot":300,"../glov/client/sprites":307,"../glov/common/vmath":337,"../glov/common/util":335,"./localization/localization":110}},"128":{"file":"workdir/client/particle_system.js","deps":{"./palette.js":125,"./tiles.js":164,"./voxel_data.js":179,"../glov/client/quat.js":292,"../glov/common/util.js":335,"../glov/common/vmath.js":337,"../glov/client/engine.js":255,"../glov/client/filewatch.js":264,"../glov/client/webfs.js":314,"../glov/client/mat4ScaleRotateTranslate.js":282,"../glov/client/shaders.js":298,"./debug.js":62,"../glov/client/geom.js":268,"./palette/ranges.json":126,"./proc_gen_biomes.js":135}},"129":{"file":"workdir/client/photo_controller.js","deps":{"./base_controller.js":18,"./controller_common.js":40,"./camera.js":28,"./photo_mode":130,"./state_machine.js":157,"../glov/client/ui.js":311,"../glov/common/vmath.js":337,"../glov/client/engine.js":255,"./controller_components/debug_comp":43,"./controller_modes/mode_common.js":49,"./controller_modes/phtmove_mode.js":50}},"130":{"file":"workdir/client/photo_mode.js","deps":{"./analytics.js":5,"./camera.js":28,"./build_mode.js":27,"../common/globals.js":201,"./file_management.js":82,"./loading_custom.js":107,"./menu.js":119,"./layout.js":100,"./main.js":114,"./sky.js":153,"./status.js":158,"./styles.js":162,"./ui_util.js":172,"./voxel_chunk_manager.js":178,"./user_data.js":174,"./world_comm.js":186,"./voxel_data.js":179,"./quickbar.js":144,"./world_metadata.js":190,"../glov/client/camera2d.js":246,"./localization/localization":110,"../glov/common/chunked_send.js":321,"../glov/client/edit_box.js":253,"../glov/client/engine.js":255,"../glov/client/effects.js":254,"../glov/client/framebuffer.js":266,"../glov/client/input.js":276,"../glov/client/settings.js":296,"../glov/client/slider.js":299,"../glov/client/sprites.js":307,"../glov/client/spot.js":305,"../glov/client/transition.js":310,"../glov/client/textures.js":309,"../glov/client/ui.js":311,"../glov/common/util.js":335,"../glov/common/vmath.js":337,"../common/photo_common.js":209}},"131":{"file":"workdir/client/photo_ui.js","deps":{"./account_ui":3,"./layout":100,"./fbinstant_worlds":80,"./main_menu":115,"./photo_mode":130,"./menu":119,"./main":114,"./styles":162,"./waygate_ui":183,"./world_comm":186,"./user_info_view":175,"../glov/client/cmds":249,"../glov/client/input":276,"../glov/client/engine":255,"../glov/client/environments":259,"../glov/client/net":284,"../glov/client/ui":311,"./localization/localization":110,"../glov/client/social":301,"../glov/client/sprites":307,"../glov/client/textures":309,"../glov/common/util":335,"../glov/client/urlhash":312}},"132":{"file":"workdir/client/platform_share_urls.js","deps":{"../glov/client/client_config":248,"../glov/client/environments":259}},"133":{"file":"workdir/client/priority_queue.js","deps":{}},"134":{"file":"workdir/client/proc_gen.js","deps":{"../common/globals":201,"../common/materials_common":206,"./proc_gen_constants":136,"../common/voxel_data_common":214,"./proc_gen_biomes":135,"./rand_seed":147,"./stone_tiers":159,"./tiles":164,"../glov/client/rand_fast":293,"../glov/common/vmath":337,"../glov/common/rand_alea":332,"../glov/common/util":335,"./proc_gen_details":138,"./biome_details":19,"./continent":37,"./proc_gen_hydro":139,"./proc_gen_shared":140,"./line2d":103}},"135":{"file":"workdir/client/proc_gen_biomes.js","deps":{"./proc_gen_constants.js":136,"../common/globals.js":201,"./biome_types.js":20,"./rand_seed.js":147,"./tiles.js":164,"./proc_gen.js":134,"../glov/common/rand_alea.js":332,"../glov/client/hsv.js":274,"../glov/common/util.js":335,"../glov/common/vmath.js":337,"./proc_gen_details.js":138,"../common/waygate_common.js":215,"./context.js":36,"./proc_gen_shared.js":140,"./continent.js":37,"./detail_gen_rendered.js":64,"./proc_gen_hydro.js":139,"./biome_details.js":19}},"136":{"file":"workdir/client/proc_gen_constants.js","deps":{}},"137":{"file":"workdir/client/proc_gen_debug.js","deps":{"../common/globals.js":201,"./debug.js":62,"./proc_gen.js":134,"./proc_gen_biomes.js":135,"./main.js":114,"./task_sched.js":163,"./ui_util.js":172,"./voxel_data.js":179,"../glov/client/camera2d.js":246,"../glov/client/engine.js":255,"../glov/client/input.js":276,"../glov/client/sprites.js":307,"../glov/client/textures.js":309,"../glov/common/vmath.js":337,"../glov/client/ui.js":311,"./proc_gen_shared.js":140,"./proc_gen_hydro.js":139}},"138":{"file":"workdir/client/proc_gen_details.js","deps":{"./proc_gen_biomes.js":135,"../common/globals.js":201,"../common/megachunk_common.js":207,"./proc_gen_shared.js":140,"./proc_gen_constants.js":136,"../glov/common/rand_alea.js":332,"../glov/common/verify.js":336,"../glov/common/vmath.js":337,"./cave_generators.js":29}},"139":{"file":"workdir/client/proc_gen_hydro.js","deps":{"../common/globals.js":201,"./proc_gen_constants.js":136,"./proc_gen_biomes.js":135,"./rand_seed.js":147,"./proc_gen_shared.js":140,"../glov/common/util.js":335,"../glov/common/vmath.js":337,"./priority_queue.js":133}},"140":{"file":"workdir/client/proc_gen_shared.js","deps":{"../common/globals.js":201}},"141":{"file":"workdir/client/prompt.js","deps":{"../glov/client/net.js":284}},"142":{"file":"workdir/client/prop_edit.js","deps":{"./menu.js":119,"./styles.js":162,"./main.js":114,"./status.js":158,"./voxel_data.js":179,"./localization/localization":110,"../glov/client/input.js":276,"../glov/client/cmds.js":249,"../glov/client/ui.js":311,"./layout.js":100,"../glov/client/words/profanity.js":315}},"143":{"file":"workdir/client/props.js","deps":{"../common/globals":201,"../common/items_common":204,"../common/world_trans":218,"../common/ids":202,"../common/materials_common":206,"../common/voxel_data_common":214,"./tiles":164,"./materials":116,"../glov/client/net":284,"../glov/common/util":335,"./ui_util":172,"../glov/client/cmds":249,"../glov/common/vmath":337,"../glov/client/engine":255,"../glov/client/localization":280,"../glov/client/mat4ScaleRotateTranslate":282,"../glov/common/verify":336,"../common/entitlements":198,"./flora_constants":85,"../common/leapgate_common":205,"./worlds_sound":191,"../glov/client/quat":292,"../glov/client/settings":296,"../glov/client/webfs":314,"./item_anims":96,"./inventory":94,"./world_metadata":190,"./styles":162,"../glov/client/shaders":298,"./status":158,"./quickbar":144,"../glov/client/font":265,"./rand_seed":147,"./race_results":145,"./palette":125,"../glov/client/snapshot":300,"./localization/localization":110,"./baking":17,"./camera":28,"./settlement":150,"./world_comm":186,"./floater":84,"./user_data":174,"./items":99,"./voxel_data_xraw":180,"./user_info_view":175,"./factory_ui":79,"../glov/client/input":276,"../glov/client/ui":311,"./prop_edit":142,"./worlds_soundscape":192,"./blueprint":24,"./editvolume_client":72,"./menu":119,"./voxel_data":179,"./bluebox_ui":23,"./build_mode":27,"./particle_system":128,"./energy_well":73,"./character_controller":30,"./sky":153,"./bluebox_edit_list":22,"./main":114}},"144":{"file":"workdir/client/quickbar.js","deps":{"./blueprint":24,"../common/ids":202,"../common/materials_common":206,"./inventory":94,"./build_mode":27,"./baking":17,"./items":99,"./status":158,"./main":114,"./menu":119,"./styles":162,"./props":143,"./voxel_data":179,"./tiles":164,"./user_data":174,"./world_comm":186,"./ui_util":172,"./world_metadata":190,"../glov/client/settings":296,"../glov/client/cmds":249,"../glov/client/engine":255,"../glov/client/input":276,"../glov/common/vmath":337,"../glov/common/util":335,"../glov/client/ui.js":311,"../glov/client/ui":311,"./localization/localization":110,"./build_menu":26,"./inventory_ui":95,"./layout":100,"../glov/client/sprites":307,"../glov/client/camera2d":246}},"145":{"file":"workdir/client/race_results.js","deps":{"./main.js":114,"./user_info_view.js":175,"./menu.js":119,"./props.js":143,"./styles.js":162,"./world_comm.js":186,"./ui_util.js":172,"../glov/common/util.js":335,"../glov/client/ui.js":311,"./localization/localization":110,"./world_info_view.js":188,"./fbinstant_worlds":80,"../glov/client/scroll_area.js":294,"../glov/client/fbinstant":262,"../glov/client/social.js":301}},"146":{"file":"workdir/client/race_ui.js","deps":{"./styles":162,"./layout":100,"./menu":119,"./quickbar":144,"./world_comm":186,"./share_menu":152,"./worlds_sound":191,"./user_data":174,"../glov/client/engine":255,"../glov/client/camera2d":246,"../glov/client/input":276,"../glov/common/util":335,"../glov/client/ui":311,"./localization/localization":110}},"147":{"file":"workdir/client/rand_seed.js","deps":{"../glov/common/rand_alea.js":332,"../glov/client/rand_fast.js":293}},"148":{"file":"workdir/client/red_dot.js","deps":{"../common/ids":202,"../common/waygate_upgrade_common":216,"./costume_edit":56,"./settlement":150,"./world_metadata":190,"./user_data":174,"../glov/client/cmds":249,"../glov/client/local_storage":279,"../glov/common/vmath":337,"../glov/client/engine":255,"../glov/client/ui":311,"../glov/client/net":284,"./localization/localization":110}},"149":{"file":"workdir/client/settings_menu.js","deps":{"./analytics.js":5,"./layout.js":100,"./main.js":114,"./inventory.js":94,"./styles.js":162,"./menu.js":119,"./user_data.js":174,"./orient.js":124,"./voxel_data.js":179,"./voxel_chunk_manager.js":178,"./tutorial.js":170,"./world_comm.js":186,"./world_metadata.js":190,"../glov/client/cmds.js":249,"../glov/client/browser.js":244,"../glov/client/engine.js":255,"../glov/client/input.js":276,"../glov/client/fscreen.js":267,"../glov/client/scroll_area.js":294,"../glov/client/ui":311,"../glov/client/slider.js":299,"../glov/common/util.js":335,"./localization/localization":110,"../glov/client/net.js":284,"../glov/client/settings.js":296,"./app_access.js":10,"./feedback":81,"./credits_menu.js":61}},"150":{"file":"workdir/client/settlement.js","deps":{"./editvolume_client.js":72,"./camera.js":28,"./main.js":114,"../common/globals.js":201,"./user_data.js":174,"./world_metadata.js":190,"./voxel_data.js":179,"../common/world_trans.js":218,"../glov/client/cmds.js":249,"../glov/client/engine.js":255,"../glov/client/settings.js":296,"../glov/common/vmath.js":337,"../glov/common/util.js":335,"./megachunk_client.js":118,"./voxel_chunk_manager.js":178,"../common/world_constants.js":217,"./waygate_upgrade.js":184,"./photo_mode.js":130,"../common/settlement_common.js":212,"../glov/client/sprites.js":307,"./draw_sprite3d.js":70,"./fx_util.js":86}},"151":{"file":"workdir/client/settlement_edit.js","deps":{"../common/ids":202,"./factory_ui.js":79,"./analytics.js":5,"./inventory_ui.js":95,"./inventory.js":94,"./item_info_view.js":97,"./layout.js":100,"./items.js":99,"./menu.js":119,"./settlement.js":150,"./styles.js":162,"./user_data.js":174,"./todo_list.js":167,"./ui_util.js":172,"./waygate_upgrade.js":184,"./tutorial.js":170,"./worlds_sound.js":191,"./world_metadata.js":190,"./waygate_ui.js":183,"./user_info_view.js":175,"../glov/client/camera2d.js":246,"../glov/common/util.js":335,"../glov/client/cmds.js":249,"../glov/client/settings.js":296,"../glov/client/engine.js":255,"../glov/common/vmath":337,"../glov/client/ui.js":311,"../glov/client/input.js":276,"../glov/client/walltime.js":313,"../glov/client/spot.js":305,"./localization/localization":110}},"152":{"file":"workdir/client/share_menu.js","deps":{"./build_mode.js":27,"./fbinstant_worlds.js":80,"./layout.js":100,"./main.js":114,"./analytics.js":5,"./menu.js":119,"./photo_mode.js":130,"./prop_edit.js":142,"./quickbar.js":144,"./ui_util.js":172,"./world_comm.js":186,"./localization/localization":110,"../glov/client/camera2d.js":246,"../glov/client/engine.js":255,"../glov/client/input.js":276,"../glov/client/net.js":284,"../glov/client/ui.js":311,"../glov/client/urlhash.js":312,"./platform_share_urls.js":132,"../common/photo_common.js":209}},"153":{"file":"workdir/client/sky.js","deps":{"../common/globals":201,"./camera":28,"./main":114,"./voxel_data":179,"./user_data":174,"./styles":162,"./voxel_data_xraw":180,"./world_metadata":190,"../glov/client/cmds":249,"../glov/client/engine":255,"../glov/client/font":265,"../glov/client/filewatch":264,"../glov/client/input":276,"../glov/common/vmath":337,"../glov/client/quat":292,"../glov/client/shaders":298,"../glov/client/ui":311,"../glov/client/webfs":314,"../glov/common/util":335,"./voxel_chunk_manager":178,"./photo_mode":130,"../glov/client/textures":309,"../glov/client/walltime":313,"../glov/client/slider":299,"../glov/client/hsv":274,"../glov/client/color_picker":250,"../glov/client/models":283}},"154":{"file":"workdir/client/social_menu.js","deps":{"./layout.js":100,"./fbinstant_worlds.js":80,"./styles.js":162,"./social_referral.js":155,"./main.js":114,"./menu.js":119,"./user_info_view.js":175,"./user_data.js":174,"./waygate_ui.js":183,"./world_comm.js":186,"./main_menu.js":115,"../glov/client/ui.js":311,"../glov/client/scroll_area.js":294,"../glov/client/social.js":301,"../glov/common/enums.js":326,"./localization/localization":110}},"155":{"file":"workdir/client/social_referral.js","deps":{"../glov/client/net":284,"../glov/client/urlhash.js":312}},"156":{"file":"workdir/client/soundscape_data.js","deps":{}},"157":{"file":"workdir/client/state_machine.js","deps":{}},"158":{"file":"workdir/client/status.js","deps":{"./styles.js":162,"../glov/client/engine.js":255,"../glov/client/font.js":265,"../glov/client/ui.js":311,"../glov/common/vmath.js":337,"../glov/common/util.js":335,"../glov/client/camera2d.js":246}},"159":{"file":"workdir/client/stone_tiers.js","deps":{"../common/materials_common":206}},"160":{"file":"workdir/client/store.js","deps":{"../common/store_data":213,"./analytics":5,"./world_comm":186,"./worlds_sound":191,"./ui_util":172,"../glov/client/net":284,"../glov/client/walltime":313,"../glov/client/ui":311,"../glov/common/util":335,"./localization/localization":110}},"161":{"file":"workdir/client/stuck.js","deps":{"./energy_well.js":73,"../common/globals.js":201,"./editvolume_client.js":72,"./client_cmds.js":34,"./main.js":114,"./settlement.js":150,"./proc_gen_biomes.js":135,"./voxel_data.js":179,"./user_data.js":174,"./world_metadata.js":190,"./localization/localization":110,"../glov/common/vmath.js":337,"../glov/client/walltime.js":313}},"162":{"file":"workdir/client/styles.js","deps":{"../glov/client/ui.js":311,"../glov/common/vmath.js":337,"../glov/client/font.js":265,"../common/roles_common":211}},"163":{"file":"workdir/client/task_sched.js","deps":{"../glov/common/util.js":335,"../glov/client/worker_comm.js":316,"../glov/client/engine.js":255}},"164":{"file":"workdir/client/tiles.js","deps":{"../common/materials_common":206,"../common/ids":202,"../glov/common/util":335,"./atlas_params.json":12,"./tiles_const":165,"../glov/common/vmath":337,"./autogen/liquid_tiles_data":15,"./autogen/tiles_data":16}},"165":{"file":"workdir/client/tiles_const.js","deps":{}},"166":{"file":"workdir/client/tiles_ui.js","deps":{}},"167":{"file":"workdir/client/todo_list.js","deps":{"../common/ids":202,"./blueprint":24,"./build_mode":27,"./inventory":94,"./item_info_view":97,"./inventory_ui":95,"./styles":162,"./layout":100,"./menu":119,"./user_data":174,"./status":158,"./ui_util":172,"./items":99,"./settlement":150,"./tutorial":170,"./world_metadata":190,"./waygate_upgrade":184,"../glov/client/camera2d":246,"../glov/client/input":276,"../glov/common/vmath":337,"../glov/client/scroll_area":294,"../glov/client/ui":311,"../glov/client/engine":255,"../glov/client/sprites":307,"../glov/common/util":335,"./localization/localization":110,"./settlement_edit":151}},"168":{"file":"workdir/client/tools/logparser.js","deps":{"../../glov/client/local_storage":279,"../../common/materials_common":206,"../../common/ids":202,"../../common/globals":201,"../../glov/common/util":335,"../materials":116,"../../common/items_common":204,"../../common/world_trans":218,"../../common/voxel_data_common":214,"../tiles.js":164,"../../glov/client/environments":259,"../../glov/client/net":284,"../crafting_mods":58,"../props":143}},"169":{"file":"workdir/client/tools/logparser_wrap.js","deps":{"../../glov/client/bootstrap.js":243,"./logparser.js":168}},"170":{"file":"workdir/client/tutorial.js","deps":{"../common/materials_common":206,"../common/ids":202,"../common/world_trans":218,"./analytics":5,"./build_menu":26,"./fbinstant_worlds":80,"./debug":62,"./items":99,"./inventory":94,"./layout":100,"./main":114,"./photo_mode":130,"./quickbar.js":144,"./props.js":143,"./menu":119,"./share_menu":152,"./race_ui":146,"./settlement":150,"./todo_list":167,"./status":158,"./styles":162,"./ui_util":172,"./voxel_data.js":179,"./user_data":174,"./waygate_ui":183,"./world_comm":186,"./world_metadata":190,"./worlds_sound":191,"../glov/client/camera2d":246,"../glov/client/cmds":249,"../glov/client/font":265,"../glov/client/engine":255,"../glov/client/ui":311,"../glov/client/input":276,"../glov/common/util.js":335,"../glov/common/vmath":337,"../glov/common/verify":336,"./localization/localization":110,"../glov/client/spot":305,"./settlement_edit":151,"./chunk_searcher":33}},"171":{"file":"workdir/client/ui_sounds.js","deps":{}},"172":{"file":"workdir/client/ui_util.js","deps":{"../glov/client/sprites":307}},"173":{"file":"workdir/client/ui_util_2.js","deps":{"../glov/client/sprites":307}},"174":{"file":"workdir/client/user_data.js","deps":{"./build_mode.js":27,"./crafting_mods.js":58,"./editvolume_client.js":72,"./inventory.js":94,"./energy_well.js":73,"./quickbar.js":144,"./main.js":114,"./status.js":158,"./world_metadata.js":190,"./world_comm.js":186,"./localization/localization":110,"../glov/client/net.js":284,"../glov/client/engine.js":255,"../glov/common/util.js":335,"./huds.js":87,"./voxel_chunk_manager.js":178,"../common/world_constants.js":217,"./analytics.js":5,"./todo_list.js":167,"./tutorial.js":170,"./red_dot.js":148,"../common/roles_common":211,"../glov/client/error_report.js":260,"../glov/common/dot-prop.js":324}},"175":{"file":"workdir/client/user_info_view.js","deps":{"./main.js":114,"./styles.js":162,"./menu.js":119,"./user_data":174,"./world_comm.js":186,"../glov/client/engine.js":255,"../glov/client/net.js":284,"../glov/client/input.js":276,"../glov/client/ui.js":311,"./localization/localization":110,"../glov/common/util.js":335,"../glov/common/vmath.js":337,"../common/world_constants":217,"./analytics.js":5,"./main_menu.js":115,"./waygate_ui.js":183,"./world_info_view.js":188,"./fbinstant_worlds.js":80,"../glov/client/camera2d.js":246,"../glov/client/social.js":301,"../glov/common/enums.js":326,"./access_control.js":2,"../glov/client/selection_box.js":295}},"176":{"file":"workdir/client/user_party.js","deps":{"./user_info_view":175,"../glov/client/error_report":260,"../glov/client/external_users_client":261,"../glov/client/net":284,"../glov/common/external_users_common":327}},"177":{"file":"workdir/client/voxel_atlas.js","deps":{"./tiles.js":164,"../glov/client/engine.js":255,"../common/atlas_common.js":195}},"178":{"file":"workdir/client/voxel_chunk_manager.js","deps":{"./build_mode.js":27,"./camera.js":28,"./debug.js":62,"../common/globals.js":201,"./megachunk_client.js":118,"./proc_gen_debug.js":137,"../common/megachunk_common.js":207,"./world_claims.js":185,"./user_data.js":174,"./voxel_gen.js":181,"./voxel_mesh.js":182,"./voxel_data.js":179,"./task_sched.js":163,"../glov/client/browser.js":244,"../glov/client/cmds.js":249,"../glov/client/net.js":284,"../glov/common/vmath.js":337,"../glov/client/engine.js":255,"../glov/client/shaders.js":298,"../glov/client/textures.js":309,"../glov/common/verify.js":336,"../glov/client/models.js":283,"./lists.js":106}},"179":{"file":"workdir/client/voxel_data.js","deps":{"../common/globals":201,"../common/ids":202,"../common/materials_common":206,"../common/voxel_data_common":214,"../common/world_trans":218,"./editvolume_client":72,"./atlas_params.json":12,"./items":99,"./item_anims":96,"./main":114,"./status":158,"./props":143,"./sky":153,"./world_metadata":190,"./world_comm":186,"./user_data":174,"./tiles":164,"../glov/client/cmds":249,"../glov/client/quat":292,"../glov/client/engine":255,"../glov/common/util":335,"../glov/common/vmath":337,"./localization/localization":110,"../glov/client/shaders":298,"../glov/client/settings":296,"../glov/client/mat4ScaleRotateTranslate":282,"./megachunk_client":118,"./voxel_chunk_manager":178,"./editvolume_clear":71,"./client_entities":35,"./proc_gen_biomes":135,"./voxel_gen":181,"./world_claims":185,"./lods":111,"../glov/client/draw_list":251,"../glov/client/geom":268,"../glov/client/textures":309,"../glov/client/error_report":260,"../glov/client/browser":244,"../glov/client/hsv":274,"./light_calc":102,"./mesh_calc":120,"./line3d":104,"./voxel_mesh":182,"./mesh_exporter":121,"./liquid":105,"./biome_types":20,"../glov/client/perf":286}},"180":{"file":"workdir/client/voxel_data_xraw.js","deps":{"./baking":17,"./palette":125,"./voxel_data":179,"../glov/client/filewatch":264,"../glov/client/urlhash":312,"../glov/client/net":284,"../glov/common/vmath":337,"../glov/client/webfs":314,"../glov/common/util":335,"../glov/client/textures":309,"../glov/client/fetch":263}},"181":{"file":"workdir/client/voxel_gen.js","deps":{"./megachunk_client.js":118,"./proc_gen_biomes.js":135,"./proc_gen_constants.js":136,"./proc_gen.js":134,"./lods.js":111,"./task_sched.js":163,"./voxel_data.js":179,"./voxel_mesh.js":182,"./world_comm.js":186,"./sky.js":153,"./continent_loader.js":38,"./world_metadata.js":190,"../glov/client/engine.js":255,"../glov/client/worker_comm.js":316,"./proc_gen_details.js":138,"./continent.js":37}},"182":{"file":"workdir/client/voxel_mesh.js","deps":{"../common/globals.js":201,"./megachunk_client.js":118,"./lods.js":111,"./mesh_calc.js":120,"./task_sched.js":163,"./voxel_chunk_manager.js":178,"../common/voxel_data_common.js":214,"./voxel_data.js":179,"../glov/client/cmds.js":249,"../glov/client/engine.js":255,"../glov/client/settings.js":296,"../glov/common/util.js":335,"../glov/common/verify.js":336}},"183":{"file":"workdir/client/waygate_ui.js","deps":{"./editvolume_client":72,"../common/ids":202,"./analytics":5,"./access_control":2,"../common/world_constants":217,"./fbinstant_worlds":80,"./build_mode":27,"./file_management":82,"./fx_util":86,"./energy_well":73,"./main":114,"./layout":100,"./main_menu":115,"./menu":119,"./photo_mode":130,"./prop_edit":142,"./props.js":143,"./styles":162,"./rand_seed":147,"./ui_util":172,"./settlement":150,"./user_data":174,"./world_info_view":188,"./world_comm":186,"./world_metadata":190,"./status":158,"../glov/client/engine":255,"../glov/client/camera2d":246,"../glov/client/net":284,"../glov/client/input":276,"../glov/client/link":278,"../glov/client/scroll_area":294,"../glov/client/sprites":307,"../glov/client/settings":296,"../glov/client/selection_box":295,"../glov/client/ui":311,"../glov/client/textures":309,"../glov/client/urlhash":312,"../glov/client/transition":310,"../glov/common/vmath":337,"../glov/common/verify":336,"../glov/common/util":335,"./localization/localization":110,"../common/waygate_common":215,"./platform_share_urls":132,"./settlement_edit":151}},"184":{"file":"workdir/client/waygate_upgrade.js","deps":{"../common/waygate_upgrade_common":216,"../common/ids":202,"./items":99,"./crafting_recipes":59,"./tiles":164}},"185":{"file":"workdir/client/world_claims.js","deps":{"./world_comm.js":186,"./main.js":114,"./voxel_data.js":179,"../glov/client/net.js":284,"../glov/client/engine.js":255}},"186":{"file":"workdir/client/world_comm.js","deps":{"../common/voxel_data_common.js":214,"../common/world_trans.js":218,"./blueprint.js":24,"./energy_well.js":73,"./inventory.js":94,"./item_anims.js":96,"./build_mode.js":27,"./editvolume_client.js":72,"./menu.js":119,"./props.js":143,"./status.js":158,"./main.js":114,"./tiles.js":164,"./ui_util.js":172,"./user_data.js":174,"./voxel_data.js":179,"./world_metadata.js":190,"../glov/client/cmds.js":249,"../glov/client/engine.js":255,"../glov/client/local_storage.js":279,"../glov/client/client_config.js":248,"../glov/client/net.js":284,"../glov/client/subscription_manager.js":308,"../glov/client/settings.js":296,"../glov/client/urlhash.js":312,"../glov/client/ui.js":311,"../glov/common/util.js":335,"../glov/client/input.js":276,"../glov/common/verify.js":336,"../glov/common/vmath.js":337,"./localization/localization":110,"./megachunk_client.js":118,"./voxel_chunk_manager.js":178,"../common/world_constants.js":217,"./analytics.js":5,"./client_cmds.js":34,"./main_menu.js":115,"./client_entities.js":35,"./user_party":176,"./mobs.js":122,"./voxel_mesh.js":182,"./world_claims.js":185,"./tutorial.js":170,"./continent_loader.js":38,"./fbinstant_worlds.js":80,"./item_unlock_ui.js":98,"./social_referral.js":155,"../common/permissions.js":208,"../glov/client/error_report.js":260,"../glov/client/fscreen.js":267,"../glov/client/perf.js":286,"../common/store_data.js":213}},"187":{"file":"workdir/client/world_info_local_cache.js","deps":{"../glov/client/local_storage":279,"../glov/client/engine":255}},"188":{"file":"workdir/client/world_info_view.js","deps":{"../common/roles_common":211,"./styles.js":162,"./build_mode.js":27,"./fbinstant_worlds.js":80,"./layout.js":100,"./main.js":114,"./main_menu.js":115,"./menu.js":119,"./race_results.js":145,"./race_ui.js":146,"./settlement.js":150,"./status.js":158,"./ui_util.js":172,"./user_info_view.js":175,"./waygate_upgrade.js":184,"./waygate_ui.js":183,"./user_data.js":174,"../common/world_constants.js":217,"./world_comm.js":186,"./world_metadata.js":190,"./analytics.js":5,"./localization/localization":110,"../glov/client/engine.js":255,"../glov/client/social.js":301,"../glov/client/link.js":278,"../glov/client/input.js":276,"../glov/client/net.js":284,"../glov/client/scroll_area.js":294,"../glov/client/selection_box.js":295,"../glov/client/ui.js":311,"../glov/client/walltime.js":313,"../glov/common/util.js":335,"../common/waygate_common.js":215,"./stuck.js":161,"./platform_share_urls":132}},"189":{"file":"workdir/client/world_init.js","deps":{"../common/globals":201,"./continent_loader":38,"../common/ids":202,"../common/materials_common":206,"../common/world_trans":218,"./main":114,"./proc_gen_biomes":135,"./items":99,"./tiles":164,"./proc_gen_constants":136,"./props":143,"./world_comm":186,"./voxel_data":179,"./world_metadata":190,"../glov/common/vmath":337,"../common/waygate_common":215,"./proc_gen_hydro":139}},"190":{"file":"workdir/client/world_metadata.js","deps":{"./editvolume_client.js":72,"./main.js":114,"./settlement.js":150,"./voxel_data.js":179,"../glov/client/cmds.js":249,"../glov/client/urlhash.js":312,"../glov/common/util.js":335,"../common/world_constants.js":217,"./client_cmds.js":34,"./main_menu.js":115,"./world_info_view.js":188}},"191":{"file":"workdir/client/worlds_sound.js","deps":{"../glov/client/ui":311}},"192":{"file":"workdir/client/worlds_soundscape.js","deps":{"../glov/client/engine.js":255,"../glov/common/util.js":335,"./debug.js":62,"./soundscape_data.js":156,"../glov/client/sound.js":302,"../glov/client/soundscape.js":303}},"193":{"file":"workdir/common/abtests_worlds_common.js","deps":{}},"194":{"file":"workdir/common/async_dictionary.js","deps":{"../glov/common/util.js":335}},"195":{"file":"workdir/common/atlas_common.js","deps":{}},"196":{"file":"workdir/common/blueprint_common.js","deps":{}},"197":{"file":"workdir/common/editvolume_common.js","deps":{"./megachunk_common":207}},"198":{"file":"workdir/common/entitlements.js","deps":{"./materials_common":206}},"199":{"file":"workdir/common/entity_worlds_common.js","deps":{"./globals":201,"../glov/common/entity_base_common":325}},"200":{"file":"workdir/common/external_users/external_users_provider_ids.js","deps":{}},"201":{"file":"workdir/common/globals.js","deps":{}},"202":{"file":"workdir/common/ids.js","deps":{}},"203":{"file":"workdir/common/in_app_purchases/iap_common.js","deps":{}},"204":{"file":"workdir/common/items_common.js","deps":{"./materials_common":206}},"205":{"file":"workdir/common/leapgate_common.js","deps":{"./ids":202,"./materials_common":206,"../glov/common/util":335}},"206":{"file":"workdir/common/materials_common.js","deps":{}},"207":{"file":"workdir/common/megachunk_common.js","deps":{"../common/globals.js":201}},"208":{"file":"workdir/common/permissions.js","deps":{}},"209":{"file":"workdir/common/photo_common.js","deps":{}},"210":{"file":"workdir/common/rewards_common.js","deps":{}},"211":{"file":"workdir/common/roles_common.js","deps":{}},"212":{"file":"workdir/common/settlement_common.js","deps":{}},"213":{"file":"workdir/common/store_data.js","deps":{"../glov/common/util":335}},"214":{"file":"workdir/common/voxel_data_common.js","deps":{"../common/globals":201,"../glov/common/util":335}},"215":{"file":"workdir/common/waygate_common.js","deps":{}},"216":{"file":"workdir/common/waygate_upgrade_common.js","deps":{"./materials_common":206,"./ids":202}},"217":{"file":"workdir/common/world_constants.js","deps":{}},"218":{"file":"workdir/common/world_trans.js","deps":{"./items_common":204,"./globals":201,"./voxel_data_common":214,"../glov/common/util":335}},"219":{"file":"workdir/frvr/client/early-utils.js","deps":{}},"220":{"file":"workdir/frvr/client/frvr-analytics.js","deps":{"./early-utils.js":219,"./game-specifics.js":221}},"221":{"file":"workdir/frvr/client/game-specifics.js","deps":{"../../common/globals.js":201}},"222":{"file":"workdir/frvr/client/platforms/adapter.js","deps":{"./yandex/yandex":228,"./huawei-quickapp/huawei-quickapp":225,"./android/android":223,"./ios/ios":227}},"223":{"file":"workdir/frvr/client/platforms/android/android.js","deps":{"../../../../glov/client/client_config":248,"../../xplay/idfa/idfa":236}},"224":{"file":"workdir/frvr/client/platforms/huawei-quickapp/huawei-events.js","deps":{}},"225":{"file":"workdir/frvr/client/platforms/huawei-quickapp/huawei-quickapp.js","deps":{"../../../../glov/client/fscreen.js":267,"./is-huawei":226,"./huawei-events":224}},"226":{"file":"workdir/frvr/client/platforms/huawei-quickapp/is-huawei.js","deps":{}},"227":{"file":"workdir/frvr/client/platforms/ios/ios.js","deps":{"../../../../glov/client/client_config":248,"../../xplay/idfa/idfa":236}},"228":{"file":"workdir/frvr/client/platforms/yandex/yandex.js","deps":{}},"229":{"file":"workdir/frvr/client/xplay/facebook/facebook.js","deps":{"../../../../glov/client/client_config.js":248,"./web.js":231,"./mobile.js":230}},"230":{"file":"workdir/frvr/client/xplay/facebook/mobile.js","deps":{"../host/host.js":233}},"231":{"file":"workdir/frvr/client/xplay/facebook/web.js","deps":{}},"232":{"file":"workdir/frvr/client/xplay/host/android.js","deps":{}},"233":{"file":"workdir/frvr/client/xplay/host/host.js","deps":{"../../../../glov/client/client_config.js":248,"./ios.js":234,"./android.js":232}},"234":{"file":"workdir/frvr/client/xplay/host/ios.js","deps":{}},"235":{"file":"workdir/frvr/client/xplay/idfa/android.js","deps":{"../host/host":233}},"236":{"file":"workdir/frvr/client/xplay/idfa/idfa.js","deps":{"../../../../glov/client/client_config":248,"./android.js":235,"./ios.js":237}},"237":{"file":"workdir/frvr/client/xplay/idfa/ios.js","deps":{"../host/host":233}},"238":{"file":"workdir/frvr/client/xplay/login.js","deps":{"../../../glov/client/local_storage.js":279,"../../../glov/client/client_config.js":248,"./yandex/yandex.js":240,"./signin_with_apple/ios.js":239,"./facebook/facebook.js":229}},"239":{"file":"workdir/frvr/client/xplay/signin_with_apple/ios.js","deps":{"../../../../glov/client/client_config":248,"../host/host.js":233}},"240":{"file":"workdir/frvr/client/xplay/yandex/yandex.js","deps":{}},"241":{"file":"workdir/glov/client/aabbtree.js","deps":{}},"242":{"file":"workdir/glov/client/abtests_client.js","deps":{"./net":284,"./local_storage":279}},"243":{"file":"workdir/glov/client/bootstrap.js","deps":{"./polyfill.js":289}},"244":{"file":"workdir/glov/client/browser.js","deps":{}},"245":{"file":"workdir/glov/client/build_ui.js","deps":{"./camera2d.js":246,"./font.js":265,"./scroll_area.js":294,"./engine.js":255,"../common/util.js":335,"../common/vmath.js":337,"./net.js":284,"./ui.js":311}},"246":{"file":"workdir/glov/client/camera2d.js","deps":{"./engine.js":255}},"247":{"file":"workdir/glov/client/chat_ui.js","deps":{"./camera2d.js":246,"./cmds.js":249,"./social.js":301,"./font.js":265,"./local_storage.js":279,"./net.js":284,"./input.js":276,"./localization.js":280,"./engine.js":255,"./settings.js":296,"../common/vmath.js":337,"../common/util.js":335,"./ui.js":311,"./scroll_area.js":294,"./spot.js":305,"./link.js":278,"./words/profanity.js":315}},"248":{"file":"workdir/glov/client/client_config.js","deps":{"../common/enums":326}},"249":{"file":"workdir/glov/client/cmds.js","deps":{"./engine.js":255,"./shaders.js":298,"../common/wscommon.js":339,"./local_storage.js":279,"./net.js":284,"./textures.js":309,"./error_report.js":260,"../common/cmd_parse.js":322}},"250":{"file":"workdir/glov/client/color_picker.js","deps":{"./input.js":276,"./camera2d.js":246,"./hsv.js":274,"./ui.js":311,"./textures.js":309,"./sprites.js":307,"../common/util.js":335,"../common/vmath.js":337}},"251":{"file":"workdir/glov/client/draw_list.js","deps":{"./engine.js":255,"./dyn_geom.js":252}},"252":{"file":"workdir/glov/client/dyn_geom.js","deps":{"../common/util.js":335,"../common/vmath.js":337,"./engine.js":255,"./shaders.js":298,"./geom.js":268,"./sprites.js":307,"./textures.js":309}},"253":{"file":"workdir/glov/client/edit_box.js","deps":{"../common/verify.js":336,"./camera2d.js":246,"./input.js":276,"./spot.js":305,"./ui.js":311,"./engine.js":255,"./localization.js":280}},"254":{"file":"workdir/glov/client/effects.js","deps":{"./framebuffer.js":266,"./geom.js":268,"./sprites.js":307,"./shaders.js":298,"../common/vmath.js":337,"./textures.js":309,"./engine.js":255}},"255":{"file":"workdir/glov/client/engine.js","deps":{"./bootstrap.js":243,"./client_config.js":248,"./cmds.js":249,"./font.js":265,"./input.js":276,"./local_storage.js":279,"./settings.js":296,"./ui.js":311,"./shaders.js":298,"../common/verify.js":336,"./urlhash.js":312,"../common/vmath.js":337,"../common/util.js":335,"./sprites.js":307,"./geom.js":268,"./textures.js":309,"./effects.js":254,"./error_report.js":260,"./camera2d.js":246,"./spot.js":305,"./browser.js":244,"./models.js":283,"./sound.js":302,"./perf.js":286,"../common/perfcounters.js":331,"./particles.js":285,"./profiler.js":290,"./framebuffer.js":266,"./build_ui.js":245,"./profiler_ui.js":291,"./transition.js":310,"./shader_debug_ui.js":297}},"256":{"file":"workdir/glov/client/entity_base_client.js","deps":{"./engine":255,"../common/entity_base_common":325}},"257":{"file":"workdir/glov/client/entity_manager_client.js","deps":{"../common/entity_base_common":325,"../common/tiny-events":333,"./engine":255,"./net":284,"./walltime.js":313,"../common/util":335}},"258":{"file":"workdir/glov/client/entity_position_manager.js","deps":{"../common/util":335,"./perf_net":287,"./engine":255}},"259":{"file":"workdir/glov/client/environments.js","deps":{"./net":284,"./urlhash":312,"./client_config":248,"./cmds":249}},"260":{"file":"workdir/glov/client/error_report.js","deps":{"./environments":259,"./fetch":263,"./client_config":248}},"261":{"file":"workdir/glov/client/external_users_client.js","deps":{"./social":301,"../common/external_users_common":327}},"262":{"file":"workdir/glov/client/fbinstant.js","deps":{"./local_storage":279,"./error_report":260,"../common/util":335,"./urlhash":312}},"263":{"file":"workdir/glov/client/fetch.js","deps":{"../common/util.js":335}},"264":{"file":"workdir/glov/client/filewatch.js","deps":{}},"265":{"file":"workdir/glov/client/font.js","deps":{"./engine.js":255,"./localization.js":280,"../common/util.js":335,"../common/vmath.js":337,"./shaders.js":298,"./sprites.js":307,"./geom.js":268,"./textures.js":309,"./camera2d.js":246}},"266":{"file":"workdir/glov/client/framebuffer.js","deps":{"./browser.js":244,"./effects.js":254,"./cmds.js":249,"./settings.js":296,"./engine.js":255,"./textures.js":309,"./perf.js":286}},"267":{"file":"workdir/glov/client/fscreen.js","deps":{"../common/util.js":335}},"268":{"file":"workdir/glov/client/geom.js","deps":{"./cmds.js":249,"./settings.js":296,"./engine.js":255,"./shaders.js":298,"./perf.js":286}},"269":{"file":"workdir/glov/client/glb/decode-utf8.js","deps":{}},"270":{"file":"workdir/glov/client/glb/gltf-type-utils.js","deps":{}},"271":{"file":"workdir/glov/client/glb/parser.js","deps":{"./gltf-type-utils.js":270,"./decode-utf8.js":269,"./unpack-binary-json.js":272,"./unpack-glb-buffers.js":273}},"272":{"file":"workdir/glov/client/glb/unpack-binary-json.js","deps":{}},"273":{"file":"workdir/glov/client/glb/unpack-glb-buffers.js","deps":{"./gltf-type-utils.js":270}},"274":{"file":"workdir/glov/client/hsv.js","deps":{}},"275":{"file":"workdir/glov/client/in_event.js","deps":{}},"276":{"file":"workdir/glov/client/input.js","deps":{"../common/util.js":335,"./cmds.js":249,"./engine.js":255,"./settings.js":296,"./local_storage.js":279,"../common/vmath.js":337,"./camera2d.js":246,"./spot.js":305,"./browser.js":244,"./sound.js":302,"./input_constants":277,"./in_event.js":275,"./pointer_lock.js":288}},"277":{"file":"workdir/glov/client/input_constants.js","deps":{}},"278":{"file":"workdir/glov/client/link.js","deps":{"./engine.js":255,"./camera2d.js":246,"./in_event.js":275,"./font.js":265,"./input.js":276,"./settings.js":296,"./ui.js":311,"./spot.js":305}},"279":{"file":"workdir/glov/client/local_storage.js","deps":{}},"280":{"file":"workdir/glov/client/localization.js","deps":{}},"281":{"file":"workdir/glov/client/mat43.js","deps":{}},"282":{"file":"workdir/glov/client/mat4ScaleRotateTranslate.js","deps":{}},"283":{"file":"workdir/glov/client/models.js","deps":{"./geom.js":268,"./fetch.js":263,"./engine.js":255,"./shaders.js":298,"./textures.js":309,"./webfs.js":314,"../common/vmath.js":337,"./glb/gltf-type-utils.js":270,"./glb/parser.js":271}},"284":{"file":"workdir/glov/client/net.js","deps":{"./filewatch.js":264,"../common/packet.js":330,"./wsclient.js":318,"../common/wscommon.js":339,"./subscription_manager.js":308}},"285":{"file":"workdir/glov/client/particles.js","deps":{}},"286":{"file":"workdir/glov/client/perf.js","deps":{"./font.js":265,"./cmds.js":249,"./camera2d.js":246,"./net.js":284,"../common/perfcounters.js":331,"./settings.js":296,"./engine.js":255,"./profiler_ui.js":291,"./sprites.js":307,"./ui.js":311,"./input.js":276,"../common/vmath.js":337,"./perf_net.js":287}},"287":{"file":"workdir/glov/client/perf_net.js","deps":{"../common/wscommon":339,"./cmds":249,"./settings":296,"./perf":286}},"288":{"file":"workdir/glov/client/pointer_lock.js","deps":{"../common/util.js":335}},"289":{"file":"workdir/glov/client/polyfill.js","deps":{}},"290":{"file":"workdir/glov/client/profiler.js","deps":{"./engine.js":255,"./local_storage.js":279}},"291":{"file":"workdir/glov/client/profiler_ui.js","deps":{"./camera2d.js":246,"./engine.js":255,"./cmds.js":249,"./input.js":276,"./net.js":284,"./ui.js":311,"./perf.js":286,"./profiler.js":290,"./settings.js":296,"./font.js":265,"../common/util.js":335,"../common/vmath.js":337,"./sprites.js":307}},"292":{"file":"workdir/glov/client/quat.js","deps":{"../common/vmath.js":337}},"293":{"file":"workdir/glov/client/rand_fast.js","deps":{}},"294":{"file":"workdir/glov/client/scroll_area.js","deps":{"../common/verify.js":336,"../common/util.js":335,"../common/vmath":337,"./input.js":276,"./camera2d.js":246,"./engine.js":255,"./sprites.js":307,"./spot.js":305,"./ui.js":311}},"295":{"file":"workdir/glov/client/selection_box.js","deps":{"./camera2d.js":246,"../common/util.js":335,"./engine.js":255,"./input.js":276,"../common/vmath.js":337,"./font.js":265,"./link.js":278,"./ui.js":311,"./sprites.js":307,"./spot.js":305,"./scroll_area.js":294}},"296":{"file":"workdir/glov/client/settings.js","deps":{"./cmds.js":249,"./engine.js":255,"../common/util.js":335}},"297":{"file":"workdir/glov/client/shader_debug_ui.js","deps":{"./engine.js":255,"./camera2d.js":246,"./cmds.js":249,"./input.js":276,"./font.js":265,"./fetch.js":263,"./settings.js":296,"../common/util.js":335,"./shaders.js":298,"../common/vmath.js":337,"./scroll_area.js":294,"./ui.js":311}},"298":{"file":"workdir/glov/client/shaders.js","deps":{"./engine.js":255,"./filewatch.js":264,"../common/util.js":335,"./webfs.js":314,"./textures.js":309,"./error_report.js":260}},"299":{"file":"workdir/glov/client/slider.js","deps":{"../common/vmath.js":337,"../common/util.js":335,"./spot.js":305,"./ui.js":311,"./input.js":276}},"300":{"file":"workdir/glov/client/snapshot.js","deps":{"./engine.js":255,"./quat.js":292,"./shaders.js":298,"../common/vmath.js":337,"./sprites.js":307,"./draw_list.js":251,"./textures.js":309,"./effects.js":254,"./camera2d.js":246,"./framebuffer.js":266}},"301":{"file":"workdir/glov/client/social.js","deps":{"../common/enums":326,"../common/util":335,"./cmds":249,"./client_config":248,"./net":284,"./sprites":307,"./textures":309,"./input":276,"../common/friends_data":328}},"302":{"file":"workdir/glov/client/sound.js","deps":{"../common/util":335,"./browser":244,"./cmds":249,"./filewatch":264,"./fbinstant":262,"./settings":296,"./urlhash":312}},"303":{"file":"workdir/glov/client/soundscape.js","deps":{"./engine.js":255,"./sound":302,"../common/util":335,"./settings":296,"./soundscape_types":304}},"304":{"file":"workdir/glov/client/soundscape_types.js","deps":{}},"305":{"file":"workdir/glov/client/spot.js","deps":{"../common/verify":336,"./camera2d.js":246,"./engine.js":255,"./font.js":265,"./input_constants":277,"./input.js":276,"./settings.js":296,"./ui.js":311}},"306":{"file":"workdir/glov/client/sprite_animation.js","deps":{}},"307":{"file":"workdir/glov/client/sprites.js","deps":{"./camera2d.js":246,"./engine.js":255,"./geom.js":268,"./textures.js":309,"../common/util.js":335,"./shaders.js":298,"../common/vmath.js":337,"./dyn_geom.js":252}},"308":{"file":"workdir/glov/client/subscription_manager.js","deps":{"../common/packet":330,"./local_storage":279,"../common/util":335,"./net":284,"./walltime":313,"../common/dot-prop":324,"../common/perfcounters":331,"../common/md5":329,"../common/tiny-events":333,"./external_users_client":261,"../common/chunked_send":321}},"309":{"file":"workdir/glov/client/textures.js","deps":{"../common/util":335,"./engine":255,"./filewatch":264,"./local_storage":279,"./shaders":298,"./settings":296,"./urlhash":312}},"310":{"file":"workdir/glov/client/transition.js","deps":{"./camera2d.js":246,"./engine.js":255,"./framebuffer.js":266,"./sprites.js":307,"../common/util.js":335,"./shaders.js":298,"../common/vmath.js":337,"./effects.js":254,"../common/verify.js":336,"./ui.js":311,"./textures.js":309}},"311":{"file":"workdir/glov/client/ui.js","deps":{"./engine.js":255,"./input.js":276,"./font.js":265,"./localization.js":280,"../common/util.js":335,"../common/vmath.js":337,"./sprites.js":307,"./textures.js":309,"./effects.js":254,"./scroll_area.js":294,"./camera2d.js":246,"./spot.js":305,"./slider.js":299,"./sound.js":302,"./mat43.js":281,"./edit_box.js":253,"./link.js":278}},"312":{"file":"workdir/glov/client/urlhash.js","deps":{"../common/util.js":335}},"313":{"file":"workdir/glov/client/walltime.js","deps":{}},"314":{"file":"workdir/glov/client/webfs.js","deps":{"./filewatch.js":264,"./urlhash.js":312,"../common/util.js":335}},"315":{"file":"workdir/glov/client/words/profanity.js","deps":{"../../common/rand_alea.js":332,"../rand_fast.js":293,"../webfs.js":314,"../../common/words/profanity_common.js":338}},"316":{"file":"workdir/glov/client/worker_comm.js","deps":{}},"317":{"file":"workdir/glov/client/worker_perf.js","deps":{"./cmds.js":249,"./camera2d.js":246,"./settings.js":296,"./engine.js":255,"./worker_comm.js":316,"../common/vmath.js":337,"./ui.js":311}},"318":{"file":"workdir/glov/client/wsclient.js","deps":{"./environments":259,"./urlhash.js":312,"../common/wscommon.js":339,"./client_config.js":248,"./error_report.js":260,"./fetch.js":263,"../common/ack.js":319,"../common/perfcounters.js":331}},"319":{"file":"workdir/glov/common/ack.js","deps":{"./packet.js":330,"./perfcounters.js":331}},"320":{"file":"workdir/glov/common/base64.js","deps":{}},"321":{"file":"workdir/glov/common/chunked_send.js","deps":{"./packet.js":330,"./crc32.js":323}},"322":{"file":"workdir/glov/common/cmd_parse.js","deps":{"./perfcounters.js":331,"./util.js":335}},"323":{"file":"workdir/glov/common/crc32.js","deps":{}},"324":{"file":"workdir/glov/common/dot-prop.js","deps":{"./util.js":335}},"325":{"file":"workdir/glov/common/entity_base_common.js","deps":{}},"326":{"file":"workdir/glov/common/enums.js","deps":{}},"327":{"file":"workdir/glov/common/external_users_common.js","deps":{}},"328":{"file":"workdir/glov/common/friends_data.js","deps":{}},"329":{"file":"workdir/glov/common/md5.js","deps":{}},"330":{"file":"workdir/glov/common/packet.js","deps":{"./util.js":335,"./base64.js":320}},"331":{"file":"workdir/glov/common/perfcounters.js","deps":{}},"332":{"file":"workdir/glov/common/rand_alea.js","deps":{}},"333":{"file":"workdir/glov/common/tiny-events.js","deps":{}},"334":{"file":"workdir/glov/common/types.js","deps":{}},"335":{"file":"workdir/glov/common/util.js","deps":{}},"336":{"file":"workdir/glov/common/verify.js","deps":{}},"337":{"file":"workdir/glov/common/vmath.js","deps":{}},"338":{"file":"workdir/glov/common/words/profanity_common.js","deps":{}},"339":{"file":"workdir/glov/common/wscommon.js","deps":{"./packet.js":330,"./perfcounters.js":331,"./ack.js":319}}};

assert.deepEqual(requireStack(BIG, '255', 'workdir/client/tools/logparser_wrap.js', mapper), 'tools/logparser_wrap.js => tools/logparser.js => crafting_mods.js => ../glov/client/engine.js');

console.log('OK');
