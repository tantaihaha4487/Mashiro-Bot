const { EmbedBuilder } = require('discord.js');
const media = require('../../utils/mediaConfig');
const { BOT_OWNER_ID } = process.env;

module.exports = async (client) => {
    if (!BOT_OWNER_ID) {
        console.log('reporter.js: BOT_OWNER_ID is not specified');
        return;
    }

    const date = new Date().toString();
    const author = { name: client.user.username };
    const avatar = client.user.avatarURL();
    if (avatar) author.iconURL = avatar;

    const events = client.events.map(
        (event, index) => `╰─ - **[${index + 1}]** ${event}`
    ).join('\n').slice(0, 1024) || 'None';
    const commands = client.commands.map(
        (command, index) => `╰─ - **[${index + 1}]** ${command.data.name} - ${command.data.description}`
    ).join('\n').slice(0, 1024) || 'None';

    const reporterEmbed = new EmbedBuilder()
        .setTitle('Discord-Bot Start Reporter')
        .setAuthor(author)
        .setColor(0x00FFFF)
        .addFields(
            { name: '★﹒BOT NAME', value: client.user.username, inline: true },
            { name: '∿　 TIME  ・', value: date.split(' ').slice(0, 5).join(' '), inline: true },
            { name: '╰╮REGISTERED EVENTS', value: events },
            { name: '╰╮REGISTERED COMMANDS', value: commands }
        )
        .setTimestamp();

    if (media.reporterThumbnail) reporterEmbed.setThumbnail(media.reporterThumbnail);

    try {
        const user = await client.users.fetch(BOT_OWNER_ID);
        await user.send({ embeds: [reporterEmbed] });
        console.log('reporter.js: Reporter has been sent a message to the owner');
    } catch (error) {
        console.error('reporter.js: Error sending message to owner', error);
    }
};
