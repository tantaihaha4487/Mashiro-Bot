const { EmbedBuilder } = require("discord.js");
const { CHATBOT_CHANNEL_ID } = require('../../config.json');
const { generativeAITextOnly } = require("../utils/AI/genAI");
const { textOnlyChatHistory } = require('../utils/prompt');
const errEmbed = new EmbedBuilder()
        .setColor(0xff0202)
        .setTitle('Error')
        .setDescription(`Mashiro can't generate the answer.` )
        .setFooter({ text: 'มาชิโระไม่สามารถสร้างคำตอบได้.' })
        .setTimestamp();
let chatHistory = textOnlyChatHistory;


function handleTurn(user, response) {
    const userChat = {
        role: 'user', 
        parts: [{ text: user}]
    }
    const modelResponse = {
        role: 'model', 
        parts: [{ text: response}]
    }
    
    chatHistory.push(userChat, modelResponse);
}



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

            // Prompt is not blank.
            try {
                if (!msg || msg.trim() === '') {
                    message.reply({ embeds: [errEmbed], ephemeral: true });
                    console.error('Error: Input message is empty.');
                    return;
                }

                // Generate response
                const result = await generativeAITextOnly(msg, chatHistory);

                // Response is blank,
                if (!result || result.trim() === '') {
                    message.reply({ embeds: [errEmbed], ephemeral: true });
                    console.error('Error: Ai response is empty.');
                    return;
                }
                
                // Send message
                if (result.length <= 2000) {
                    message.reply(result);
                } else {
                    // Split the text into chunks of 2000 characters
                    const chunks = text.match(/[\s\S]{1,2000}/g) || [];
                    // Send each chunk as a separate message
                    for (const chunk of chunks) {
                        await message.reply(chunk);
                    }
                }

                handleTurn(msg, result)
                console.log('Ask: ', msg);
                console.log('Response: ', result);
            } catch (err) {
                message.reply({ content: `Mashiro can't generate the answer, มาชิโระไม่สามารถสร้างคำตอบได้.`, ephemeral: true });
                console.error('Error occurred:', err);
            }
        })();


    },
};
