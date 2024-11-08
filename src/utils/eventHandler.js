const fs = require('fs');
const path = require('path');

// Function to register all event handlers
function registerEvents(client) {
    const eventDir = path.join(__dirname, '../events');

    // Read all folders inside the event directory
    fs.readdirSync(eventDir).forEach(folder => {
        const eventFolderPath = path.join(eventDir, folder);
        const eventFiles = fs.readdirSync(eventFolderPath).filter(file => file.endsWith('.js'));
        const eventName = folder; // Use folder name as the event name

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
