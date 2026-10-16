require("dotenv").config();

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { registerEvents } = require("./utils/eventsHandler");
const { registerCommand } = require("./utils/commandsHandler");
const { BOT_TOKEN } = process.env;

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN is required. Copy .env.example to .env and set it.");
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

client.events = [];
client.commands = new Collection();

registerEvents(client);
registerCommand(client);

client.login(BOT_TOKEN).catch((error) => {
  console.error("Failed to log in to Discord:", error);
  client.destroy();
  process.exitCode = 1;
});
