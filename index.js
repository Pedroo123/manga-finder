const express = require('express');
const server = express();
const cron = require('cron');
const snoowrap = require('snoowrap');

const {Client, GatewayIntentBits, Embed, EmbedBuilder } = require('discord.js');

//Configurando client
const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds, 
            GatewayIntentBits.GuildMessages, 
            GatewayIntentBits.DirectMessages, 
            GatewayIntentBits.MessageContent
        ]
    }
);

client.once('ready', () => {
    console.log(`Logado como ${client.user.tag}!`);
});

// const reddit = new snoowrap({
//     userAgent: '',
//     clientId: '',
//     clientSecret: '',
//     username: '',
//     password: ''
// });

// const subreddit = '';

// const num_posts = 3;

// reddit.getSubreddit(subreddit).getTop(
//     {limit: num_posts}
//     )
//     .then(posts => {
//         posts.forEach(post => {
//             console.log(post.title);
//         });
//     }).catch(err => {
//         console.log(err);
//     });

const prefix = "!";
const canalBot = process.env.CANAL_BOT;

let scheduledMessage = new cron.CronJob('@hourly', () => {
    const channel = client.channels.cache.get(canalBot)
    channel.send('Teste de mensagem');
});
scheduledMessage.start();

client.on("messageCreate", (msg) => {

    let message = msg.content;

    if (canalBot) {
        if (message.startsWith(prefix)) {
            const command = message.slice(prefix.length).split(" ")[0];
            
            switch (command) {
                case "help": 
                    msg.channel.send("Comando de teste");
                break;

                case "stats":
                    msg.channel.send(`Este servidor possui ${msg.guild.memberCount} membros`);
                break;

                case "random":
                    getRedditPost()
                break;

                default:
                    msg.channel.send("Este nao e um comando valido!");
            }
        }
    } else {
        if (!canalBot && message.startsWith(prefix)) {
            msg.channel.send("nah bruh");
        }
    }
});

//Login com credencial do bot
client.login(process.env.BOT_TOKEN);

//Configurando porta
var port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Bot esta executando na porta ${port}`);
});