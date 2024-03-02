module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        client.on('interactionCreate', interaction => {
            if (!interaction.isChatInputCommand()) return;
            // Command does not exit.
            command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;


            command.execute(interaction)
                .catch(async (err) => {
                    console.error(err);
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                });
        });
	},
};