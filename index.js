import express, { json, query, request, response } from "express";
import cors from "cors";

let dadosUser = [];
let tweets = [
    {
    username: "bobesponja",
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub 1",
    },
    {
    username: "bobesponja",
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub 2",
    },
    {
    username: "bobesponja",
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub 3",
    },
    {
    username: "bobesponja",
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub 4",
    },
    {
    username: "bobesponja",
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub 5",
    },
    {
    username: "bobesponja",
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub 6",
    },
    {
    username: "bobesponja",
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub 7",
    },
    {
    username: "bobesponja",
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub 8",
    },
    {
    username: "bobesponja",
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub 9",
    },
    {
    username: "bobesponja",
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub 10",
    },
    {
    username: "bobesponja",
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub 11",
    },
    {
    username: "bobesponja",
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub 12",
    }
];

const app = express();
app.use(json());
app.use(cors());

app.post("/sign-up", (request, response) => {
    const { body } = request;
    dadosUser.push(body);
    response.status(200).send('OK'); 
})

app.post("/tweets", (request, response) => {
    const { body, headers } = request;
    let userName;
    if(headers.user != undefined){
        userName = headers.user;
    }else{
        userName = body.username;
    }
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
})

app.get("/tweets", (request, response) => {
    const { query } = request
    const page = (query.page != undefined? (query.page -1) *10 : 0 );
    if(tweets.length > page){
        let newTweets = [];
        tweets.forEach((el, i) => {
            if(i >= page && i < (page +10)){
                newTweets.push(el);
            }
        })
        response.status(200).send(newTweets);
    }else{
        response.status(400).end();
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
