export default class BlockManager{
    /**
     * 设置一个阻塞，传递一个提示消息
     * 可以是字符串，也可以是一个函数，函数返回一个消息字符串
     */
    prompt= null
    constructor(getUserConfimation){
        this.getUserConfimation = getUserConfimation
    }
    block(prompt){
        if(typeof prompt != "string" && typeof prompt != "function"){
            throw new TypeError('type must be string or function')
        }
        this.prompt = prompt
        return ()=>{
            this.prompt = null
        }
    }
    /***
     * callback:当阻塞完成之后要做的事情
     */
    triggerBlock(location,action,callback){
        //触发阻塞
        if(!this.prompt){
            callback()
            return
        }
        let message
        if(typeof this.prompt == "string"){
            message = this.prompt
        }else if(typeof this.prompt === "function"){
            message = this.prompt(location,action)
        }
        this.getUserConfimation(message,result=>{
            if(result === true){
                callback()
            }
        })

    }
}