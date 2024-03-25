const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

/**
 * 
 * Generate text-based response
 * 
 * @param {String} prompt The input for generate response
 * @param {JSON} chatHistory Chat history to provide context for the response
 * @returns result of response
 */

async function generativeAITextOnly(prompt, chatHistory) {

    // For text-only input, use the gemini-pro model
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const chat = model.startChat({ history: chatHistory });

        const result = await chat.sendMessage(prompt)
        const response = await result.response;
        if (response.blocked && response.safetyReason) {
            console.error(`[GoogleGenerativeAI Safety Error]: ${response.safetyReason}`);
        }

        return response.text();
    } catch (err) {
        console.error('An error occurred in generativeAITextOnly:', err);
        return undefined;
    }
}


module.exports = { generativeAITextOnly }