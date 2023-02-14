/*
 * @Descripttion: 
 * @Author: maple wang
 * @Date: 2023-01-06 11:34:55
 * @LastEditors: maple wang
 * @LastEditTime: 2023-01-06 15:10:10
 */
import React from 'react'
import { Route,Redirect } from 'react-router-dom'
import dealLogin from './dealLogin'
export default function protectRoute({component:Component,render,...rest}) {
    
  return (
    <Route {...rest} render={
        values=>{
            if(dealLogin.isLogin){
                return <Component/>
            }else {
                return <Redirect to={{pathname:'/login',state:values.location.pathname}}/>
            }
        }
    }>

    </Route>
  )
}
