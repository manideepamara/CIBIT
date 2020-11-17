import React from 'react';
import './style.css';
import Form from './form';
import FDchart from './fdchart';
import MyModal from './modal';
import Axios from 'axios';
import Success from './success';
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
            condition:0,
            stage:1
            
        }
        
        this.handleDeposit=this.handleDeposit.bind(this);
        this.handleModal=this.handleModal.bind(this);
        this.handleInput=this.handleInput.bind(this);
        this.handleSuccess=this.handleSuccess.bind(this);
        this.handleClear=this.handleClear.bind(this);
    }

    handleClear(){
        this.setState({
            principal:'',
            roi:'',
            tp:'',
            timeperiod:'',
            debitedFrom:'',
            isOpen:false,
            condition:0,
            stage:1
        })
    }
    handleSuccess(){
        //update balance and add transaction
        this.setState(
            {
                stage:2,
                isOpen:false
            }
        )
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
                    const thresold = 5;
                    let spentPercentage = (spent+principal)/(spent+left)
                    spentPercentage*=100;
                    if(spentPercentage<=thresold){
                       
                       //update balance and add tarnsaction
                        this.setState({
                            stage:2
                        })
                    }else{
                        this.setState({
                            isOpen:true,
                            condition:3
                        })
                    }
                    
                   
                }
                else{
                    this.setState({
                        condition:2,
                        isOpen:true
                    })
                    
                }
        
        }
        else{
            this.setState({
                isOpen:true,
                condition:1
            })
             
        } 
        
        console.log("after in depo");
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
                
                    <div className="header">
                       {this.state.stage===1?<div className="header-active">Deposit</div>: <div>Deposit</div>}
                       {this.state.stage===2?<div className="header-active">Success</div>:<div>Success</div>}
                    </div>
                    <div className="component">
                       
                            
                            {this.state.stage===1 && 
                               
                               <>
                                <div className="component-item">
                                    <Form details={this.state} handleInput={this.handleInput} handleDeposit={this.handleDeposit}/>
                                </div>
                                    {
                                        this.state.tp!==''&&this.state.principal!==''&&this.state.roi!==''&&this.state.timeperiod!==""?
                                            <div  className="component-item">
                                        
                                                <FDchart details={this.state} />
                                            </div>
                                        :
                                        ""
                                    } 
                               </>
                             }{
                                 this.state.stage===2 && <Success handleClear={this.handleClear} />
                             }
                       
                        
                </div>
                </div>
                <MyModal handleModal={this.handleModal} handleSuccess={this.handleSuccess} details={this.state}/>  
            </>
        )
    }
}



export default Fd;