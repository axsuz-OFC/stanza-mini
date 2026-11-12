import { cmd } from '../command.js';
import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import axios from 'axios';
import FormData from 'form-data';

cmd({ pattern: "ocr", desc: "Read text from image", category: "ai" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const quoted = mek.message.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted || !quoted.imageMessage) return reply("❌ Reply to an image with `.ocr`.");
        
        await reply("🔍 Reading image...");
        
        const stream = await downloadContentFromMessage(quoted.imageMessage, 'image');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

        const form = new FormData();
        form.append('file', buffer, { filename: 'image.jpg' });

        const res = await axios.post('https://api.ocr.space/parse/image', form, {
            headers: { ...form.getHeaders(), 'apikey': 'K83784810888957' }
        });

        if (res.data.IsErroredOnProcessing) return reply("❌ *System Error!* Text not found.");
        await reply(`📝 *Extracted Text:*\n\n${res.data.ParsedResults[0].ParsedText}`);
    } catch (e) { 
        console.error(e);
        reply("❌ *Fetch Failed!* OCR failed."); 
    }
});