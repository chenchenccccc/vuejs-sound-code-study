/*
 * @Author: your name
 * @Date: 2021-05-17 20:13:26
 * @LastEditTime: 2021-05-17 21:25:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuejs-sound-code-study\变化侦测相关api\3.vm.$watch.js
 */
import { Watcher } from '../Object变化侦测/watcher';
function watch(expOrFn, cb, options) {
  const vm = this;
  options = options || {};
  //数据监测
  const watcher = new Watcher(vm, expOrFn, cb, options);
  //判断是否使用immediate参数 如果使用了立即执行一次cb
  if (options.immediate) {
    cb.call(vm, watcher.value);
  }
  //返回一个用于取消监听的函数
  return function unwatchFn() {
    watcher.teardown();
  };
}
