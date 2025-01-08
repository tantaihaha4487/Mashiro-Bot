const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { registerEvents } = require('./utils/eventsHandler');
const { registerCommand } = require('./utils/commandsHandler');
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
client.commands = new Collection();

registerEvents(client);
registerCommand(client);

client.login(BOT_TOKEN);