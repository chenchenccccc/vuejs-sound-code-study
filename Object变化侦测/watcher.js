/*
 * @Author: your name
 * @Date: 2021-05-16 14:46:56
 * @LastEditTime: 2021-05-16 15:47:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuejs-sound-code-study\Object变化侦测\watcher.js
 */
const bailRE = /[^\w.$]/;
export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    //获取数据的方法 parsePath可读取('a.b.c')的数据
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    this.value = this.value;
  }
  get() {
    window.target = this;
    // 获取值 会触发getter 使其添加到添加到dep中去
    let value = this.getter.call(this.vm, this.vm);
    window.target = undefined;
    return value;
  }
  updated() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split('.');
  return function (obj) {
    for (let index = 0; index < segments.length; index++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[index]];
    }
    return obj;
  };
}
