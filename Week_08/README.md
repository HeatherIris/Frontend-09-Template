# 学习笔记
## 浏览器原理
### 浏览器渲染过程
1. 构建dom树
#### 当网页输入URL时候，浏览器发起http请求
通信过程：
1. 输入网址后，请求由浏览器以一种满足http协议的请求报文的形式发往服务器。请求报文中包含了要请求的页面地址，请求的文件类型等一系列信息
2. 传递的时候，网络设备把请求报文包装在一个满足TCP协议的数据中，通过网线传送给服务器
3. 服务器接受数据后，将数据解译，重新恢复成浏览器满足http协议的请求报文的形式，然后传向服务器软件
4. 服务软件得到请求报文后，根据请求报文的页面地址在服务器数据库中找到相应的页面，生成满足http协议的响应报文发向浏览器。响应报文包括响应报文头和请求页面的代码
5. 响应报文通过服务器的网络设备，包装在满足TCP协议的数据，通过网线传给客户端
6. 客户端网络设备将响应报文解析，传给浏览器软件，浏览器将报文解析，得到网页
#### 构建DOM树
对文本HTML进行parse文本分析，将HTML变为DOM树
#### CSS和DOM树生成Render树
对DOM树上对应的CSS规则进行计算，计算完后就得到了一颗带有CSS属性的DOM（DOM with CSS）
#### 生成布局（Generating the Layout）
通过layout将DOM树上元素的和的位置进行计算
#### 绘制（render）
将DOM画在图片上，通过 操作系统和硬件驱动展现出来
### 有限状态机
- 每一个状态都是一个机器
  - 在每一个机器里，我们可以做计算、存储、输出
  - 所有这些机器接受的输入都是一致的
  - 状态机的每一个机器本身没有状态，如果我们用函数表示的话，应该是纯函数
- 每一个机器知道下一个状态
  - 每个机器都有确定的下一个状态（Moore）
  - 每个机器根据输入决定下一个状态（Mealy）
  #### 不使用状态机处理字符串
  在一个字符串中找ab
  ```js
  function findab (string) {
  let foundA = false;
  for (let c of string) {
    if (c == 'a') {
      foundA = true
    } else if (foundA && c == 'b') {
      return true
    }else {
      foundA = false
    }
  }
  return false
}
  ```
