import express from 'express';
import cors from 'cors';
import fs from 'fs';
import {lastMensagens} from './util/utimas10.js';


const server = express();

server.use(cors());
server.use(express.json());

let database = JSON.parse(fs.readFileSync("./src/database/database.json", "utf-8"));
let msgsBanco = JSON.parse(fs.readFileSync("./src/database/mensagem.json", "utf-8"));

let users = database.user;
let mensagens = msgsBanco;

server.post('/sign-up', (req, res)=>{
    const {username, avatar} = req.body;
    const listaUsuarios = users.map(e=>{return e.username})

    if (listaUsuarios.includes(username)){
        res.status(200).send("OK");
        return;
    }
    if(!username || !avatar) {
        res.status(400).send("Username e Avatar Vazios !!"); 
        return;
    }
    
    users.push(req.body);
    fs.writeFileSync("./src/database/database.json", JSON.stringify({user:users}, null , 2));
    res.status(200).send("OK");

});




server.post('/tweets', (req, res)=>{
    if(req.body.username == "" || req.body.tweet == "") {
        return res.sendStatus(400);
    }else{
        users.forEach(e=>{
            if(e.username === req.body.username){
                let msg = req.body;
                msg['avatar'] = e.avatar;
                mensagens.unshift(msg);
            }
        })
    }
    
    console.log(req.body);
    
    fs.writeFileSync("./src/database/mensagem.json", JSON.stringify(mensagens, null , 2));
    const lastMsgs = lastMensagens(mensagens);
    res.status(200).send(lastMsgs)


});

server.get('/tweets', (req, res)=>{
    const lastMsgs = lastMensagens(mensagens);
    res.status(200).send(lastMsgs)
    

});



server.listen(5000)