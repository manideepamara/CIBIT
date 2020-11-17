import {Component} from 'react';
import Confirm from './confirm';
import Axios from 'axios';
import FtForm from './form';
import MyModal from './modal';
import './ftstyle.css';
import Success from './success';
class Transfer extends Component{
    constructor(props){
        super(props);
        this.state={
            debitedFrom:"",
            to:"",
            amount:"",
            desc:"",
            stage:1,
            condition:0,
            isOpen:false
        }
        this.handleInput=this.handleInput.bind(this);
        this.handleProceed=this.handleProceed.bind(this);
        this.handleConfirm=this.handleConfirm.bind(this);
        this.handleBack=this.handleBack.bind(this);;
        this.handleClearModal=this.handleClearModal.bind(this);
        this.handleSetModal=this.handleSetModal.bind(this);
        this.handleSuccess=this.handleSuccess.bind(this);
        this.handleClear=this.handleClear.bind(this);
    }
    handleClear(){
        this.setState({
            debitedFrom:"",
            to:"",
            amount:"",
            desc:"",
            stage:1,
            condition:0,
            isOpen:false
        })
    }
    handleSuccess(){
        //update balance in both from and to
        //add transaction s credit and debit
        this.setState({
            isOpen:false,
            stage:3
        })
    }
    handleInput(e){
        if(e.target.name==="amount"&&!isNaN(e.target.value)||e.target.name!=="amount")
            this.setState({
                [e.target.name]:e.target.value
            })
    }
    handleProceed(){
        this.setState({
            stage:2
        })
    }
    handleBack(){
        this.setState({
            stage:1
        })
    }
   async handleConfirm(){
        //set the conditions 
        const uid=this.props.match.params.acid
        const {debitedFrom,to,amount,desc}=this.state;
        const balr = await Axios.get(`http://localhost:4000/${debitedFrom}/?accid=${uid}`);
       
        const {balance} = balr.data[0];
        if(balance>=amount){
            const melr = await Axios.get(`http://localhost:4000/monthlyExpenseLimit/?accid=${uid}`);
           
            const {spent,left}=melr.data[0];
            if(left>=amount){
                const thresold = 5;
                let spentPercentage  =(spent+amount)/(spent+left);
                spentPercentage*=100;
                console.log(spentPercentage);
                if(spentPercentage<=thresold){
                    //update balance in both dfrom and to
                    //add debit and credit transaction
                    this.setState({
                        stage:3,
                        
                    })
                }else{
                    //crossong the thresold
                    this.setState({
                        condition:3,
                        isOpen:true
                    })
                    
                }

            }else{
                //monthly limit crossed
                this.setState({
                    condition:2,
                    isOpen:true
                })
            }
        }else{
            //balance not sufficient
            this.setState({
                condition:1,
                isOpen:true
            })
        }
       
    }

    handleClearModal(){
        this.setState({
            isOpen:false
        })
    }
    handleSetModal(){
        this.setState({
            isOpen:true
        })
    }
    render(){
        return (
            <div className="transfer">
                <div className="transfer-header">
                    {this.state.stage===1?<h2 className="transfer-header-active">details</h2>:<h2>details</h2>}
                    {this.state.stage===2?<h2 className="transfer-header-active">confirm</h2>: <h2>confirm</h2>}
                    {this.state.stage===3?<h2 className="transfer-header-active">success</h2>:<h2>success</h2>}
                </div>
                <div className="transfer-content">
                   {this.state.stage===1&& <FtForm details={this.state} handleInput={this.handleInput} handleProceed={this.handleProceed}/>}
                   {this.state.stage===2&& <Confirm handleBack={this.handleBack} handleConfirm={this.handleConfirm}  details={this.state} />}
                   {this.state.stage===3&&<Success handleClear={this.handleClear}/>}
                </div>
                <MyModal details={this.state} handleSuccess={this.handleSuccess} handleClearModal={this.handleClearModal}/>
            </div>
        );
    }
}   

export default Transfer;