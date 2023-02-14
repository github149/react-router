/*
 * @Descripttion: 
 * @Author: maple wang
 * @Date: 2023-01-06 10:44:06
 * @LastEditors: maple wang
 * @LastEditTime: 2023-01-06 11:45:13
 */
import React from 'react'
import dealLogin from './dealLogin'
export default function Login(props) {
    console.log('props------',props)
  return (
    <div>
        <h1>登录页</h1>
        <button onClick={
            ()=>{
                dealLogin.login();
                if(props.location.state){
                    props.history.push(props.location.state)
                }else{
                    props.history.push('/')
                }
                
            }  
        }>跳转</button>
    </div>

  )
}
