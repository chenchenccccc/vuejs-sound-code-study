/*
 * @Author: your name
 * @Date: 2021-05-17 20:12:35
 * @LastEditTime: 2021-05-17 20:59:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuejs-sound-code-study\变化侦测相关api\vm.$set.js
 */
//set 是为了解决新加属性无法被侦测的问题 和 通过索引改变数组的值的时
function set(target, key, value) {
  // 如果设置时数组的值
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    //取最大的长度
    target.length = Math.max(target.length, key);
    //调用数组的splice函数 会触发侦测
    target.splice(key, 1, value);
    return value;
  }
  //key 已经存在于target中  说明key已经被侦测了
  if (key in target && !(key in Object.prototype)) {
    target[key] = value;
    return value;
  }
  let ob = target.__ob__;
  //不存在ob 说明这个数据并不需要响应式 直接赋值就行
  // 这里 let target ={a:0} 然而这个target斌没有设置侦听 说明并没有用到这个数据的地方所以就直接赋值
  if (!ob) {
    target[key] = value;
    return value;
  }
  // 对对象新属性的值设置侦听
  defineReactive(ob.value, key, value);
  //立即通知订阅者进行相应的处理
  ob.dep.notify();
  return value;
}
// 判断是否为一个有效的数组索引
function isValidArrayIndex(val) {
  let n = parseInt(String(val));
  // isFinite 监测一个数是否为一个游戏中 NAN和无穷大和无穷小都会返回false
  // Math.floor() 向下取整的计算 (0.29) -> 0
  return n >= 0 && Math.floor(n) && isFinite(n);
}

let arr = [1, 2, 4];
console.log(set(arr, 6, 5));
console.log(arr);
