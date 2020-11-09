import React from 'react'
import Home from '../Home';
import Transfer from '../transfers';
import fd from '../FixedDeposit/fixedDeposit';
import Navbar from '../Navbar/Navbar';
import Logout from '../Auth/logout'
import {BrowserRouter as Router,Route, Link,Switch, Redirect} from 'react-router-dom';
function AppRouter({username,handleLogout}){
    
    return <Router>

    <Navbar  uid={username}/>
    <Switch>
    
      <Route exact path = "/"><Redirect to ={"/dashboard/"+username }></Redirect></Route>
      <Route exact path ="/dashboard/:acid" component={Home}></Route>
      <Route exact path = "/transfers/:acid" component={Transfer}></Route>
      <Route exact path = "/fd/:acid" component={fd}></Route>
      <Route exact path = "/logout/:acid" component = {()=><Logout handleLogout={handleLogout}/>}></Route>
      <Route path = "*" component ={() => {
        return <h1>Page Not Found</h1>
      }
      }></Route>
    </Switch>
  </Router>


}


export default AppRouter;

