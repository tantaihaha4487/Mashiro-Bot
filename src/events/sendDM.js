const { EmbedBuilder } = require("discord.js");
require('dotenv').config();


const { ADMIN_USER_ID } = require('../../config.json');


module.exports = {
	name: 'ready',
	once: true,
	execute(client) {

        // Send DM notification when bot online.
        client.users.fetch(ADMIN_USER_ID)
            .then(user => {

                embed = new EmbedBuilder()
                    .setColor(0xf9c6cf)
                    .setTitle(`Bot Online!!`)
                    .setDescription(`🟢 ${client.user.username} was online.`)
                    .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp();

                user.send({ embeds: [embed] });
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
	},
};