/*
 * @Author: your name
 * @Date: 2021-05-05 21:23:19
 * @LastEditTime: 2021-05-05 22:14:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editb
 * @FilePath: \vue源码研究\Object变化侦 测\Object.defineProperty.js
 */
let obj = {
  a: 1,
  c: 2
};

// Object.defineProperty(obj,prop,describe)
// obj 必修 目标对象
// prop 必需 对象属性
// describe 必须 目标属性的特性
let describe = {
  value: undefined, //任意值
  writable: false, //是否可以被重写
  enumerable: false, // 是否可以被枚举 （for in 或 Object.keys())
  configurable: false // 是否可以删除目标属性或是否可以再次修改属性的特性(writable，enumerable，configurable)
};

function defineReactive(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      //获取值时触发函数
      console.log('get', value);
      return value;
    },
    //单设置值的时候触发函数 ,设置的新值通过参数value拿到
    set(newValue) {
      console.log('set', newValue);
      if (value !== newValue) {
        value = newValue;
        return value
      } else {
        return;
      }
    }
  });
}
defineReactive(obj, 'a', obj.a);
console.log(obj.a);
obj.a = 4;
console.log(obj.a);
