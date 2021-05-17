/*
 * @Author: your name
 * @Date: 2021-05-17 21:29:27
 * @LastEditTime: 2021-05-18 00:01:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuejs-sound-code-study\Object变化侦测\发布订阅\watcher.js
 */

const { traverse } = require('./traverse');
const { _Set } = require('./util/index.js');
const { parsePath } = require('./util/index.js');
const { Dep, popTarget, pushTarget } = require('./dep.js');

let uid = 0;

class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new _Set();
    this.cb = cb;
    this.id = ++uid;
    this.deep = !!options.deep;
    this.newDepIds = new _Set();
    this.active = true;
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
    }
    this.value = this.get();
  }
  get() {
    pushTarget(this);
    let value;
    const vm = this.vm;
    try {
      value = this.getter.call(vm, vm);
    } catch {
      console.log(e, vm, 'getter for watcher');
    } finally {
      //如果deep为true则是深度监听 就把所有的子值全部侦测起来
      if (this.deep) {
        traverse(value);
      }
      // ???
      popTarget();
      this.cleanupDeps();
    }
    return value;
  }
  addDep(dep) {
    const id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(id);
      if (!this.depIds.has(id)) {
        dep.addDep(this);
      }
    }
  }
  update() {
    console.log('updated');
  }
  depend() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  }
  //清除依赖
  cleanupDeps() {
    let i = this.deps.length;
    while (i--) {
      const dep = this.deps[i];
      if (!this.newDepIds.has(id)) {
        dep.removeSub(this);
      }
    }
    let temp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = temp;
    this.newDepIds.clear();
    temp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = temp;
    this.newDeps.length = 0;
  }
  //取消侦听
  teardown() {
    console.log(false);
    //判断当前侦测是否为激活状态
    if (this.active) {
      let i = this.deep.length;
      while (i--) this.deps[i].remove(this);
      this.active = false;
    }
  }
}
module.exports.Watcher = Watcher;
