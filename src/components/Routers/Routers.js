import React from 'react'
import Home from '../Home';
import Transfer from '../transfers';
import Fd from '../FixedDeposit/fixedDeposit';
import Navbar from '../Navbar/Navbar';
import Logout from '../Auth/logout'
import {createBrowserHistory} from 'history';
import {BrowserRouter as Router,Route ,Link,Switch, Redirect} from 'react-router-dom';
function AppRouter({username,handleLogout}){
    const history = createBrowserHistory();
    return <Router history={history} >

    <Navbar  uid={username}/>
    <Switch>
    
      <Route exact path = "/"><Redirect to ={"/dashboard/"+username }></Redirect></Route>
      <Route exact path ="/dashboard/:acid" component={Home}></Route>
      <Route exact path = "/transfers/:acid" component={Transfer}></Route>
      <Route exact path = "/fd/:acid" component={(props) => <Fd history={history} {...props}/>}></Route>
      <Route exact path = "/logout/:acid" component = {()=><Logout handleLogout={handleLogout}/>}></Route>
      <Route path = "*" component ={() => {
        return <h1>Page Not Found</h1>
      }
      }></Route>
    </Switch>
  </Router>


}


export default AppRouter;

