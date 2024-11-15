const { EmbedBuilder} =require('discord.js');
require('dotenv').config();
const { BOT_OWNER_ID } = process.env;

module.exports = (client) => {
    // if owner is not specified
    if (!BOT_OWNER_ID) return console.log('reporter.js: BOT_OWNER_ID is not specified');

    const reporterEmbed = new EmbedBuilder()
    .setTitle('Discord-Bot Start Reporter')
    .setAuthor({ name: client.user.username, iconURL: `${client.user.avatarURL()}` })
    .setColor(0x00FFFF)
    .setThumbnail('https://media1.tenor.com/m/v_JQ83gJYvMAAAAC/natsuki-momohara-one-room.gif')
    .addFields(
        { name: '★﹒BOT NAME', value: client.user.username, inline: true },
        { name: '∿　 BOT ID  ・', value: client.user.id, inline: true },
        { name: '╰╮REGISTERD EVENTS', value: client.events.map(
            (elememt, index) => `╰─ - **[${index + 1}]** ${elememt}`
        ).join('\n')} // list of events
       
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