import express, { json, request, response } from "express";
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
tweets.push({
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
let newTweets = [...tweets];
newTweets.splice(0, (tweets.length > 10 ? tweets.length - 10 : 0));
response.send(newTweets);
})

app.get("/tweets/:username", (request, response) => {
let newTweets = [...tweets];
newTweets.splice(0, (tweets.length > 10 ? tweets.length - 10 : 0));
response.send(tweets);
})

app.listen(5000, () => {
console.log("server on");
})
