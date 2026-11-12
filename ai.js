import { cmd } from '../command.js';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY,
});

cmd({
    pattern: "ai",
    alias: ["chat", "deepseek"],
    desc: "Chat with DeepSeek AI",
    category: "ai"
}, async (zanta, mek, m, { from, args, reply }) => {
    const prompt = args.join(" ");
    if (!prompt) return reply("❌ 𝚃𝚢𝚙𝚎 𝚢𝚘𝚞𝚛 𝚙𝚛𝚘𝚋𝚕𝚎𝚖.\n\n*𝙴𝚇:* `.ai ලංකාවේ අගනුවර මොකක්ද?`");

    try {
        await reply("🤔 *𝚃𝚑𝚒𝚗𝚔𝚒𝚗𝚐...*");

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "deepseek-chat", // DeepSeek model එක
        });

        const aiReply = completion.choices[0].message.content;
        await reply(aiReply);

    } catch (e) {
        console.error("AI Error:", e.message);
        reply("❌ *AI Error!*.");
    }
});