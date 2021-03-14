# 学习笔记

## 字符串处理
### 使用LL算法构建AST
- AST
抽象语法树，或简称语法树，是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。之所以说语法是“抽象”的，是因为这里的语法并不会表示出真实语法中出现的每个细节。
> 构建AST的过程叫做语法分析算法
语法算法：LL（扫描，规约）

- 正则表达式：

```js
var regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g;

var dictionary = ["number", "Whitespace", "LineTerminator", "*", "/", "+", "-"];
```

### yield(设计使用方式)
- `yield` 关键字用来暂停和恢复一个生成器函数（(`function*` 或遗留的生成器函数）。
- `function*` 这种声明方式(function关键字后跟一个星号）会定义一个生成器函数 (generator function)，它返回一个  `Generator`  对象。
- Generator 函数是一个状态机，还是一个Iterator对象生成函数。它返回的遍历器对象可以依次遍历Generator函数内部的每一个状态。Generator函数是生成一个对象，但是调用的时候前面不能加new命令。
- 生成器函数在执行时能暂停，后面又能从暂停处继续执行。
- `yield`关键字使生成器函数执行暂停，`yield`关键字后面的表达式的值返回给生成器的调用者。它可以被认为是一个基于生成器的版本的return关键字。

```js
    // 生成器函数举例
    function* alpha() {
        yield 'a';
        yield 'b';
        yield 'c';
    }

    for (var suffix of alpha()) {
        console.log(suffix);
    }

    /**
     * a
     * b
     * c
     * /
```

