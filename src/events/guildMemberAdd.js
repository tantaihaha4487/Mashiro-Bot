const { EmbedBuilder } = require('discord.js');
const { generateBanner } = require('../utils/profileBannerGenerater');
const { MEMBER_ROLE_ID } = require('../../config.json');


module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {

        const channel = member.guild.channels.cache.find(ch => ch.id == member.guild.systemChannelId);
        const memberRole = member.guild.roles.cache.get(MEMBER_ROLE_ID);
        const guildIcon = await member.guild.iconURL();
        const buffer = await generateBanner(member.displayAvatarURL());
        
        const label = new EmbedBuilder()
            .setColor(0xf9c6cf)
            .setTitle(`Welcome to ${member.guild.name}`)
            .setAuthor({ name: `${member.guild.name}`, iconURL: `${guildIcon}` })
            .setDescription(`ยินดีต้อนรับ ${member.user.tag} สู่ ${member.guild.name}`)
            .addFields(
                { name: '✿ User ↷', value: `<@${member.id}>`, inline: true },
                { name: '✿ Member Count ↷', value: `${member.guild.memberCount}`, inline: true },
            )
            .setTimestamp();


        // Send to system chanel.
       	channel.send({ embeds: [label] });
       	channel.send({ files: [buffer] });

		// Add Member role
		member.roles.add(memberRole);


    },
};
