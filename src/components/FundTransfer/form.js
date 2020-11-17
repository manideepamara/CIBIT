import React from 'react';
import { BiRupee,BiSend } from "react-icons/bi";

class FtForm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {details,handleInput,handleProceed}=this.props;
        const {debitedFrom,to,amount,desc}=details;
        const check=debitedFrom&&to&&amount&&desc;
        console.log(details);
        return (
            <div className="ft-form">
                        <div className="ft-form-element">
                            <select className="ft-form-input" placeholder="from" value={debitedFrom} name="debitedFrom" onChange={handleInput}>
                                <option value="">debitedFrom</option>
                                <option value="savings">Savings</option>
                                <option value="credit">credit card</option>
                                <option value="current">current</option>
                            </select>
                            <BiSend />
                            <input type="text"  className="ft-form-input" name="to" value={to} onInput={handleInput} placeholder="beneficiary account id"></input>
                            
                        </div>
                        <div className="ft-form-element">
                            <div>                           
                                 <BiRupee className="rupee"/>
                                <input type="text" className="ft-form-input"value={amount} onInput={handleInput} name="amount" placeholder="amount"></input>
                            </div>
                        </div>
                        <div className="ft-form-element">
                            <textarea  name="desc" onInput={handleInput} value={desc} placeholder="Description">
                            </textarea>
                        </div>
                        {check&&
                        <div className="ft-form-element">
                            <button onClick={handleProceed}className="ft-button">proceed</button>
                         </div>}
            </div>
        );
    }
}


export default FtForm;