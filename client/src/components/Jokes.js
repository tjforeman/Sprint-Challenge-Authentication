import React from 'react';
import axios from 'axios';


class Jokes extends React.Component {
    state = {
      jokes: [],
    };

    componentDidMount() {
        const token = localStorage.getItem('jwt');
        const requestConfig = {
          headers: {
            authorization: token,
          },
        };
        axios
          .get('http://localhost:3300/api/jokes', requestConfig)
          .then(res => {
            this.setState({jokes: res.data});
          })
          .catch(err => console.error(err));
      }


 render() {
    return (
      <>
        <h2>Best Dad Jokes Ever</h2>
        <ul>
          {this.state.jokes.map(jokes => (
            <div className='joke-wrapper'>
            <ul key={jokes.id}>Joke: {jokes.joke}</ul>
            </div>
          ))}
        </ul>
      </>
    );
  }

 }


 export default Jokes