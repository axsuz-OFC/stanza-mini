import { cmd } from '../command.js';
import axios from 'axios';

cmd({ pattern: "imagine", alias: ["img"], desc: "Generate Image", category: "ai" }, async (zanta, mek, m, { from, args, reply }) => {
    const prompt = args.join(" ");
    if (!prompt) return reply("❌ Type discription.");
    try {
        await reply("🎨 Creating...");
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true`;
        const res = await axios.get(url, { responseType: 'arraybuffer' });
        await zanta.sendMessage(from, { image: Buffer.from(res.data), caption: `🎨 *Prompt:* ${prompt}` }, { quoted: mek });
    } catch (e) { reply("❌ System Error."); }
});