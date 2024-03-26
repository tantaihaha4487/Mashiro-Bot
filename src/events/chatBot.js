const { EmbedBuilder } = require("discord.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { CHATBOT_CHANNEL_ID } = require('../../config.json');
const { generativeAITextOnly } = require("../utils/AI/genAI");
const { textOnlyChatHistoryPrompt } = require('../utils/prompt');
const errEmbed = new EmbedBuilder()
        .setColor(0xff0202)
        .setTitle('Error')
        .setDescription(`Mashiro can't generate the answer.` )
        .setFooter({ text: 'มาชิโระไม่สามารถสร้างคำตอบได้.' })
        .setTimestamp();


module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        msg = message.content;
        // Is bot return.
        if (message.author.bot) return;
        // Isn't Chat Bot Channel return.
        if (!(message.channel.id === CHATBOT_CHANNEL_ID)) return;
        ( async function () {
            message.channel.sendTyping();
            try {
                generativeAITextOnly(msg, textOnlyChatHistoryPrompt)
                    .then((result) => {

                        // Message is blank
                        if(result === '' || result === undefined) {
                            message.reply({ embeds: [errEmbed], ephemeral: true })
                            console.error('Error: Ai response is empty.');
                            return;
                        }

                        message.reply(result);
                        console.log('Ask: ', msg);
                        console.log('Response: ', result);
                    })
            } catch (err) {
                message.editReply({ content: `Mashiro can't generate the answer, มาชิโระไม่สามารถสร้างคำตอบได้.`, ephemeral: true })
            }
        })();

    },
};