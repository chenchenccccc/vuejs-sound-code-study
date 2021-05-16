/*
 * @Author: your name
 * @Date: 2021-05-12 19:17:58
 * @LastEditTime: 2021-05-16 14:34:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \数组监听\1.拦截数组.js
 */
//获取数组本身原型

//改变原数组的7个方法
// push,pop,shift,unshift,splice,sort,reverse
let changArrayMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const arrayProto = Array.prototype;

const arrayMethods = Object.create(arrayProto);

// 使用 Object.defineProperty 进行拦截

changArrayMethods.forEach(method => {
  //缓存数组原有的方法
  const originalMethod = arrayProto[method];
  Object.defineProperty(arrayMethods, method, {
    value: function mutator(...args) {
      return originalMethod.apply(this, args);
    },
    enumerable: false,
    writable: true,
    configurable: true
  });
});

// 递归解析参数
function parsePath(path) {
  const pathReg = /[^\w.$]/;
  if (pathReg.test(path)) {
    return;
  }
  const segments = path.split('.');
  return function (obj) {
    for (let index = 0; index < segments.length; index++) {
      if (!obj) return;
      obj = obj[segments[index]];
    }
    return obj;
  };
}

// 判断是否 __proto__是否可用

const hasProto = '__proto__' in {};

// 直接修改目标的__proto__
function protoAugment(target, src, keys) {
  target.__proto__ = src;
}
// 在目标 上添加方法
function copyAugment(target, src, keys) {
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    def(target, key, src[key]);
  }
}

function def(target, key, value, enumerable) {
  Object.defineProperty(target, key, {
    value,
    enumerable: !!enumerable,
    configurable: true,
    writable: true
  });
}

// 获取已经通过Object.defineProperty拦截的方法
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

// 收集数组的依赖
class Observe {
  constructor(value) {
    this.value = value;
    if (Array.isArray(value)) {
      const augment = hasProto ? protoAugment : copyAugment;
      augment(value, arrayMethods, arrayKeys);
    } else {
      this.walk(value);
    }
  }
  // 常规值的监听 可以理解为vue中data对象
  walk(value) {
    const keys = Object.keys(value);
    for (let index = 0; index < keys.length; index++) {
      this.defineReactive(value, keys[index], value[keys[index]]);
    }
  }
  defineReactive(data, key, value) {
    console.log(data, key, value);
    //建立一个监听对象
    // let dep = new Dep()
    if (typeof value === 'object') {
      new Observe(value);
    }
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        //dep.depend()
        console.log('get', value);
        //收集依赖
        return value;
      },
      set(newValue) {
        console.log('set', newValue);
        if (newValue === value) {
          return;
        }
        value = newValue;
        // dep.notify()
        // 通知所有依赖数据 发生了改变 做出相应的操作
      }
    });
  }
}

let arr = [1];
let a = {
  c: '2'
};

new Observe(arr);
a.c = 1;
//赋值新的
Object.defineProperty(a, 'd', {
  value: 4,
  enumerable: true,
  writable: true,
  configurable: true
});
console.log(a.d);
arr.push(2);
