import { cmd } from '../command.js';
import axios from 'axios';

// 1. .attp (Text to Sticker/Image)
cmd({ pattern: "attp", desc: "Text to image/sticker", category: "fun" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(" ");
        if (!text) return reply("❌ Please provide text.");
        
        await reply("⏳ Creating text art...");
        const url = `https://api.nexoracle.com/sticker/attp?text=${encodeURIComponent(text)}`;
        await zanta.sendMessage(from, { sticker: { url: url } }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});

// 2. .textart (Simple text art)
cmd({ pattern: "textart", desc: "Generate text art", category: "fun" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(" ");
        if (!text) return reply("❌ Please provide text.");
        // මේක නිකන්ම Text විදියට යවනවා
        await reply(`🎨 *Text Art*\n\n✨ ${text} ✨\n\n> Powered by Stanza Mini`);
    } catch (e) { reply("❌ *System Error!*"); }
});