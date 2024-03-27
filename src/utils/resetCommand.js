const fs = require('fs');
const { REST, Routes } = require('discord.js');
require('dotenv').config();


const { BOT_TOKEN, CLIENT_ID } = process.env;
const { GUILD_ID } = require('../../config.json');



// Reset slash command.
(function resetCommand() {
    const rest = new REST().setToken(BOT_TOKEN);

    // for guild-based commands
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
        .then(() => console.log('Successfully reset all guild commands.'))
        .catch(console.error);

    // for global commands
    rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
        .then(() => console.log('Successfully reset all application commands.'))
        .catch(console.error);
})();


module.exports = { resetCommand }