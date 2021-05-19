/*
 * @Author: your name
 * @Date: 2021-05-19 17:39:22
 * @LastEditTime: 2021-05-19 22:16:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuejs-sound-code-study\Object变化侦测\observer\test.js
 */
const { Watcher } = require('./watcher.js');
const { Observer } = require('./index');
const { Dep, popTarget } = require('./dep');

console.log(Watcher);
// let a = function () {
//   return {
//     a: 1
//   }
// }
a = {
  b: 1,
  c: {
    d: 2
  }
};

let watcher = new Watcher(
  a,
  'b',
  function (nV, oV) {
    console.log(nV, oV);
  },
  {}
);
let obDataA = new Observer(a);
let k = {
  g: a.b
};
popTarget();
let c = {
  p: a.b
};
popTarget();
a.b = 4;
// let obDataK = new Observer(k);
// let obDataC = new Observer(c);

// console.log(obDataA);
// console.log(obDataK);
console.log(Dep);
// console.log(watcher);
