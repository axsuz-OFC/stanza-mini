import { cmd } from '../command.js';
import axios from 'axios';
import FormData from 'form-data';
import { downloadContentFromMessage } from '@whiskeysockets/baileys';

// 1. .enhance (Image HD කරන්න)
cmd({ pattern: "enhance", alias: ["hd"], desc: "Enhance image quality", category: "ai" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const quoted = mek.message.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted || !quoted.imageMessage) return reply("❌ Please reply to an image with `.enhance`.");
        
        await reply("⏳ Enhancing image quality...");
        const stream = await downloadContentFromMessage(quoted.imageMessage, 'image');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

        const form = new FormData();
        form.append('image', buffer, { filename: 'image.jpg' });

        const res = await axios.post('https://api.nexoracle.com/image/enhance', form, { headers: form.getHeaders() });
        
        if (!res.data.result) return reply("❌ *Fetch Failed!* Could not enhance image.");
        await zanta.sendMessage(from, { image: { url: res.data.result }, caption: "✅ Enhanced Image" }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});

// 2. .removebg (Background එක අයින් කරන්න)
cmd({ pattern: "removebg", alias: ["rbg"], desc: "Remove image background", category: "ai" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const quoted = mek.message.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted || !quoted.imageMessage) return reply("❌ Please reply to an image with `.removebg`.");
        
        await reply("⏳ Removing background...");
        const stream = await downloadContentFromMessage(quoted.imageMessage, 'image');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

        const form = new FormData();
        form.append('image_file', buffer, { filename: 'image.jpg' });

        // මේකට API Key එකක් ඕනේ (remove.bg). නැත්නම් නොමිලේ වැඩ කරන වෙන API එකක් පාවිච්චි කරන්න.
        const res = await axios.post('https://api.nexoracle.com/image/removebg', form, { headers: form.getHeaders() });
        
        if (!res.data.result) return reply("❌ *Fetch Failed!* Could not remove background.");
        await zanta.sendMessage(from, { image: { url: res.data.result }, caption: "✅ Background Removed" }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});