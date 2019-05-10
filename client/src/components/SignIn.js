import React from 'react';
import axios from 'axios';
import { Button, Form, Input,} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

 class SignIn extends React.Component {
    constructor() {
      super();
      this.state = {
        username: "",
        password: "",


       };
    }

    changeHandler = e =>{
        e.preventDefault()
        this.setState({
        [e.target.name]: e.target.value
        })
    }

   signIn = event => {
    event.preventDefault();
    axios
      .post('http://localhost:3300/api/login', this.state)
      .then(res => {
        localStorage.setItem('jwt', res.data.token);
        this.props.history.push('/jokes');
      })
      .catch(err => {
        console.error('Error while attempting to Login', err);
      });
  };

       render() {
        return (
          <div className='login-wrapper'>
            <h2>Log In</h2>
            <Form>
            <label htmlFor="username" />
              <Input
                type="text"
                placeholder="Enter your username"
                name="username"
                onChange={this.changeHandler}
                value={this.state.username}
              />
              <label htmlFor="password" />
              <Input
                type="password"
                placeholder="Enter your password"
                onChange={this.changeHandler}
                name="password"
                value={this.state.password}
              />
              <Button color="primary" onClick={this.signIn}>
                Log In
              </Button>
            </Form>
          </div>
        );
      }
}

 export default SignIn;