const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { generateBanner } = require('../utils/profileBannerGenerater');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command'),
    async execute(interaction) {

        const { member } = interaction;
        
        const channel = member.guild.channels.cache.find(ch => ch.id == member.guild.systemChannelId);
        const guildIcon = await member.guild.iconURL();
        const buffer = await generateBanner(member.displayAvatarURL());
        const attachment = new AttachmentBuilder(buffer, { name: 'profile-image.png' });
        
        const label = new EmbedBuilder()
            .setColor(0xf9c6cf)
            .setTitle(`Welcome to ${member.guild.name}`)
            .setAuthor({ name: `${member.guild.name}`, iconURL: `${guildIcon}` })
            .setDescription(`ยินดีต้อนรับ ${member.user.tag} สู่ ${member.guild.name}`)
            .addFields(
                { name: '✿ User ↷', value: `<@${member.id}>`, inline: true },
                { name: '✿ Member Count ↷', value: `${member.guild.memberCount}`, inline: true },
                { name: '✿ Tips! ↷', value: `อ่านกฏที่ <#> เพื่อรับยศ **Member**`, inline: false },
            )
            .setTimestamp();
        
        channel.send({ embeds: [label] });
        channel.send({ files: [buffer] })
    }
};
