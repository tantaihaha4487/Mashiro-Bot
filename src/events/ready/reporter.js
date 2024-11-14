const { EmbedBuilder} =require('discord.js');
require('dotenv').config();
const { BOT_OWNER_ID } = process.env;

module.exports = (client) => {
    // if owner is not specified
    if (!BOT_OWNER_ID) return console.log('reporter.js: BOT_OWNER_ID is not specified');

    const reporterEmbed = new EmbedBuilder()
    .setTitle('Discord-Bot Reporter')
    .setAuthor({ name: client.user.username, iconURL: `${client.user.avatarURL()}` })
    .setColor(0xb200f9)
    .setDescription('Reporter is here!')
    .addFields(
        { name: 'Bot Name', value: client.user.username, inline: true },
        { name: 'Bot ID', value: client.user.id, inline: true },
        { name: 'Registered Event', value: client.events.map(e => e).join(', ') },
    )
    .setTimestamp();

    // send to the owner's direct message channel
    client.users.fetch(BOT_OWNER_ID)
    .then(user => {
        user.send({ embeds: [reporterEmbed] });
        console.log('reporter.js: Reporter has been sent a message to the owner');
    })
    .catch((err) => {
        console.error('reporter.js: Error sending message to owner', err);
    });


}