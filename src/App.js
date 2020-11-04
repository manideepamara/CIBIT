import './App.css';
import React, { Component } from 'react';
import AppRouter from './components/Routers/Routers';

import Login from './components/Auth/login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isAuthenticated:false,
      username:'',
      error:''
    }
    this.handleLogin=this.handleLogin.bind(this);
    this.handleLogout=this.handleLogout.bind(this);
  }
  handleLogout(){
    console.log("log out");
    this.setState({
      username:"",
      isAuthenticated:false,
      error:"",
      
    })
  }

  handleLogin(username,isAuthenticated,error){
    console.log(username,isAuthenticated,error)
    this.setState({
      isAuthenticated,
      username,
      error
    })
  }
  componentDidMount(){
    console.log(this.state);
  }
  render(){
    const {isAuthenticated,username,error}=this.state
  
    return (
      <Router>
        <Switch>
          {!isAuthenticated ?
              <Route exact path="/" render ={ () => <Login error={error} handleLogin = {this.handleLogin}/>}></Route> 
                :
              <Route path="/" render = {() => <AppRouter username={username} handleLogout={this.handleLogout}/>}></Route>
        
          }
          <Route path="*" render={()=> <h1>404 page not found</h1>}></Route>
        </Switch>
    </Router>
    )
  }
  
}





export default App;
