function forwardSlashes(str) {
  return str.replace(/\\/g, '/');
}
exports.forwardSlashes = forwardSlashes;

function identity(a) {
  return a;
}

exports.requireStack = function requireStack(all_deps, target_index, root_path, mapper) {
  mapper = mapper || identity;
  target_index = String(target_index);
  // First, find root
  let root_idx = null;
  for (let index in all_deps) {
    if (forwardSlashes(all_deps[index].file) === root_path) {
      root_idx = index;
      break;
    }
  }
  if (!root_idx) {
    return 'requireStack error: unable to find root node in dependency tree while' +
      ` looking for ${forwardSlashes(all_deps[target_index].file)} under root ${root_path}`;
  }

  // breadth-first search to find shortest path to target node
  let done = {};
  let todo = [];
  let answer;
  function push(idx, stack) {
    idx = String(idx);
    done[idx] = true;
    stack = stack.slice(0);
    stack.push(idx);
    if (idx === target_index) {
      answer = stack;
    } else {
      todo.push([idx, stack]);
    }
  }
  push(root_idx, []);
  function walk() {
    let [next_idx, next_stack] = todo.splice(0, 1)[0];
    let deps = all_deps[next_idx].deps;
    for (let key in deps) {
      let idx = deps[key];
      if (idx && !done[idx]) {
        push(idx, next_stack);
      }
    }
  }
  // eslint-disable-next-line no-unmodified-loop-condition
  while (!answer && todo.length) {
    walk();
  }
  if (!answer) {
    return 'requireStack error: unable path from root to target while' +
      ` looking for ${mapper(forwardSlashes(all_deps[target_index].file))} under root ${mapper(root_path)}`;
  }

  let ret = answer.map((index) => mapper(forwardSlashes(all_deps[index].file))).join(' => ');
  // console.log(all_deps, target_index, ret);
  return ret;
};
