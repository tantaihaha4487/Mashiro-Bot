const { EmbedBuilder } = require('discord.js');
const media = require('../../utils/mediaConfig');
const { WELCOME_ROLE_ID } = process.env;

module.exports = async (_client, member) => {
    const guild = member.guild;
    const channel = guild.systemChannel;
    console.log(`Member joined guild ${guild.id}.`);

    if (WELCOME_ROLE_ID) {
        const welcomeRole = guild.roles.cache.get(WELCOME_ROLE_ID);
        if (!welcomeRole) {
            console.error(`WELCOME_ROLE_ID was not found in guild ${guild.id}.`);
        } else {
            try {
                await member.roles.add(welcomeRole, 'Automatic welcome role');
                console.log(`Assigned the welcome role in guild ${guild.id}.`);
            } catch (error) {
                console.error(`Failed to assign the welcome role in guild ${guild.id}:`, error);
            }
        }
    }

    if (!channel) return; // Role assignment still works without a system channel.

    const author = { name: guild.name };
    const guildIcon = guild.iconURL();
    if (guildIcon) author.iconURL = guildIcon;

    const welcomeEmbed = new EmbedBuilder()
        .setColor(0xf9c6cf)
        .setTitle(`・:。Welcome「 ✉️ 」・:三`)
        .setAuthor(author)
        .setDescription(`
⌣⌣⌣⌣⌣⌣⌣⌣⌣⌣⌣⌣ ‧₊˚✧
╰─ - ̗̀✎ <@${member.id}>
⌣⌣⌣⌣⌣⌣⌣⌣⌣⌣⌣⌣ ‧₊˚✧ 
        `)
        .addFields(
            { name: ' ﹒User﹒✿﹒', value: `꒰<@${member.id}>꒱`, inline: true },
            { name: ' lıl﹒Member Count﹒ ', value: `꒰${guild.memberCount}꒱`, inline: true },
        )
        .setTimestamp();

    if (media.welcomeThumbnail) welcomeEmbed.setThumbnail(media.welcomeThumbnail);
    if (media.welcomeBanner) welcomeEmbed.setImage(media.welcomeBanner);

    // Send to system channel.
    await channel.send({ embeds: [welcomeEmbed] });
};
