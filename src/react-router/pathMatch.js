/*
 * @Descripttion: 
 * @Author: maple wang
 * @Date: 2023-02-12 13:57:20
 * @LastEditors: maple wang
 * @LastEditTime: 2023-02-12 18:08:55
 */
import { pathToRegexp } from "path-to-regexp"

export default function pathMath(path, options) {
    const pathname = window.location.pathname
    let keys = []
    const regexp = pathToRegexp(path, keys,getOptions(options))
    const result = regexp.exec(pathname)
    console.log('result------',result)
    console.log('result-path', keys)
    if (!result) {
        return
    }
    let groups = result.slice(1)
    console.log("keys",groups)
    const params = dealParams(groups, keys)
    return {
        isExact:pathname === result[0],
        params,
        path,
        url:result[0]
    }
}
function  getOptions(options={}){
    return {
        sensitive:options.sensitive  || false,
        strict:options.strict || false,
        end:options.exact || false
    }
} 
function dealParams(groups, keys) {
    const obj = {}
    for (let i = 0; i < groups.length; i++) {
        const value = groups[i]
        const name = keys[i].name
        obj[name] = value
    }
    return obj

}
let result = pathMath("/news/:id/:page")
console.log('result',result)
