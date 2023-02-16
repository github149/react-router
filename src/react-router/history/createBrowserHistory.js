/*
 * @Descripttion: 
 * @Author: maple wang
 * @Date: 2023-02-13 20:40:33
 * @LastEditors: maple wang
 * @LastEditTime: 2023-02-17 00:29:46
 */

import BlockManager from './blockManager'
import listenerManager from './listenerManager'

//创建一个history对象
export default function createBroserHistory(options = {}) {
    const {
        basename = "",
        forceRefresh = false,
        keyLength = 6,
        getUserConfirmation = (message, callback) => callback(window.confirm(message))
    } = options
    const lisManage = new listenerManager()
    const blockManager = new BlockManager(getUserConfirmation)
    // 向地址栈中添加一个新的地址
    function push(path, state) {
        changePage(path,state,true)
    }
    function replace(path,state){
         changePage(path,state,false)
    }

    /**
     * 可用于抽离的push  replace
     * @param {*} path 
     * @param {*} state 
     * @param {*} isPush 
     */

    function changePage(path,state,isPush){
        
        let action = 'PUSH'
        if(!isPush){
            action = "REPLACE"
        }
        var pathInfo = handlePathAndState(path, state, basename)
       
        /**
         * 创建一个location对象
         * 
         */
        const location = createLocationFromPath(pathInfo,basename)
        //手动触发监听器
        blockManager.triggerBlock(location,action,()=>{
            if(isPush){
                window.history.pushState({
                    key: getRandomKey(keyLength),
                    state: pathInfo.state,
                }, null, pathInfo.path)
                
            }else{
                window.history.replaceState({
                    key: getRandomKey(keyLength),
                    state: pathInfo.state,
                }, null, pathInfo.path)
            }  
            lisManage.triggerListener(location,action)
            history.location = location
            if (forceRefresh) {
                window.location.href = pathInfo.path
            }
        })
           
    }
    function block(prompt){
        return blockManager.block(prompt)  
    }
    function go(step) {
        window.history.go(step)
    }
    function goBack() {
        window.history.back()
    }
    function goForward() {
        window.history.forward()
    }
    let { length } = window.history
    
    function listen(listener){
        return lisManage.addListener(listener) 
    }
    
    /**
     * 添加一个监听器
     */
    function addDomListener(){
        /**
         * popstate事件，仅能监听前进，后退，用户对地址hash的改变
         * 无法监听到pushState,replaceState
         */

        window.addEventListener("popstate",function(){
            blockManager.triggerBlock(location,'POP',()=>{
                lisManage.triggerListener(createLocation(basename,'POP'))
                history.location = location
            })
        })
    }
    function createHref(location){
        return basename + location.pathname + location.search + location.hash

    }
    addDomListener()
    let history = {
        action: "POP",
        push,
        go,
        block,
        goBack,
        goForward,
        replace,
        length,
        listen,
        createHref,
        location: createLocation(basename)
    }
    return history
}
//创建一个location对象
function createLocation(basename = "") {

    let pathname = window.location.pathname
    const reg = new RegExp(`^${basename}`)
    pathname = pathname.replace(reg, "")
    const location = {
        hash: window.location.hash,
        search: window.location.search,
        pathname,
    }
    let state, historyState = window.history.state
    if (historyState === null) {
        state = undefined
    } else if (typeof historyState !== "object") {
        state = historyState
    } else {
        if ("key" in historyState) {
            location.key = historyState.key
            state = historyState.state

        } else {
            state = historyState
        }
    }
    location.state = state
    return location

}
/**
 * 根据pathInfo 得到一个location对象
 * @param {*} pathInfo 
 * @param {*} basename 
 */
window.createLocationFromPath = createLocationFromPath
function createLocationFromPath(pathInfo,basename){
    //处理pathname
    let pathname = pathInfo.path.replace(/[#?].*$/,"")
    console.log("pathname",pathname)
    const reg = new RegExp(`^${basename}`)
    pathname = pathname.replace(reg, "")
    let questIndex = pathInfo.path.indexOf("?")
    let sharpIndex = pathInfo.path.indexOf("#")
    let search
    if(questIndex === -1 || questIndex>sharpIndex){
        search = ""
    }else {
        search = pathInfo.path.substring(questIndex,sharpIndex)
    }
    let hash
    if(sharpIndex === -1){
        hash = ""
    }else{
        hash = pathInfo.path.substr(sharpIndex)
    }

    return {
        pathname,
        hash,
        search
    }



}
function handlePathAndState(path, state, basename) {
    //
    if (typeof path === 'string') {
        
        return {
            path,
            state
        }
    } else if (typeof path == "object") {
        let pathResult = basename + path.pathname
        let { search = "", hash = "" } = path
        if (search.chartAt(0) !== "?") {
            search = "?" + search
        }
        if (hash.chartAt(0) !== "#") {
            hash = "#" + hash
        } else {
            throw new Error('类型必须是字符串或者对象')
        }
        pathResult += search
        pathResult += hash
        return {
            path: pathResult,
            state: path.state
        }
    }
}

function getRandomKey(length){
    return Math.random().toString(36).substr(2,length)

}

const location = createLocation("/news")
window.his = createBroserHistory({
    basename:"/uiui",
    forceRefresh:false
})
console.log('location', location)