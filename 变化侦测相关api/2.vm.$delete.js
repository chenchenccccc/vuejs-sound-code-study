/*
 * @Author: your name
 * @Date: 2021-05-17 20:13:02
 * @LastEditTime: 2021-05-17 21:05:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuejs-sound-code-study\变化侦测相关api\2.vm.$delete.js
 */
function del(target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
  }
  //此处和前面的set的逻辑基本一致
  const ob = target.__ob__;
  delete target[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}
// 判断是否为一个有效的数组索引
function isValidArrayIndex(val) {
  let n = parseInt(String(val));
  // isFinite 监测一个数是否为一个游戏中 NAN和无穷大和无穷小都会返回false
  // Math.floor() 向下取整的计算 (0.29) -> 0
  return n >= 0 && Math.floor(n) && isFinite(n);
}
