import { cmd } from '../command.js';
import config from '../config.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../database.json');

const getStatus = (val) => val ? '✅ ON' : '❌ OFF';

cmd({
    pattern: "setting",
    alias: ["settings"],
    desc: "Show bot settings dashboard",
    category: "main"
}, async (zanta, mek, m, { from, reply }) => {
    
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const settingText = `⚡ *${db.botName || config.BOT_NAME} PREMIUM DASHBOARD* ⚡\n\n` +
        `*—「 BASIC CONFIGS 」—*\n\n` +
        `01. 🤖 *Bot Name:* ${db.botName || config.BOT_NAME}\n` +
        `02. 👤 *Owner Name:* ${db.ownerName || 'Owner'}\n` +
        `03. 🎮 *Bot Prefix:* [ ${db.prefix} ]\n` +
        `04. 🔐 *Work Mode:* ${db.workMode}\n` +
        `05. 🔑 *Web Password:* Set ✅\n` +
        `06. 🖼️ *Bot Image:* Updated ✅\n\n` +
        `*—「 BOT SETTINGS 」—*\n\n` +
        `07. 🚀 *Always Online:* 『 ${getStatus(db.alwaysOnline)} 』\n` +
        `08. 📩 *Auto Read:* 『 ${getStatus(db.autoRead)} 』\n` +
        `09. ⌨️ *Auto Typing:* 『 ${getStatus(db.autoTyping)} 』\n` +
        `10. 👁️ *Status Seen:* 『 ${getStatus(db.statusSeen)} 』\n` +
        `11. ❤️ *Status React:* 『 ${getStatus(db.statusReact)} 』\n` +
        `12. 📑 *Read Cmd:* 『 ${getStatus(db.readCmd)} 』\n` +
        `13. 🎙️ *Recording Voice:* 『 ${getStatus(db.recordingVoice)} 』\n` +
        `14. 🤖 *Auto Reply:* 『 ${getStatus(db.autoReply)} 』\n` +
        `15. 🔔 *Connect Msg:* 『 ${getStatus(db.connectMsg)} 』\n` +
        `16. 🔘 *Buttons:* 『 ${getStatus(db.buttons)} 』\n` +
        `17. 🎵 *Voice Reply:* 『 ${getStatus(db.voiceReply)} 』\n` +
        `18. 🛡️ *Anti-Delete:* 『 ${getStatus(db.antiDelete)} 』\n` +
        `19. 📝 *Anti-Edit:* 『 ${db.antiEdit} 』\n` +
        `20. ⚡ *Auto React:* 『 ${getStatus(db.autoReact)} 』\n` +
        `21. 🛡️ *Group Security:* 『 ${getStatus(db.groupSecurity)} 』\n` +
        `22. 📞 *Anti-Call:* 『 ${getStatus(db.antiCall)} 』\n\n` +
        `*–––––––––––––––––––––––––*\n` +
        `*💡 EDIT SETTINGS:* \n` +
        `Reply with number + value.\n` +
        `Ex: *.set 16 off*\n\n` +
        `*–––––––––––––––––––––––––*\n` +
        `> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜱᴛᴀɴᴢᴀ_ᴍɪɴɪ </>`;

    const imgPath = path.join(__dirname, '../stanza.jpg');
    
    if (fs.existsSync(imgPath)) {
        await zanta.sendMessage(from, { image: fs.readFileSync(imgPath), caption: settingText }, { quoted: mek });
    } else {
        await reply(settingText);
    }
});