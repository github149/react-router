/*
 * @Descripttion: 
 * @Author: maple wang
 * @Date: 2023-02-13 20:40:33
 * @LastEditors: maple wang
 * @LastEditTime: 2023-02-15 00:18:55
 */
//创建一个history对象
export default function createBroserHistory(options = {}) {
    const {
        basename = "",
        forceRefresh = false,
        keyLength = 6,
        getUserConfirmation = (message, callback) => callback(window.confirm(message))
    } = options

    // 向地址栈中添加一个新的地址
    function push(path, state) {
        history.action = "PUSH"
        var pathInfo = handlePathAndState(path, state, basename)
        console.log(pathInfo)
        window.history.pushState({
            key: getRandomKey(keyLength),
            state: pathInfo.state,
        }, null, pathInfo.path)
        if (forceRefresh) {
            window.location.href = pathInfo.path
        }
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
    let history = {
        action: "POP",
        push,
        go,
        goBack,
        goForward,
        length,
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
    forceRefresh:true
})
console.log('location', location)