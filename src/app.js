const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const express = require('express');
const { commandHandler, eventHandler, registerCommands, resetCommand } = require('./utils/handler');
require('dotenv').config();


const { BOT_TOKEN, PORT } = process.env;
const port = PORT || 3000;


const app = express();


// Middleware.
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    next();
});


const client = new Client({
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


// Start discord bot.
client.login(BOT_TOKEN)
    .then(() => {
        console.log('Login as '+ client.user.tag);
        // Register all commands, events.
        commandHandler(client);
        eventHandler(client);
        resetCommand();
        return registerCommands(client);
    })
    .then(() => {
        // Start express app.
        app.listen(port, () => {
            console.log('App is running fine!!');
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
