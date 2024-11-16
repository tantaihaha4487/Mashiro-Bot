/**
 * NOTE: This is freaking weird logic, However it works :D
 * Because when a user join voice chat, the oldState.channelId will be undefined
 */
const { EmbedBuilder } = require('discord.js');

module.exports = (oldState, newState) => {
    const channel = newState.guild.systemChannel;

    // if user has been joined voice chat
    if (!(oldState.channelId === undefined && newState.channelId === null)) return;


    const joinVoiceChatEmbed = new EmbedBuilder()
        .setColor(0xf9c6cf)
        .setTitle(`↳﹒⌗﹒˙ ᴠᴏɪᴄᴇ ᴄʜᴀᴛ!ツ`)
        .addFields(
            { name: `Now [${newState.member.user.username}]`, value: `꒰Joined Voice Chat꒱` }
        )
        .setThumbnail('https://media1.tenor.com/m/qCiU9pfuRdYAAAAd/komi-komi-san-cant-communicate.gif') // Komi-san pickup phone
        .setTimestamp()

     // Send to system channel.
    channel.send({ embeds: [joinVoiceChatEmbed] });
};
