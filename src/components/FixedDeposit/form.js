
import Button from '../Button'
import React from 'react';
function Form({handleInput}) {
    
    return (
        <div className="form">
            <input className="form-input" type="text" name="principal" placeholder="principal" onInput={(e) => handleInput(e)}></input>
            <input className="form-input" type="text" name="roi" placeholder="rate Of Interest" onInput={(e) => handleInput(e)}></input>
            
            <div className="form-input">
                <input type="text" placeholder="timeperiod" className="form-input__child" name="tp"onInput={(e) => handleInput(e)} ></input>
                <select  className="form-input__child" name="timeperiod" onChange = {(e) => handleInput(e)}>
                    <option  className="form-input__option" value=""></option>

                    <option className="form-input__option"value="Months">Months</option>
                    <option className="form-input__option"value="years">years</option>
                
                </select>
            </div>           
            <select className="form-input"  name="debitedFrom" onChange={e => handleInput(e)}>
               <option value="">Debited from </option >
                <option className="form-input__option"value="savings">Savings</option>
                <option className="form-input__option"value="credit card">Credit card</option>
            </select>
            <input className="button" type="button" value="Deposit" ></input>
        </div>
    )
}


export default Form;



 