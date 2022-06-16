import express from 'express';
import cors from 'cors';

const server = express();

server.use(cors(), express.json())

let users = [];
let mensagens = [];

server.post('/sign-up', (req, res)=>{
    users.push(req.body)
    res.status(200).send("OK")

});

server.get('/sign-up', (req, res)=>{
    console.log(req.body)
    res.send(users)

});


server.post('/tweets', (req, res)=>{
    console.log(req.body)

});

server.get('/tweets', (req, res)=>{
    res.send(mensagens)
});



server.listen(5000)