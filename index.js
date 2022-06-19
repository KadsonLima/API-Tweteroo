import express from 'express';
import cors from 'cors';
import fs from 'fs';


const server = express();

server.use(cors(), express.json())

let database = JSON.parse(fs.readFileSync("database.json", "utf-8"));

let users = database.user;
let mensagens = [];

server.post('/sign-up', (req, res)=>{
    const {username, avatar} = req.body;
    if(!username || !avatar) {res.status(400).send("Username e Avatar Vazios !!"); return}
    if(users.forEach((user)=>{
        if(user.username == username){
         res.status(400).send("Username Já existente !!");
         return;
        }
    }));

    users.push(req.body);
    fs.writeFileSync("database.json", JSON.stringify({user:users}, null , 2));
    res.status(200).send("OK");

});

server.get('/sign-up', (req, res)=>{
    res.send(users)

});


server.post('/tweets', (req, res)=>{
    if(req.body.username == "" || req.body.tweet == "") {
        return res.sendStatus(400);
    }else{
        users.forEach(e=>{
            if(e.username === req.body.username){
                let msg = req.body;
                msg['avatar'] = e.avatar;
                mensagens.push(msg);
            }
        })
    }
    
    console.log(req.body);
    
    
    res.status(200).send(mensagens);

});

server.get('/tweets', (req, res)=>{
    res.status(200).send(mensagens)
    

});



server.listen(5000)