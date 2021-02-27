学习笔记

## promise

### promise是什么
promise是一个构造函数

promise的构造函数接收一个函数作为参数，并且向这个函数内传入两个参数：resolve和rejected，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。

promise主要是解决回调地狱的问题

promise不能被打断

promise有三种状态：

- pending初始状态，进行中，还没有得到结果
- resolve操作完成，得到了想要的结果，可以继续往下执行
- rejected操作失败，未处理，由于结果并非我们所愿，拒绝执行


```js
    new Promise(
        function (resolve, reject) {
            resolve('success')
            // resolve的作用是，讲promise对象的状态从“未完成”转为“成功”（从pending变为resolve），在异步操作成功时调用，并将异步的操作结果作为参数传递出去
            reject('fail')
            // reject的作用是，讲Promise对象的状态从“未完成”变成“失败”（即从pending变为reject），在异步操作失败时调用，并将异步操作报出的错误作为参数传递出去
        }
    ).then(
        (res) => {console.log('res')},
        (err) => {console.log('err')}
    )

    function fn(num){
        return new Promise(function(resolve, reject) {
            if (typeof num == 'number') {
                resolve('number');
            }else {
                reject('not number');
            }
        }).then(
            (res) => {
                console.log(res)
            },
            (err) => {
                console.log(err)
            }
        )
    }
    
    fn(1234) //number
    fn('haha') //not number
    
    function fn(){
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                let num = Math.ceil(Math.random() * 10)
                if (num <= 5) {
                    resolve(num)
                } else {
                    reject('数字太大')
                }
            }, 6000);
        })
    }
    fn().then(
            (res) => {
                console.log(res)
            },
            (err, data) => {
                console.log(err)
            }
        )
    
    
```
## promise 实现原理
```js
function Promise(executor) {
    var self = this;
    self.status = 'panding';    //promise当前状态
    self.data = null;           //promise的值
    self.onResolveCallback = [];
    //promise状态变为resolve时的回调函数集，可能有多个
    self.onRejectedCallback = [];
    //promise状态变为rejected时的回调函数集，可能有多个
    
    function resolve(value) {
        setTimeout(function () {
            if (self.status == 'panding') {
            self.statue = 'resolved';
            self.data = value;
                for (var i = 0; i < self.onResolveCallback; i++) {
                    self.onResolveCallback[i](value)
                }
            }
        })
    }
    function reject(reason) {
        setTimeout(function () {
            if(self.status === 'pending') {
            self.status = 'rejected';
            self.data = reason;
            for(var i = 0; i < self.onRejectedCallback.length; i++) {
                    self.onRejectedCallback[i](reason);
                }
            }
        }) 
   }
}

Promise.prototype.then = function(onResolved, onRejected) {
    var promise2
    if (self.sttus === 'resolve') {
        return promise2 = new Promise(funciton(resolve, reject) {
            setTimeout(function(){
                try {
                    var x = onResolved(self.data)
                    resolvePromise(promise2, x, resolve, reject)
                } catch(e) {
                    return reject(e)
                }
            })
        })
    }
}
```


### promise.all方法

promise.all方法用于将多个promise实例包装成一个新的promise实例

```js
const p = promise.all([p1, p2, p3])
let wake = (time) => {
    return new Promise((resolve, reject) => {
        setTimeOut(()=>{
            resolve('${time/1000}秒后醒来')
        },time)
    })
}

let p1 = wake(3000)
let p2 = wake(2000)

Promise.all([p1, p2]).then((result)=>{
    console.log(result)   //[3秒后醒来，2秒后醒来]
}).catch((error)=>{
    console.log(error)
})

<!--手写promise.all-->
1. 
function promiseAll (promises) {
    if(!Array.isArray(promises)) {
        console.log(promise must be an array)
    }
    return new Promise(function(resolve, reject) {
        let promiseNum = promises.length;
        let resolveCount = 0;
        let resolveValues = new Array();
        for (let i = 0; i < promiseNum; i++) {
            Promise.resolve(promises[i]).then(function(value){
                resolveValues[i] = value;
                resolveCount++
                if(resolveCount == primiseNum) {
                    return resolve(resolveValues)
                }
            }, function (res) {
                return reject(res)
            }
            )
        }
    })
}

2. 
Promise.prototype.all = function(interators) {
    const promises = Array.from(interators)
    const len = promises.length;
    let count = 0;
    let resultList = [];
    return new Promise((resolve, reject)=>{
        promises.forEach((p,index) => {
            Promise.resolve(p)
            .then((result) => {
                count++
                resultList[index]=result;
                if (count == len) {
                    return resolve(resultList)
                }
            })
            .catch((err)=>{
                reject(err)
            })
        })
    })
}
```

### async await

- async用于声明一个函数是异步的，它声明的函数本质上会返回一个promise，
- await用于等待一个异步方法执行完成