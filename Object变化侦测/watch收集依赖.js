/*
 * @Author: your name
 * @Date: 2021-05-05 21:54:21
 * @LastEditTime: 2021-05-05 22:41:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue源码研究\Object变化侦测\watch收集依赖.js
 */
let data = {
  a: 1,
  b: 2
};
function defineReactive(data, key, value) {
  let dep = new Dep()
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
        dep.notify()//通知依赖发生改变
        return value
      } else {
        return;
      }
    }
  });
}
//1,data 中的数据都用defineReactive进行侦听
//2,defineReactive get函数中收集依赖
//3,在defineReactive set函数中 通知依赖

class Dep {
  constructor() {
    this.subs = [];
  }
  //添加依赖
  addSub(sub) {
    this.subs.push(sub);
  }
  //删除依赖
  removeSub(sub) {
    remove(this.subs, sub);
  }
  //通知依赖
  notify() {
    const subs = this.subs.slice();
    for (let index = 0; index < subs.length; index++) {
      subs[index].update();
    }
  }
}
function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index !== -1) {
      return arr.splice(index, 1);
    }
  }
}
// 解析watch 中的属性 把里面的属性收集到依赖中去 然后 在set 通知依赖发生改变的时候 触发watch中的函数
