import React from 'react';
import './style.css';
import Form from './form';
import FDchart from './fdchart';
import MyModal from './modal';
import Axios from 'axios';
class Fd extends React.Component{

    constructor(props){
        super(props);
        this.state={
            principal:'',
            roi:'',
            tp:'',
            timeperiod:'',
            debitedFrom:'',
            isOpen:false,
            condition:0
            
        }
        this.handleBeforeDeposit=this.handleBeforeDeposit.bind(this);
        this.handleDeposit=this.handleDeposit.bind(this);
        this.handleModal=this.handleModal.bind(this);
        this.handleInput=this.handleInput.bind(this);
    }
    handleModal(){
        
        this.setState({
            isOpen:!this.state.isOpen
        })
    }
    async handleDeposit(){

        const uid=this.props.match.params.acid;
        const {principal,debitedFrom}=this.state;
        let melResponse = await Axios.get(`http://localhost:4000/monthlyExpenselimit/?accid=${uid}`)
        const {left,spent}=melResponse.data[0]
        if(left>=principal){
                let savResponse = await Axios.get(`http://localhost:4000/${debitedFrom}/?accid=${uid}`)
                         
                const {balance}=savResponse.data[0]
                console.log(balance,"bal")
                if(balance>=principal){
                    console.log(this.state,"bal")
                
                    this.setState({
                        condition:3
                    })

                    
                }
                else{
                    this.setState({
                        condition:2
                    })
                    
                }
        
        }
        else{
            this.setState({
                condition:1
            })
             
        } 
        
        console.log("after in depo");
    }



    async handleBeforeDeposit(){
        console.log("before",this.state.condition)
        
        await this.handleDeposit()
        console.log("after",this.state.condition)
        this.handleModal()
    }
    handleInput(e){
       if(!isNaN(e.target.value)||e.target.name==='timeperiod'||e.target.name==='debitedFrom'){
            this.setState({
                [e.target.name]:e.target.value,  
                
            }) 
        }
    }
    render(){
        return (
            <>
                <div className="fd">
                
                    <div className="header">Fixed deposits for {this.props.match.params.acid}</div>
                    <div className="component">
                        <div className="component-item">
                            
                            <Form details={this.state} handleInput={this.handleInput} handleDeposit={this.handleBeforeDeposit}/>
                        </div>
                        {
                            this.state.tp!==''&&this.state.principal!==''&&this.state.roi!==''&&this.state.timeperiod!==""?
                                <div  className="component-item">
                                    
                                    <FDchart details={this.state} />
                                </div>
                            :
                                ""
                        }
                    </div>      
                </div>
                <MyModal handleModal={this.handleModal}  details={this.state}/>  
            </>
        )
    }
}



export default Fd;