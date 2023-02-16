function identity(a) {
  return a;
}

exports.requireStack = function requireStack(all_deps, target_index, mapper) {
  mapper = mapper || identity;
  // First, find parents
  let parents = {};
  for (let index in all_deps) {
    let { deps } = all_deps[index];
    for (let key in deps) {
      let child_idx = deps[key];
      parents[child_idx] = parents[child_idx] || {};
      parents[child_idx][index] = true;
    }
  }
  // Now, find shortest path to a root, or node whose parents are all already in the path
  let todo = [];
  function push(idx, stack) {
    stack = stack.slice(0);
    stack.push(idx);
    todo.push([idx, stack]);
  }
  push(String(target_index), []);
  let answer;
  let possible_answer;
  function walk() {
    let next = todo.splice(0, 1)[0];
    let [next_idx, next_stack] = next;
    let my_parents = [];
    for (let parent_idx in parents[next_idx]) {
      if (!next_stack.includes(parent_idx)) {
        my_parents.push(parent_idx);
      }
    }
    if (!my_parents.length) {
      // found the root!
      if (!possible_answer) {
        possible_answer = next_stack;
      }
      if (next_idx === '1') { // assume 1 is the root, if we got there
        answer = next_stack;
      }
    } else {
      for (let ii = 0; ii < my_parents.length; ++ii) {
        push(my_parents[ii], next_stack);
      }
    }
  }
  while (!answer && todo.length) {
    walk();
  }
  let ret = (answer || possible_answer).reverse().map((index) => mapper(all_deps[index].file)).join(' => ');
  // console.log(all_deps, target_index, ret);
  return ret;
};
