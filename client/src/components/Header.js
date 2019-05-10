import React from 'react'
import {NavLink} from 'react-router-dom'
import { Button} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

 class Header extends React.Component{

    handleLogout= () =>{ 
localStorage.removeItem('jwt');
this.props.history.push('/login');
}
render(){
    return(
        <div className='header'>
        <NavLink to='/signup'>Sign Up</NavLink>
        <NavLink to='/login'>Log In</NavLink>
        <NavLink to='/jokes'>Users</NavLink>
        <Button color='primary'type="button" onClick={this.handleLogout}>
          Logout
        </Button>
        </div>
    )
}
}

 export default Header