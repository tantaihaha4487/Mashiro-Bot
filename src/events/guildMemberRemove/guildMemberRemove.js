const { EmbedBuilder } = require('discord.js');

module.exports = async (client, member) => {
    const guild = client.guilds.cache.get(member.guild.id);
    const channel = guild.systemChannelId ? guild.channels.cache.get(guild.systemChannelId) : null;
    const guildIcon = guild.iconURL();

    if (!channel) return; // Exit if there's no system channel

    const label = new EmbedBuilder()
        .setColor(0xf9c6cf)
        .setTitle(`・:。Goodbye「 ✉️ 」・:三`)
        .setAuthor({ name: `${guild.name}`, iconURL: `${guildIcon}` })
        .setThumbnail('https://c.tenor.com/oS6oGX2ebOEAAAAd/tenor.gif')
        .setDescription(`
╭──────────.★..─╮
    𝙒𝙚'𝙡𝙡 𝙢𝙞𝙨𝙨 𝙮𝙤𝙪 ♡ .യ
╰─..★.──────────╯
        `)
        .setImage('https://github.com/tantaihaha4487/assets/blob/main/Mashiro-bot/Banner.png?raw=true')
        .setTimestamp();

    // Send to system channel.
    channel.send({ embeds: [label] });
};
