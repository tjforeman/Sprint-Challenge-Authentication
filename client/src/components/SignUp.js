import React from "react";
import { Button, Form, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";

 class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
     };
  }

          changeHandler = e =>{
        e.preventDefault()
        this.setState({
        [e.target.name]: e.target.value
        })
    }

     register = event => {
        event.preventDefault();
        axios
          .post('http://localhost:3300/api/register', this.state)
          .then(res => {
            localStorage.setItem('jwt', res.data.token);
            this.props.history.push('/users');
          })
          .catch(err => {
            console.error('error while attempting to sign up', err);
          });
      };

   render() {
    return (
      <div className='signup-wrapper'>
        <h2>Sign Up</h2>
        <Form>
        <label htmlFor="username" />
          <Input
            type="text"
            placeholder="enter a username"
            name="username"
            onChange={this.changeHandler}
            value={this.state.username}
          />
          <label htmlFor="password" />
          <Input
            type="password"
            placeholder="enter a password"
            onChange={this.changeHandler}
            name="password"
            value={this.state.password}
          />
          <label htmlFor="department" />
          <Button color="primary" onClick={this.register}>
            Sign Up
          </Button>
        </Form>
      </div>
    );
  }
}
export default Register;