import React from 'react';
import './style.css';
import Form from './form';
import FDchart from './fdchart';

class Fd extends React.Component{

    constructor(props){
        super(props);
        this.state={
            principal:'',
            roi:'',
            tp:'',
            timeperiod:'',
            debitedFrom:'',
            
        }
        this.handleInput=this.handleInput.bind(this);
    }
    handleInput(e){
       this.setState({
           [e.target.name]:e.target.value,  
         
       }) 
    }
    render(){
        return (
            <div className="fd">
                <div className="header">Fixed deposits for {this.props.match.params.acid}</div>
                <div className="component">
                    <div className="component-item">
                        
                        <Form handleInput={this.handleInput}/>
                    </div>
                    {
                        this.state.tp&&this.state.principal!==''&&this.state.roi!==''&&this.state.timeperiod!==""?
                            <div  className="component-item">
                                
                                <FDchart details={this.state} />
                            </div>
                         :
                             ""
                    }
                </div>
            
            </div>
        )
    }
}



export default Fd;