/*
 * @Descripttion: 
 * @Author: maple wang
 * @Date: 2023-02-12 18:12:25
 * @LastEditors: maple wang
 * @LastEditTime: 2023-02-12 21:20:42
 */
import { createBrowserHistory  } from 'history';
window.createBrowserHistory = createBrowserHistory
window.h = createBrowserHistory({
    basename:"/news",
    forceRefresh:false,  //设置为true强制刷新页面
    keyLength:4,  
    getUserConfirmation(msg,callback){
        callback && callback(window.confirm(msg))
        console.log("消息发生变化",msg)

    }      
})

window.unblock = window.h.block((location,action)=>{
    //页面设置阻塞
    console.log('location',location)
    console.log('action',action)
    return "是否发生跳转！！！！"
})
window.unlisten = window.h.listen((location,action)=>{
   console.log(action) 
})