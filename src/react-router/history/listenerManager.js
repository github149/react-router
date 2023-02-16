/*
 * @Descripttion: 
 * @Author: maple wang
 * @Date: 2023-02-16 21:42:45
 * @LastEditors: maple wang
 * @LastEditTime: 2023-02-16 21:51:39
 */
export default class listenerManager{
    //存放监听的数组
    listeners = [];
    /**
     * 添加一个监听器，用于取消监听的函数
     */
    addListener(listener){
        this.listeners.push(listener)
        const unListen = ()=>{
            const index = this.listeners.indexOf(listener)
            this.listeners.splice(index,1)
        }
        return unListen
    }
    triggerListener(location,action){
        for(const listener of this.listeners){
            listener(location,action)
        }  
    }  
}