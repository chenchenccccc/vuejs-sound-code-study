/*
 * @Author: your name
 * @Date: 2021-05-17 21:30:31
 * @LastEditTime: 2021-05-17 23:30:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuejs-sound-code-study\Object变化侦测\发布订阅\util\traverse.js
 */
// 递归value的所有子值来触发他们的get从而收集依赖
const { isObject } = require('./util/index.js');
const { _Set } = require('./util/index.js');
const seenObjects = new _Set();

function traverse(val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}
function _traverse(val, seen) {
  const isA = Array.isArray(val);
  //如果值不是对象和数组 获知是被冻结的对象则直接返回
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
    return;
  }
  let i, keys;
  //如果存在观察者 则只需要添加新的
  if (val.__ob__) {
    const depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.has(depId);
  }
  //递归处理数组和对象不同的方式添加依赖
  if (isA(val)) {
    i = val.length;
    while (i--) _traverse(val[i], seen);
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) _traverse(val[keys[i]], seen);
  }
}
module.exports.traverse = traverse;
