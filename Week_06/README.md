# 学习笔记--重学JavaScript
## 现代语言通识
### 泛用语言分类方法：语言按语法分类
- 非形式语言：中文、英文
- 形式语言：乔姆斯基谱系（0，1，2，3是包含关系）
  - 0型：无限制文法
  - 1型：上下文相关文法
  - 2型：上下文吴无关文法
  - 3型：正则文法
### 产生式（BNF）
- 用尖括号括起来的名称来表示语法结构名
- 语法结构分成基础结构和需要用其他语法结构定义的复合结构
  - 基础结构成为终结符
  - 复合结构成为非终结符
- 引号和中间的字符标识终结符
- 可以有括号
- *表示重复多次
- |表示或
- +表示至少一次
#### 用BNF来描述四则运算
四则运算：1 + 2 * 3
```html
<MultiplicativeExpression>::=<Number>|
    <MultiplicativeExpression>"*"<Number>|
    <MultiplicativeExpression>"/"<Number>|
<AdditiveExpression>::=<MultiplicativeExpression>|
    <AdditiveExpression>"+"<MultiplicativeExpression>|
    <AdditiveExpression>"-"<MultiplicativeExpression>|
```
### 现代语言分类
- 形式语言--用途
  - 数据描述语言（css,json,html,sql）
  - 编程语言(c,c++,js,java,ruby,python)
- 形式语言--表达方式
  - 声明式语言（css,json,html,sql）
  - 命令型语言(c,c++,js,java,ruby,python)
### 编程语言性质
#### 图灵完备性
- 图灵完备性
  - 命令式--图灵机
    - goto
    - if和while
  - 声明式--lambda
    - 递归
#### 动态与静态
- 动态
  - 在用户的设备/在线服务器上
  - 产品实际运行时
  - runtime
- 静态
  - 在程序员设备上
  - 产品开发时
  - compiletime
#### 类型系统
- 动态类型系统与静态类型系统
- 强类型与弱类型（类型转换的形式，js是典型的弱类型语言）
- 复合类型
  - 结构体
  - 函数签名
- 子类型
- 泛型
  - 逆变/协变
### 一般命令式编程语言
- atom
  - identitier
  - literal
- expression
  - atom
  - operator
  - punctuator
- statement
  - expression
  - keyword
  - punctuator 
- structure
  - function
  - class
  - process
  - namespace
  - ...
- program
  - program
  - module
  - package
  - library
