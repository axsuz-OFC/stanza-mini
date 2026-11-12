import { cmd } from '../command.js';
import config from '../config.js';

cmd({ pattern: "owner", desc: "Bot Owner Info", category: "main" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const vcard = 'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'FN:Stanza Owner\n' +
            `TEL;type=CELL;type=VOICE;waid=${config.OWNER_NUMBER}:${config.OWNER_NUMBER}\n` +
            'END:VCARD';
        await zanta.sendMessage(from, { contacts: { displayName: "Owner", contacts: [{ vcard }] } }, { quoted: mek });
    } catch (e) { reply("❌ *System Error!*"); }
});

cmd({ pattern: "script", alias: ["repo"], desc: "Get bot script link", category: "main" }, async (zanta, mek, m, { from, reply }) => {
    try {
        await reply(`📁 *Bot Script:* https://github.com/your-username/stanza-md\n\n*(ඔයාගේ ගිට්හබ් ලින්ක් එක මෙතන දාන්න)*`);
    } catch (e) { reply("❌ *System Error!*"); }
});