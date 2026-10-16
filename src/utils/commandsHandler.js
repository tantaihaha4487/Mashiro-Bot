const fs = require("node:fs");
const path = require("node:path");

function registerCommand(client, commandPath = path.join(__dirname, "../commands")) {
  const commandFiles = fs
    .readdirSync(commandPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".js"))
    .map((entry) => path.join(commandPath, entry.name));

  for (const file of commandFiles) {
    const command = require(file);
    const name = command?.data?.name;
    if (typeof name !== "string" || typeof command.execute !== "function") {
      throw new TypeError(`Command module ${file} must export data.name and execute()`);
    }
    if (client.commands.has(name)) {
      throw new Error(`Duplicate command name: ${name}`);
    }

    client.commands.set(name, command);
    console.log(`Registered ${name} command.`);
  }
}

module.exports = { registerCommand };
