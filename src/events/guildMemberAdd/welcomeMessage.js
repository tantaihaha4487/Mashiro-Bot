const { EmbedBuilder } = require('discord.js');

module.exports = async (client, member) => {
    const guild = client.guilds.cache.get(member.guild.id);
    const channel = guild.systemChannelId ? guild.channels.cache.get(guild.systemChannelId) : null;
    const guildIcon = guild.iconURL();

    if (!channel) return; // Exit if there's no system channel

    const welcomeEmbed = new EmbedBuilder()
        .setColor(0xf9c6cf)
        .setTitle(`・:。Welcome「 ✉️ 」・:三`)
        .setAuthor({ name: `${guild.name}`, iconURL: `${guildIcon}` })
        .setThumbnail('https://media.tenor.com/sh8xc5-HiVEAAAAi/anime-woo.gif') // boucing gif.
        .setDescription(`
⌣⌣⌣⌣⌣⌣⌣⌣⌣⌣⌣⌣ ‧₊˚✧
╰─ - ̗̀✎ <@${member.id}>
⌣⌣⌣⌣⌣⌣⌣⌣⌣⌣⌣⌣ ‧₊˚✧ 
        `)
        .addFields(
            { name: ' ﹒User﹒✿﹒', value: `꒰<@${member.id}>꒱`, inline: true },
            { name: ' lıl﹒Member Count﹒ ', value: `꒰${guild.memberCount}꒱`, inline: true },
        )
        .setImage('https://i.pinimg.com/564x/b4/b3/69/b4b36946e6ff04f0eeb75e79ed253f5b.jpg') // welcome banner image.
        .setTimestamp();

    // Send to system channel.
    channel.send({ embeds: [label] });
};
