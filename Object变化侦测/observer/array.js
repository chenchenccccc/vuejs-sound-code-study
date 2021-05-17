/*
 * @Author: your name
 * @Date: 2021-05-17 21:29:19
 * @LastEditTime: 2021-05-17 22:31:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuejs-sound-code-study\Object变化侦测\发布订阅\array.js
 */

import { def } from './util';
// 改变数组的7个方法
let methodsToPatch = ['splice', 'sort', 'unshift', 'shift', 'push', 'pop', 'reverse'];

// 获取数组的原型
const arrayPorto = Array.prototype;
const arrayMethods = Object.create(arrayPorto);

methodsToPatch.forEach(function (method) {
  // 缓存数组原有的方法
  const original = arrayPorto[method];
  def(arguments, method, function mutator(...args) {
    const result = original.apply(this, args);
    const ob = this.__ob__;
    //对数组的method方法进行判断 如果时添加元素的方法 则用 inserted缓存住添加的元素
    let inserted;
    switch (method) {
      case 'unshift':
      case 'push':
        inserted = args;
        break;
      case 'splice':
        inserted = args.splice(2);
        break;
    }
    //如果时是数组添加元素 使用observeArray来侦测新元素
    if (inserted) ob.observeArray(inserted);
    //通知订阅者做出相应的处理
    ob.dep.notify();
    return result;
  });
});

module.exports.arrayMethods = arrayMethods;
