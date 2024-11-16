const fs = require('fs');
const path = require('path');

// Function to register all events
function registerEvents(client) {
    const eventDir = path.join(__dirname, '../events');
    client.events = []; // Initialize client.events as an empty array

    // Read all folders inside the event directory
    const folders = fs.readdirSync(eventDir);
    folders.forEach(folder => {
        const eventFolderPath = path.join(eventDir, folder);
        const eventName = folder; // Use folder name as the event name

        const eventFiles = fs.readdirSync(eventFolderPath).filter(file => file.endsWith('.js'));
        console.log(`Registering event: ${eventName}`);

        eventFiles.forEach(file => {
            const eventPath = `${eventName}/${file}`; // Create path like ready/ready.js
            client.events.push(eventPath); // Push the event path to client.events

            try {
                const eventModule = require(path.join(eventFolderPath, file));
                if (typeof eventModule === 'function') {
                    // Attach the event to the client
                    client.on(eventName, (...args) => {
                        console.log(`Event triggered: ${eventName}`);
                        eventModule(client, ...args);
                    });
                } else {
                    console.error(`Error: ${eventPath} does not export a function`);
                }
            } catch (error) {
                console.error(`Error loading event file ${eventPath}:`, error);
            }
        });
    });
}

module.exports = { registerEvents };

