const axios = require('axios');

const bcrypt=require('bcryptjs')
const db =require('../database/dbConfig.js');
const jwt =require('jsonwebtoken')
const secrets=require('./secret.js')

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
    let user=req.body 
    const hash=bcrypt.hashSync(user.password,10)
    user.password=hash
    db('users')
    .insert(req.body)
    .then(user =>{
        const token=generateToken(user)
        res.status(200).json({message:`Welcome ${user.username}, you have successfully singed up`,token})
        })
    .catch(err=>{
        res.status(500).json({error:err,message:'Unable to sign up at this time'})
    })
}

function login(req, res) {
  // implement user login
    let {username,password}=req.body 
    db('users')
    .where({username})
    .first()
    .then(user =>{
        if(user&& bcrypt.compareSync(password,user.password)){
            const token=generateToken(user)
        res.status(200).json({message:`Welcome ${user.username}, you have successfully logged in`,token})
        }else{
            res.status(401).json({message:'you shall not pass!'})
        }
        })
    .catch(err=>{
        res.status(500).json({error:err,message:'Unable to log in at this time'})
    })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

function generateToken(user){
  const payload={
      subject: user.id,
      username:user.username
  };
  const options={
      expiresIn:'1h'
  };
      return jwt.sign(payload, secrets.jwtSecret, options)
  }
