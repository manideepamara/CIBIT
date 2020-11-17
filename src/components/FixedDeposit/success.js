import React from 'react';
class Success extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div>
            <button className="ft-button" onClick={this.props.handleClear}>Okay</button>
        </div>
    }
}

export default Success;