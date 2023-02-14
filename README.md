<!--
 * @Descripttion: 
 * @Author: maple wang
 * @Date: 2023-02-12 11:27:40
 * @LastEditors: maple wang
 * @LastEditTime: 2023-02-13 22:23:22
-->


## path-to-regexp

## 以下三个函数，虽然函数和参数不同，但是返回的对象结构(history)完全一致


## history对象

- action:当前地址栈，最后一次操作的类型
  - 如果是通过create***History函数创建的history对象，action固定为POP
  - 如果调用了history的push方法,action变为PUSH
  - 如果调用了history的replace方法，action变为REPLACE
- push: 向当前地址栈指针位置，入栈一个地址
- replace: 替换当前指针指向当前地址
- go: 控制当前地址栈指针偏移，如果是0,地址不变，如果是负数，则后退指定的步数；如果是正数，则前进指定的步数
- length:当前栈中的地址数量
- goForward:相当于go(1)
- goBack :相当于go(-1)
- listen:函数，用于监听地址栈中指针的变化
 - 该函数接收一个函数作为参数,该参数表示地址变化后要做的事情
   - 函数参数接收两个参数：
     - location：记录了新的地址
     - action:进入新地址的方式
        - POP:指针移动，调用go,goBack,goForward、用户点击浏览器后退按钮
        - PUSH:调用history.push
        - REPLACE:调用history.replace
     - 该函数有一个返回值，返回的是一个函数，用于取消监听
 - block:是一个函数,用于设置一个阻塞,当页面发生跳转时，会将指定的消息传递给getUserConfirmation,并调用getUserConfirmation函数;该函数返回一个取消函数，调用取消函数可以解除阻塞
 - createHref:basename+url

## createBrowserHistory
 创建一个使用浏览器history Api的history对象
  ## 创建location
    state处理：
    ```js
      var historyState = window.history.state
    ```
    1.如果`historyState`没有值，那么state的状态值为undefined
    2.如果historyState有值
          类型不是object,state = historyState
          

 ## createHashHistory
 创建一个使用浏览器hash的history对象


 ## createMemoryHistory

 创建一个使用内存地址栈中的history对象


