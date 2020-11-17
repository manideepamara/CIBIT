
import React ,{createRef} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import Axios from 'axios';
class Home extends React.Component{

    constructor(props){
        super(props);
        this.alanCont=createRef();
    }

    componentDidMount(){
        const uid = this.props.match.params.acid;
        this.alanBtnInstance = alanBtn({ 
            key: 'b1460b1760481aff85ece0b9df063d582e956eca572e1d8b807a3e2338fdd0dc/stage',
            rootEl:this.alanCont.current,
            onCommand:({command})=>{
              if(command==='test'){
                console.log("this is cmg")
                Axios
                .get(`http://localhost:4000/monthlyExpenseLimit/accid=${uid}`).then(response=>{
                  console.log("your MEL is: "+response.data[0].left)
                  alert("your MEL is: "+response.data[0].left)
                })
              }   
            },
          });
    }
    componentWillUnmount(){
        this.alanBtnInstance.deactivate()
    }
    render(){
        return <div>
            HomePage
           <div ref={this.alanCont}> </div>
        </div>
    }
}


export default Home;