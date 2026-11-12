import { cmd } from '../command.js';

cmd({ pattern: "emoji", desc: "Convert emoji to sticker", category: "fun" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const emoji = args[0];
        if (!emoji) return reply("❌ Please provide an emoji (Ex: `.emoji 😂`)");
        
        const url = `https://api.nexoracle.com/sticker/emoji?emoji=${encodeURIComponent(emoji)}`;
        await zanta.sendMessage(from, { sticker: { url: url } }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});