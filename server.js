const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use('/login', jsonParser, (req, res, next) => {
        if(req.hasOwnProperty('cookies') && req.cookies['AuthToken']) {
            const authToken = req.cookies['AuthToken'];
            const now = new Date()


            if(authTokens[authToken] && authTokens[authToken].expire!=='0' && authTokens[authToken].expire < now.getTime().toString()){
                delete authTokens[authToken]
                req.user = null;

            }else{
                if(authTokens[authToken]){

                    req.user = authTokens[authToken].user;
                    console.log(req.user)
                }else{
                    req.user = null
                }
            }
      }else{

        req.user = null;
      }



  next()


});

app.use('/history', jsonParser, (req, res, next) => {
        if(req.hasOwnProperty('cookies') && req.cookies['AuthToken']) {
            const authToken = req.cookies['AuthToken'];
            const now = new Date()

            if(authTokens[authToken] && authTokens[authToken].expire!=='0' && authTokens[authToken].expire < now.getTime().toString()){
                delete authTokens[authToken]
                req.user = null;

            }else{
                if(authTokens[authToken]){

                    req.user = authTokens[authToken].user;
                    console.log(req.user)
                }else{
                    req.user = null
                }
            }
      }else{

        req.user = null;
      }



  next()


});

app.use('/admin', jsonParser, (req, res, next) => {
        if(req.hasOwnProperty('cookies') && req.cookies['AuthToken']) {
            const authToken = req.cookies['AuthToken'];
            const now = new Date()

            if(authTokens[authToken] && authTokens[authToken].expire!=='0' && authTokens[authToken].expire < now.getTime().toString()){
                delete authTokens[authToken]
                req.user = null;

            }else{
                if(authTokens[authToken]){

                    req.user = authTokens[authToken].user;
                    console.log(req.user)
                }else{
                    req.user = null
                }
            }
      }else{

        req.user = null;
      }



  next()


});

let users = {'username':{
      user:'username',
      password:'123456',
      uri:'',
      name:'',
      socket:'',
      pass:'',
      admin: true,
    },'abcxyz123':{
      user:'abcxyz123',
      password:'123456',
      uri:'',
      name:'',
      socket:'',
      pass:'',
      admin: false,
    }}

let history = {'username':[],'abcxyz123':[]}


const authTokens = {}

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

app.post('/login',jsonParser, (req, res) => {
    const { username, password, expire } = req.body;
    if(username && password){
        const user = users[username] //TODO

    if(user && password === user.password){
      const authToken = generateAuthToken();
          // Store authentication token
      authTokens[authToken] = {user:user, expire:'0'};
      res.cookie('AuthToken', authToken);
        res.json({'state':'correct'})
  }else{

        res.json({'state':'incorrect'})
    }
    }else{

        if(authTokens[req.cookies['AuthToken']]){
            authTokens[req.cookies['AuthToken']].expire = expire
        }
        res.json({'state':'correct'})
    }
});

app.post('/call',jsonParser, (req, res)=>{
    const { username, destination, time , status, start, name} = req.body;
    let ip = req.headers['x-real-ip'] || req.socket.remoteAddress

    let useragent = req.get('user-agent')
    let os = ''
    if(useragent.indexOf(';', useragent.indexOf(';')+1) !== -1 && useragent.indexOf(';', useragent.indexOf(';')+1) < useragent.indexOf(')')){
        os = useragent.slice(useragent.indexOf(';')+2, useragent.indexOf(';',useragent.indexOf(';')+1))
    }else{
        os = useragent.slice(useragent.indexOf(';'), useragent.indexOf(')'))
    }

    let browser = useragent.slice(useragent.lastIndexOf(' ')+1,useragent.lastIndexOf('/'))
    if(browser === 'Safari'){

        if(useragent.indexOf('Chrome')!==-1){
            browser = 'Chrome'
        }
    }
    if(history[username]){
        history[username].push({username: username, destination: destination, time: time, ip: ip, os: os, browser: browser, status: status, start: start, name: name})
    }
})

app.put('/', jsonParser, (req, res) =>{
    const { uri, name, socket, pass} = req.body;
    if(authTokens[req.cookies['AuthToken']].user){
        const username = authTokens[req.cookies['AuthToken']].user.user

    users[username].uri = uri
    users[username].name = name
    users[username].socket = socket
    users[username].pass = pass
    authTokens[req.cookies['AuthToken']].user.uri = uri
    authTokens[req.cookies['AuthToken']].user.name = name
    authTokens[req.cookies['AuthToken']].user.socket = socket
    authTokens[req.cookies['AuthToken']].user.pass = pass
    }
})

app.get('/login',jsonParser,(req,res)=>{

  if(req.user){
    res.json(req.user)
  }else{

    res.json(null)
  }
});

app.get('/history',jsonParser,(req,res)=>{
    // console.log(authTokens)

    if(req.user){
        console.log(history[req.user.user])
        if(req.user){
            console.log(history[req.user.user])
            res.json(history[req.user.user])
        }else{
            res.json(null)
        }
    }

});

app.get('/admin',jsonParser,(req,res)=>{
    // console.log(authTokens)

    if(req.user && req.user.admin){
        console.log(history)
        if(req.user){
            res.json(history)
        }else{
            res.json(null)
        }
    }

});

app.get('/',jsonParser,(req, res)=>{
    if(authTokens[req.cookies['AuthToken']].user){
        res.json(authTokens[req.cookies['AuthToken']].user)
    }
})

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));


