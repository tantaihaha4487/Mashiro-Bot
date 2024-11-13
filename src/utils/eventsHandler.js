const fs = require('fs');
const path = require('path');

// Function to register all event
function registerEvents(client) {
    const eventDir = path.join(__dirname, '../events');

    // Read all folders inside the event directory
    const folders = fs.readdirSync(eventDir);
    folders.forEach(folder => {
        const eventFolderPath = path.join(eventDir, folder);
        const eventName = folder; // Use folder name as the event name

        const eventFiles = fs.readdirSync(eventFolderPath).filter(file => file.endsWith('.js'));
        console.log(`Registering event: ${eventName}`);

        // Attach the event to the client
        client.on(eventName, (...args) => {
            console.log(`Event triggered: ${eventName}`);
            eventFiles.forEach(file => {
                const event = require(path.join(eventFolderPath, file));
                event(client, ...args);
            });
        });
    });
}

module.exports = { registerEvents };
