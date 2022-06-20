function lastMensagens(mensagem){
    let ultimas10 = [];

    for(let i = 0 ; i<10; i++){
        ultimas10.push(mensagem[i]);
    }

    return ultimas10;
}

export {lastMensagens};