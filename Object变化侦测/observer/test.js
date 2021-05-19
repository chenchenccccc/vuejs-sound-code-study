/*
 * @Author: your name
 * @Date: 2021-05-19 17:39:22
 * @LastEditTime: 2021-05-19 17:48:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuejs-sound-code-study\Object变化侦测\observer\test.js
 */
const { Observer } = require('./index')
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
}

let obData = new Observer(a)
console.log(obData)
