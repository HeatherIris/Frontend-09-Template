# 学习笔记

## es6中的proxy

### 什么是proxy
> Proxy 对象一般用于给基本操作定义自定义行为（例如：属性查询，赋值，枚举，函数调用等）

#### 代理和反射
代理：代理可以拦截JavaScript引擎内部目标的底层对象操作，这些底层操作被拦截后会触发响应特定操作的陷阱函数。

反射：反射API以Reflect对象的形式出现，对象中方法的默认特性与相同的底层操作一致，而代理可以覆写这些操作，每个代理陷阱对应一个命名和参数都相同的Reflect方法。

#### 创建一个简单的代理
用proxy构造函数创建代理需要传入两个参数：目标对象target和用户自定义行为对象handler。

处理程序handler是定义了一个或者多个陷阱的对象，在代理中，除了专门为操作定义的陷阱外，其余操作均使用默认特性，即意味着：不使用任何陷阱的处理程序等价于简单的转发代理。


```js
let target = {}
let proxy = new Proxy(target, handler)
proxy.name = 'AAA'
console.log(proxy.name)   // AAA
console.log(target.name)  // AAA
target.name = 'BBB'
console.log(proxy.name)   // BBB
console.log(target.name)  // BBB

```
handler中的的对象属性有13个。

#### proxy中的get和set方法
##### 使用set
set陷阱接受四个参数
- trapTarget： 用于接收属性（代理目标）的对象
- key：要写入的属性键
- value：被写入属性的值
- receiver：操作发生的对象。


```js
/**
 * 创建一个属性值是数字的对象
 * 对象中增加一个数字加以验证，不是数字抛出错误。
 */
let target = {
  name: 'target'
}
let proxy = new Proxy(target, {
  // 已有属性不检测
  set (trapTarget, key, value, receiver) {
    if (!trapTarget.hasOwnProperty(key)) {
      if (isNaN(value)) {
        throw new TypeError('属性值必须为数字')
      }
    }
    return Reflect.set(trapTarget, key, value, receiver)
  }
})
proxy.count = 1
console.log(proxy.count)  // 1
console.log(target.count) // 1
proxy.name = 'AAA'
console.log(proxy.name)   // AAA
console.log(target.name)  // AAA
proxy.anotherName = 'BBB' // 属性值非数字，抛出错误


```
##### 使用get
get陷阱接受三个参数
- trapTarget： 被读取属性的目标对象
- key：要读取的属性值
- receiver：操作发生的对象。


```js
// 可以通过get陷阱来验证对象结构。
let proxy = new Proxy({}, {
  get (trapTarget, key, receiver) {
    if (!(key in trapTarget)) {
      throw new Error(`属性${key}不存在`)
    }
    return Reflect.get(trapTarget, key, receiver)
  }
})
proxy.name = 'proxy'
console.log(proxy.name)  // proxy
console.log(proxy.nme)   // 属性值不存在，抛出错误

```

