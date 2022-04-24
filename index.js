import express, { json, query, request, response } from "express";
import cors from "cors";

let dadosUser = [];
let tweets = [];

const app = express();
app.use(json());
app.use(cors());

app.post("/sign-up", (request, response) => {
    const { body } = request;
    const testF = /svg|jpg|jpeg|gif|png/;
    const link = body.avatar.split('.');
    const format = link[link.length-1];
    if(body.username == '' || body.avatar == ''){
        response.status(400).send('Todos os campos são obrigatórios!'); 
    }else if(testF.test(format)){
        dadosUser.push(body);
        response.status(200).send('OK'); 
    }else{
        response.status(400).send('A imagem deve ter um formato válido!'); 
    }
})

app.post("/tweets", (request, response) => {
    const { body, headers } = request;
    let userName;
    if(headers.user != undefined){
        userName = headers.user;
    }else{
        userName = body.username;
    }
    if(userName == '' || body.tweet == ''){
        response.status(400).send('Todos os campos são obrigatórios!'); 
    }else{
        const user = dadosUser[dadosUser.findIndex((el) => el.username == userName)];
        if(user != undefined){
            tweets.unshift({
            username: user.username,
            avatar: user.avatar,
            tweet: body.tweet
            });
            response.status(201).send('OK'); 
        }else{
            response.status(400).end();
        }
    }
})

app.get("/tweets", (request, response) => {
    const { query } = request
    const page = (query.page != undefined? (query.page -1) *10 : 0 );
    if(tweets.length > page || tweets.length == 0){
        let newTweets = [];
        tweets.forEach((el, i) => {
            if(i >= page && i < (page +10)){
                newTweets.push(el);
            }
        })
        response.status(200).send(newTweets);
    }else{
        response.status(400).send('Informe uma página válida!');
    }
})

app.get("/tweets/:username", (request, response) => {
    const userName = request.params.username;
    let newTweets = tweets.filter((el) => el.username == userName);
    response.status(200).send(newTweets);
})

app.listen(5000, () => {
    console.log("server on");
})
