import { cmd } from '../command.js';
import config from '../config.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cmd({
    pattern: "owner",
    desc: "Show bot owner details",
    category: "main"
}, async (zanta, mek, m, { from, reply }) => {
    
    const ownerText = `╭━━━〔 *${config.BOT_NAME}* 〕━━━➢\n` +
        `┃\n` +
        `┃ 👑 *ʙᴏᴛ ᴏᴡɴᴇʀ ɪɴғᴏ*\n` +
        `┃\n` +
        `┃ 📱 *ɴᴜᴍʙᴇʀ:* ${config.OWNER_NUMBER}\n` +
        `┃ 🌐 *ᴄʜᴀɴɴᴇʟ:* ${config.CHANNEL_NAME}\n` +
        `┃\n` +
        `┃ © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ${config.BOT_NAME}\n` +
        `╰━━━━━━━━━━━━━➢`;

    // පින්තූරය තියෙනවද බලනවා
    const imagePath = path.join(__dirname, '../owner.jpg');
    
    if (fs.existsSync(imagePath)) {
        await zanta.sendMessage(from, { 
            image: fs.readFileSync(imagePath), 
            caption: ownerText 
        }, { quoted: mek });
    } else {
        await reply(ownerText);
    }
});