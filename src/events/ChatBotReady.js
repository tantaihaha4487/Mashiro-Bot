const { EmbedBuilder } = require("discord.js");
const { CHATBOT_CHANNEL_ID } = require('../../config.json');


module.exports = {
	name: 'ready',
	once: true,
	execute(client) {

        // Send notification when bot online.
        client.channels.fetch(CHATBOT_CHANNEL_ID)
            .then(user => {

                embed = new EmbedBuilder()
                    .setColor(0x03ffff)
                    .setDescription(`มาชิโระพร้อมแล้วววววว~~`)
                    .setAuthor({ name: `Mashiro`, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp();

                user.send({ embeds: [embed] });
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
	},
};