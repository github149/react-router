/*
 * @Descripttion: 
 * @Author: maple wang
 * @Date: 2022-12-26 11:49:18
 * @LastEditors: maple wang
 * @LastEditTime: 2023-02-12 14:16:40
 */

import { BrowserRouter as Router,Link,Switch,Route } from 'react-router-dom';
import Login from './Login'
import Home from './Home'
import Personal from './Personal';
import ProtectRoute from './protectRoute'
import pathMath from "./react-router/pathMatch"
function App() {
  return (
    <Router>
      <ul>
      <li>
            <Link to='/' >
              首页
            </Link>
        </li>
        <li>
            <Link to='/login' >
              登录页
            </Link>
        </li>
        <li>
            <Link to='/personal' >
              个人中心页
            </Link>
        </li>
        
      </ul>
      <Switch>
        
        <Route path='/login' component={Login}></Route>
        <ProtectRoute path='/personal' component={Personal}></ProtectRoute>
        <Route path='/' component={Home}></Route>
      </Switch>
    </Router>
    
    
  );
}

export default App;
