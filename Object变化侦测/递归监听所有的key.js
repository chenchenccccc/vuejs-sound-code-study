/*
 * @Author: your name
 * @Date: 2021-05-16 15:39:24
 * @LastEditTime: 2021-05-16 16:19:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuejs-sound-code-study\Object变化侦测\递归监听所有的key.js
 */
/*
  * Observe 类会附加到到没有一个被侦测的object上
  * 一旦被附加上, Observe会将object的所有属性转换为getter/setter的形式
  * 来收集属性的依赖，并且当属性发生变化的时候会通知这些依赖
*/
export class Observe {
  constructor(value) {
    this.value = value;
    if (!Array.isArray(value)) {
      this.walk(value);
    }
  }
  walk(obj) {
    const keys = Object.keys(obj);
    for (let index = 0; index < keys.length; index++) {
      defineReactive(obj, keys[index], obj[keys[index]]);
    }
  }
}
function defineReactive(data, key, value) {
  if (typeof value === 'object') {
    new Observe(value);
  }
  //...
}
