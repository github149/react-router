/*
 * @Descripttion: 
 * @Author: maple wang
 * @Date: 2023-01-06 11:16:03
 * @LastEditors: maple wang
 * @LastEditTime: 2023-01-06 11:16:33
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    isLogin:false,
    login(){
        this.isLogin = true
    },
    loginOut(){
        this.isLogin = false

    }
}