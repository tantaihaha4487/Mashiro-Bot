const fs = require('fs');
const path = require('path');


/**
 * Read and set execute command files.
 */
function registerCommand(client) {
    const commandPath = path.join(__dirname, '../commands');
    const commandFiles = readAndFilterFiles(commandPath, (file) => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const command = require(file);
        client.commands.set(command.data.name, command);

        console.log(`Registered ${command.data.name} command.`);
    }
}


/**
 * 
 * @param {path} directoryPath Directory to read and filter.
 * @param {*} filterCondition condition to filter files.
 * @returns 
 */
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

module.exports = { registerCommand };