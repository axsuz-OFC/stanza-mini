import { cmd } from '../command.js';
import { downloadContentFromMessage } from '@whiskeysockets/baileys';

cmd({
    pattern: "vv",
    desc: "Save View Once messages",
    category: "tools"
}, async (zanta, mek, m, { from, reply }) => {
    const quotedMsg = mek.message.extendedTextMessage?.contextInfo?.quotedMessage;
    
    if (!quotedMsg) {
        return reply("❌ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊 ' 𝚅𝚒𝚎𝚠 𝙾𝚗𝚌𝚎  '𝚒𝚖𝚊𝚐𝚎 𝚘𝚛 𝚟𝚒𝚍𝚎𝚘 𝚊𝚗𝚍 𝚝𝚢𝚙𝚎  `.vv` .");
    }

    const type = Object.keys(quotedMsg)[0];
    
    if (type === "imageMessage" || type === "videoMessage" || type === "audioMessage") {
        try {
            const msg = quotedMsg[type];
            const stream = await downloadContentFromMessage(msg, type.replace('Message', ''));
            
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            if (type === "imageMessage") {
                await zanta.sendMessage(from, { image: buffer, caption: msg.caption || "" }, { quoted: mek });
            } else if (type === "videoMessage") {
                await zanta.sendMessage(from, { video: buffer, caption: msg.caption || "" }, { quoted: mek });
            } else if (type === "audioMessage") {
                await zanta.sendMessage(from, { audio: buffer, mimetype: 'audio/mp4', ptt: true }, { quoted: mek });
            }
        } catch (e) {
            console.error(e);
            reply("❌ මැසේජ් එක Save කරගන්න බැරි වුනා.");
        }
    } else {
        reply("❌ මේක View Once මැසේජ් එකක් නෙවෙයි.");
    }
});
