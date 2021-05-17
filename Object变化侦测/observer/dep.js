/*
 * @Author: your name
 * @Date: 2021-05-17 21:29:04
 * @LastEditTime: 2021-05-17 22:52:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuejs-sound-code-study\Object变化侦测\发布订阅\dep.js
 */
// 依赖存储 - 存储订阅者

// require { remove } from './util/index';
const { remove } = require('./util/index.js');
let uid = 0;

class Dep {
  constructor() {
    this.id = uid++;
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
  //处理依赖 ？
  depend() {
    if (Dep.target) {
      Dep.target.addSub(this);
    }
  }
  notify() {
    //拿一个新的数组
    const subs = this.subs.slice();
    //循环dep触发收集的依赖
    for (let index = 0; index < subs.length; index++) {
      subs[index].updated();
    }
  }
}

//正在计算的当前目标监视程序。
//这是全局唯一的，因为只有一个观察者
//可以一次计算。
// ??
Dep.target = null;
const targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

module.exports.popTarget = popTarget;
module.exports.pushTarget = pushTarget;
module.exports.Dep = Dep;
