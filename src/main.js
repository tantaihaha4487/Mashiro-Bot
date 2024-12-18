const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { registerEvents } = require('./utils/eventsHandler');
require('dotenv').config();
const { BOT_TOKEN } = process.env;

const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildVoiceStates,
        ],
        partials: [Partials.Message, Partials.Channel, Partials.Reaction]
    }
);

client.events = [];

registerEvents(client);
client.login(BOT_TOKEN);