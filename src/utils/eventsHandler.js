const fs = require("node:fs");
const path = require("node:path");

function registerEvents(client, eventDir = path.join(__dirname, "../events")) {
  client.events ??= [];

  const folders = fs.readdirSync(eventDir, { withFileTypes: true });
  for (const folder of folders) {
    if (!folder.isDirectory()) continue;

    const eventName = folder.name;
    const eventFolderPath = path.join(eventDir, eventName);
    const eventFiles = fs
      .readdirSync(eventFolderPath, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".js"));

    for (const file of eventFiles) {
      const eventPath = `${eventName}/${file.name}`;
      let eventModule;

      try {
        eventModule = require(path.join(eventFolderPath, file.name));
      } catch (error) {
        throw new Error(`Failed to load event module ${eventPath}`, { cause: error });
      }

      if (typeof eventModule !== "function") {
        throw new TypeError(`Event module ${eventPath} must export a function`);
      }

      client.events.push(eventPath);
      const listener = async (...args) => {
        try {
          await eventModule(client, ...args);
        } catch (error) {
          console.error(`Event handler ${eventPath} failed:`, error);
        }
      };

      if (eventName === "clientReady") {
        client.once(eventName, listener);
      } else {
        client.on(eventName, listener);
      }
      console.log(`Registered event: ${eventName} (${eventPath})`);
    }
  }
}

module.exports = { registerEvents };
