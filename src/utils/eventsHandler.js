const fs = require('fs');
const path = require('path');

// Function to register all events
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
                try {
                    const eventModule = require(path.join(eventFolderPath, file));
                    client.events.push(file);
                    if (typeof eventModule === 'function') {
                        eventModule(client, ...args);
                    } else {
                        console.error(`Error: ${file} does not export a function`);
                    }
                } catch (error) {
                    console.error(`Error loading event file ${file}:`, error);
                }
            });
        });
    });
}

module.exports = { registerEvents };