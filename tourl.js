import { cmd } from '../command.js';
import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import axios from 'axios';
import FormData from 'form-data';

cmd({ pattern: "tourl", desc: "Image to URL", category: "tools" }, async (zanta, mek, m, { from, reply }) => {
    const quoted = mek.message.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted || !quoted.imageMessage) return reply("❌ Please reply to a picture & type .tourl.");
    try {
        await reply("⏳ Uploading...");
        const stream = await downloadContentFromMessage(quoted.imageMessage, 'image');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
        
        const form = new FormData();
        form.append('file', buffer, { filename: 'image.jpg' });
        const res = await axios.post('https://telegra.ph/upload', form, { headers: form.getHeaders() });
        await reply(`✅ *URL:* https://telegra.ph${res.data[0].src}`);
    } catch (e) { reply("❌ Couldn't Upload."); }
});