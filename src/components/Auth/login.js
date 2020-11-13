 import React from 'react'
 import './style.css';
 import axios from 'axios';
 class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
        this.handleInput=this.handleInput.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.validateDetails=this.validateDetails.bind(this);
    }

    validateDetails({username,password}){
        
        axios
            .get(`http://localhost:4000/auth/?username=${username}`)
            .then((res)=>{
                console.log(res.data[0])
                if(res.data.length===1
                     && password===res.data[0].password)
                        this.props.handleLogin(username,true,"");
                else
                    this.props.handleLogin('',false,"error")
            })
            
    }
    handleInput(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state)
        
        this.validateDetails(this.state)
        
        
    }


    render(){
        return (
            <div>
                <form className="box" onSubmit={this.handleSubmit}>
                    {this.props.error&&<p>Please enter valid details</p>}
                    <h1>Login</h1>
                    <input type="text" name="username" placeholder="username" onInput={this.handleInput}>
                    </input>
                    <input type="password" name="password" placeholder="password" onInput={this.handleInput}>
                    </input>
                    <input type='submit' value="Login"></input>
                </form>
            </div>
        )
    }


 }






 export default Login;
