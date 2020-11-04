

import {Redirect} from 'react-router-dom';


function Logout({handleLogout,...props}){
    handleLogout();
    return <Redirect to="/"></Redirect>
}



export default Logout;