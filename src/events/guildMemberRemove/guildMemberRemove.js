const { EmbedBuilder } = require('discord.js');
const media = require('../../utils/mediaConfig');

/**
 * Sending an goodbye embed when a user leaves the server.
*/
module.exports = async (_client, member) => {
    const guild = member.guild;
    const channel = guild.systemChannel;
    console.log(`Member left guild ${guild.id}.`);

    if (!channel) return; // Exit if there's no system channel

    const author = { name: guild.name };
    const guildIcon = guild.iconURL();
    if (guildIcon) author.iconURL = guildIcon;

    const goodbyeEmbed = new EmbedBuilder()
        .setColor(0xf9c6cf)
        .setTitle(`・:。Goodbye「 ✉️ 」・:三`)
        .setAuthor(author)
        .setDescription(`
╭──────────.★..─╮
﹕・𝙒𝙚'𝙡𝙡 𝙢𝙞𝙨𝙨 𝙮𝙤𝙪 ♡ .യ
﹕・<@${member.id}>୨
╰─..★.──────────╯
        `)
        .setTimestamp();

    if (media.goodbyeThumbnail) goodbyeEmbed.setThumbnail(media.goodbyeThumbnail);
    if (media.goodbyeBanner) goodbyeEmbed.setImage(media.goodbyeBanner);

    // Send to system channel.
    await channel.send({ embeds: [goodbyeEmbed] });
};
