const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const express = require('express');
const { commandHandler, eventHandler, registerCommands } = require('./utils/handler');
require('dotenv').config();


app = express();


app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
      }
    next();
});


client = new Client({
    intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
	],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});
client.commands = new Collection();


const { BOT_TOKEN, PORT } = process.env;
const port = PORT || 3000;


// Start discord bot.
client.login(BOT_TOKEN)
    .then(() => {
        console.log('Login as '+ client.user.tag)
    })

// Route
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Register all commands, events.
commandHandler(client);
eventHandler(client);
registerCommands(client);

// Start express app.
app.listen(port, () => {
    console.log('App is running fine!!');
})