import { cmd } from '../command.js';
import axios from 'axios';

cmd({
    pattern: "logo",
    alias: ["genlogo"],
    desc: "Generate a logo using Pollinations AI (Free)",
    category: "ai"
}, async (zanta, mek, m, { from, args, reply }) => {
    const prompt = args.join(" ");
    if (!prompt) return reply("❌ 𝚃𝚢𝚙𝚎 𝙻𝙾𝙶𝙾 𝚍𝚒𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗.\n\n*𝙴𝚇:* `.logo a modern gaming logo with a dragon`");

    try {
        await reply("🎨 *𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝙻𝙾𝙶𝙾...* (𝚃𝚑𝚒𝚜 𝚖𝚊𝚢 𝚝𝚊𝚔𝚎 𝚊 𝚖𝚘𝚖𝚎𝚗𝚝)");

        // Pollinations AI API එක (No API Key needed)
        const encodedPrompt = encodeURIComponent(prompt + " logo design, high quality, professional");
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;

        // Image එක download කරලා buffer එකකට ගන්නවා
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        await zanta.sendMessage(from, {
            image: imageBuffer,
            caption: `🎨 *Logo Generated!*\n\n📝 *Prompt:* ${prompt}`
        }, { quoted: mek });

    } catch (e) {
        console.error("Logo Error:", e.message);
        reply("❌ *System Error!*.");
    }
});