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
        const msg = message.content;
        // Is bot return.
        if (message.author.bot) return;
        // Isn't Chat Bot Channel return.
        if (!(message.channel.id === CHATBOT_CHANNEL_ID)) return;
        (async function () {
            message.channel.sendTyping();
            try {
                if (!msg || msg.trim() === '') {
                    message.reply({ embeds: [errEmbed], ephemeral: true });
                    console.error('Error: Input message is empty.');
                    return;
                }

                // // Check for empty chat history
                // if (!textOnlyChatHistoryPrompt || !textOnlyChatHistoryPrompt.parts || textOnlyChatHistoryPrompt.parts.length === 0 || !textOnlyChatHistoryPrompt.length)  {
                // console.error('Error: Chat history is empty.');
                // // Handle empty chat history (e.g., send a message indicating no conversation context)
                // message.reply({ content: `Mashiro doesn't have enough information to answer yet. Please chat with Mashiro more! (มาชิโระยังไม่มีข้อมูลเพียงพอที่จะตอบได้นะ คุยกับมาชิโระเพิ่มเติมอีกสักหน่อย! )`, ephemeral: true });
                // return;
                // }

                const result = await generativeAITextOnly(msg, textOnlyChatHistoryPrompt);

                // Message is blank
                if (!result || result.trim() === '') {
                    message.reply({ embeds: [errEmbed], ephemeral: true });
                    console.error('Error: Ai response is empty.');
                    return;
                }

                message.reply(result);
                console.log('Ask: ', msg);
                console.log('Response: ', result);
            } catch (err) {
                message.reply({ content: `Mashiro can't generate the answer, มาชิโระไม่สามารถสร้างคำตอบได้.`, ephemeral: true });
                console.error('Error occurred:', err);
            }
        })();
    },
};
