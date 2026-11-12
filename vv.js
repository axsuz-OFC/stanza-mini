import { cmd } from '../command.js';
import { downloadContentFromMessage } from '@whiskeysockets/baileys';

cmd({ pattern: "vv", desc: "Save View Once", category: "tools" }, async (zanta, mek, m, { from, reply }) => {
    const quoted = mek.message.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted) return reply("❌ Reply to a ViewOnce massage .");
    const type = Object.keys(quoted)[0];
    if (type === "imageMessage" || type === "videoMessage") {
        try {
            const stream = await downloadContentFromMessage(quoted[type], type.replace('Message', ''));
            let buffer = Buffer.from([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
            if (type === "imageMessage") await zanta.sendMessage(from, { image: buffer, caption: quoted[type].caption || "" }, { quoted: mek });
            else await zanta.sendMessage(from, { video: buffer, caption: quoted[type].caption || "" }, { quoted: mek });
        } catch (e) { reply("❌ Error!"); }
    } else { reply("❌ This isn't a vv."); }
});