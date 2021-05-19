/*
 * @Author: your name
 * @Date: 2021-05-18 00:03:38
 * @LastEditTime: 2021-05-19 17:49:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuejs-sound-code-study\Object变化侦测\observer\index.js
 */
const { def, isValidArrayIndex, isObject, hasOwn, hasProto } = require('./util/index.js')
const { arrayMethods } = require('./array.js')
const { Dep } = require('./dep.js')

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep()
    //每一个侦听的数据添加__ob__属性
    //值是侦测者的实例 方便后面获取订阅者
    def(this.value, '__ob__', this)
    //判断value是否为数组
    if (Array.isArray(value)) {
      // 判断数组是否 有__proto__属性
      if (hasProto) {
        //直接修改有__proto__为被拦截处理的7个修改数组方法
        protoAugment(value, arrayMethods)
      } else {
        //手动添加 被拦截处理的7个修改数组方法
        copyAugment(value, arrayMethods, arrayKeys)
      }
      //侦测数组的每一项
      observeArray(value)
    } else {
      this.walk(value)
    }
  }
  walk(value) {
    const keys = Object.keys(value)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(value, keys[i])
    }
  }
}
//侦测数组每一项的值
function observeArray(array) {
  for (let i = 0, l = array.length; i < l; i++) {
    observe(array[i])
  }
}
//拦截
function defineReactive(obj, key, value) {
  //收集依赖
  const dep = new Dep()
  // Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
  //判断是否指定的属性存在于对象上 是 则返回其属性描述符对象（property descriptor） 否 返回 undefined。

  const property = Object.getOwnPropertyDescriptor(obj, key)
  //判断key是否为自有属性 和能不能修改  不能修改直接返回
  if (property && property.configurable === false) {
    return
  }
  //预先定义getter / setters
  const getter = property && property.get
  const setter = property && property.set
  //如果value没有传 这直接取对象里面的值
  if ((!getter || setter) && arguments.length === 2) {
    value = obj[key]
  }
  let chidOb = observe(value)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      const val = getter ? getter.call(obj) : value
      dep.depend()
      if (chidOb) {
        chidOb.dep.depend()
        if (Array.isArray(value)) {
          dependArray(value)
        }
      }
      return val
    },
    set: function (newValue) {
      const val = getter ? getter.call(obj) : value
      if (getter && !setter) return
      if (newValue === val || (newValue !== newValue && val !== val)) {
        return
      }
      if (setter) {
        setter.call(obj, newValue)
      } else {
        value = newValue
      }
      dep.notify()
    }
  })
}

/*
 * 尝试为value创建一个Observer实例
 * 如果创建成功，则直接返回新创建的Observer实例
 * 如果value已经存在一个Observe实例,则直接返回它
 */
function observe(value, asRootData) {
  if (isObject(value)) {
    return
  }
  let ob
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }
  return ob
}
function copyAugment(target, src, keys) {
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}

function protoAugment(target, src) {
  target.__proto__ = src
}
//当数组被触摸时，收集对数组元素的依赖项
//我们不能像属性获取器那样拦截数组元素访问
function dependArray(value) {
  for (let e, i = 0; i < value.length; i++) {
    e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}

module.exports = {
  Observer
}
