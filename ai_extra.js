import { cmd } from '../command.js';
import axios from 'axios';
import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import FormData from 'form-data';

// 1. .anime (Random Anime Image)
cmd({ pattern: "anime", desc: "Random anime image", category: "ai" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://api.waifu.pics/sfw/waifu');
        await zanta.sendMessage(from, { image: { url: res.data.url }, caption: "✨ *Random Anime*" }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});

// 2. .removebg
cmd({ pattern: "removebg", alias: ["rbg"], desc: "Remove image background", category: "ai" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const quoted = mek.message.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted || !quoted.imageMessage) return reply("❌ Reply to an image with `.removebg`.");
        
        await reply("⏳ Removing background...");
        const stream = await downloadContentFromMessage(quoted.imageMessage, 'image');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

        const form = new FormData();
        form.append('image_file', buffer, { filename: 'image.jpg' });

        const res = await axios.post('https://api.remove.bg/v1.0/removebg', form, {
            headers: { ...form.getHeaders(), 'X-Api-Key': 'YOUR_REMOVEBG_API_KEY' }, // ඔයාගේ API Key එක මෙතන දාන්න
            responseType: 'arraybuffer'
        });

        await zanta.sendMessage(from, { image: res.data, caption: "✅ Background Removed" }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!* API Key or network issue."); }
});