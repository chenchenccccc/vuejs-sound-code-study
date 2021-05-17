/*
 * @Author: your name
 * @Date: 2021-05-18 00:03:38
 * @LastEditTime: 2021-05-18 00:05:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuejs-sound-code-study\Object变化侦测\observer\index.js
 */
const { def, isValidArrayIndex } = require('./util/index.js');
const { arrayMethods } = require('./array.js');
const { Dep } = require('./dep.js');
