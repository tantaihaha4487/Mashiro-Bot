/**
 * NOTE: This is freaking weird logic, However it works :D
 * Because when a user leaves the voice chat, the oldState will be undefined and the newState will be the voice chat id.
 */
const { EmbedBuilder } = require('discord.js');

module.exports = (oldState, newState) => {
    const channel = newState.guild.systemChannel;

    // if user has been left voice chat
    if (!(oldState.channelId === undefined && newState.channelId)) return;


    const leftVoiceChatEmbed = new EmbedBuilder()
        .setColor(0xf9c6cf)
        .setTitle(`↳﹒⌗﹒˙ ᴠᴏɪᴄᴇ ᴄʜᴀᴛ!ツ`)
        .addFields(
            { name: `Now [${newState.member.user.username}]`, value: `꒰Left Voice Chat꒱` }
        )
        .setThumbnail('https://media1.tenor.com/m/923ilkD-Nu0AAAAC/yuri-on-ice-yurio.gif') // Yuri On Ice Yurio
        .setTimestamp()

     // Send to system channel.
    channel.send({ embeds: [leftVoiceChatEmbed] });
};