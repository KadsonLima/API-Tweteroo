import express from 'express';
import cors from 'cors';

const server = express();

server.use(cors(), express.json())

let users = [];
let mensagens = [];

server.post('/sign-up', (req, res)=>{
    if(req.body.username == "" || req.body.avatar == "") res.status(400).send("BADREQUEST");
    users.push(req.body)
    res.status(200).send("OK")

});

server.get('/sign-up', (req, res)=>{
    res.send(users)

});


server.post('/tweets', (req, res)=>{
    console.log(req.body)
    users.forEach(e=>{
        if(e.username === req.body.username){
            let msg = req.body;
            msg['avatar'] = e.avatar;
            mensagens.push(msg);
        }
    })
    res.status(200).send(mensagens);

});

server.get('/tweets', (req, res)=>{
    res.status(200).send(mensagens)
    

});



server.listen(5000)