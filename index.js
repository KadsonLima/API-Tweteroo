import express from 'express';

const server = express();

server.use(cors())

server.get('/', (req, res)=>{

    res.send("teste")

});




server.listen(5000)