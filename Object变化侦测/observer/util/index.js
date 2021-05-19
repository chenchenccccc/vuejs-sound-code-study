/*
 * @Author: your name
 * @Date: 2021-05-17 21:32:23
 * @LastEditTime: 2021-05-19 20:24:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuejs-sound-code-study\Object变化侦测\发布订阅\util\index.js
 */
function isValidArrayIndex(val) {
  let n = parseInt(String(val))
  // isFinite 监测一个数是否为一个游戏中 NAN和无穷大和无穷小都会返回false
  // Math.floor() 向下取整的计算 (0.29) -> 0
  return n >= 0 && Math.floor(n) && isFinite(n)
}

function def(target, key, value, enumerable) {
  Object.defineProperty(target, key, {
    value,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

function remove(arr, item) {
  if (arr.length) {
    let index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]'
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * 检查对象是否具有该属性。
 */
var hasOwnProperty = Object.prototype.hasOwnProperty
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

_Set = (function () {
  function Set() {
    this.set = Object.create(null)
  }
  Set.prototype.has = function has(key) {
    return this.set[key] === true
  }
  Set.prototype.add = function add(key) {
    this.set[key] = true
  }
  Set.prototype.clear = function clear() {
    this.set = Object.create(null)
  }

  return Set
})()

const bailRE = /[^\w.$]/

function parsePath(path) {
  if (bailRE.test(path)) {
    return
  }
  let segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) {
        return
      }
      obj = obj[segments[i]]
    }
    return obj
  }
}

const hasProto = '__proto__' in {}

const exportsData = {
  def,
  isValidArrayIndex,
  remove,
  isObject,
  parsePath,
  isPlainObject,
  hasOwn,
  hasProto,
  _Set
}
module.exports = exportsData
