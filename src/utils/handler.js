const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
require('dotenv').config();


const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;


// Read and set execute command files.
function commandHandler(client) {
    const commandPath = path.join(__dirname, '../commands');
    const commandFiles = readAndFilterFiles(commandPath, (file) => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const command = require(file);
        client.commands.set(command.data.name, command);

        console.log(`Registered ${command.data.name} command.`);
    }
}



// Read and set event files.
function eventHandler() {
    
    eventPath = path.join(__dirname, '../events');
    const eventFiles = readAndFilterFiles(eventPath, (file) => file.endsWith('.js'));
    
    for( const file of  eventFiles ) {
        
        const event = require(file);
        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args))
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }

        console.log(`Registered ${event.name} event.`);
    }
}


// Read and filter files.
function readAndFilterFiles(directoryPath, filterCondition) {
    try {
        // Read files from the specified directory
        const files = fs.readdirSync(directoryPath);

        // Filter files based on the provided condition and map them to their full paths
        const filteredFiles = files
            .filter(file => filterCondition(file))
            .map(file => path.join(directoryPath, file));

        return filteredFiles;
    } catch (error) {
        console.error('Error reading or filtering files:', error);
        return [];
    }
}


// Register commands to discord application.
async function registerCommands() {
    const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);
    const commandData = client.commands.map(command => command.data.toJSON());
    
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commandData })
        .catch(console.error);

    // for global commands
    rest.put(Routes.applicationCommands(CLIENT_ID), { body: commandData })
        .catch(console.error);

    console.log('Successfully register all commands.')
}


// Reset slash command.
function resetCommand() {
    const rest = new REST().setToken(BOT_TOKEN);

    // for guild-based commands
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
        .then(() => console.log('Successfully reset all guild commands.'))
        .catch(console.error);

    // for global commands
    rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
        .then(() => console.log('Successfully reset all application commands.'))
        .catch(console.error);
}



module.exports = { commandHandler, eventHandler, registerCommands, resetCommand }