import { cmd } from '../command.js';
import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import axios from 'axios';
import FormData from 'form-data';

// 1. .blur (පින්තූරය බ්ලර් කරන්න)
cmd({ pattern: "blur", desc: "Blur an image", category: "tools" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const quoted = mek.message.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted || !quoted.imageMessage) return reply("❌ Reply to an image with `.blur`.");
        
        await reply("⏳ Blurring image...");
        const stream = await downloadContentFromMessage(quoted.imageMessage, 'image');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

        const form = new FormData();
        form.append('image', buffer, { filename: 'image.jpg' });
        
        const res = await axios.post('https://api.nexoracle.com/image/blur', form, { headers: form.getHeaders() });
        
        if (!res.data.result) return reply("❌ *Fetch Failed!* API did not return an image.");
        await zanta.sendMessage(from, { image: { url: res.data.result }, caption: "✅ Blurred" }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});

// 2. .invert (වර්ණ වෙනස් කරන්න)
cmd({ pattern: "invert", desc: "Invert image colors", category: "tools" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const quoted = mek.message.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted || !quoted.imageMessage) return reply("❌ Reply to an image with `.invert`.");
        
        await reply("⏳ Processing...");
        const stream = await downloadContentFromMessage(quoted.imageMessage, 'image');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

        const form = new FormData();
        form.append('image', buffer, { filename: 'image.jpg' });
        
        const res = await axios.post('https://api.nexoracle.com/image/invert', form, { headers: form.getHeaders() });
        
        if (!res.data.result) return reply("❌ *Fetch Failed!* API did not return an image.");
        await zanta.sendMessage(from, { image: { url: res.data.result }, caption: "✅ Inverted" }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});