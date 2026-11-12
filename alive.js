import { cmd } from '../command.js';
import config from '../config.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cmd({
    pattern: "alive",
    desc: "Check bot status",
    category: "main"
}, async (zanta, mek, m, { from, reply }) => {
    
    // දැන් වෙලාව සහ දිනය ගන්නවා
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB'); // DD/MM/YYYY
    const timeStr = now.toLocaleTimeString('en-GB'); // HH:MM:SS

    const aliveText = `╭━━━〔 ꜱᴛᴀɴᴢᴀ_ᴍɪɴɪ 〕━━━╮\n\n` +
        `*╭────────────➣*\n` +
        `*┃Hey...I’m ꜱᴛᴀɴᴢᴀ_ᴍɪɴɪ🙈💗*\n` +
        `*┃ɪ'ᴍ ʀᴇᴀᴅʏ ᴛᴏ ʜᴇʟᴘ ʏᴏᴜ!*\n` +
        `*╰──────────────➣*\n\n` +
        `*╭──〔 𝐒𝐲𝐬𝐭𝐞𝐦 𝐈𝐧𝐟𝐨 〕──➣*\n` +
        `*┃🗓 \`𝖣𝖺𝗍𝖾\` :* ${dateStr}\n` +
        `*┃⌚ \`𝖳𝗂𝗆𝖾\` :* ${timeStr}\n` +
        `*┃⚙ \`𝖵𝖾𝗋𝗌𝗂𝗈𝗇\` :* 1.0.2\n` +
        `*┃💬 \`𝖯𝗋𝖾𝖿𝗂𝗑\` :* ${config.PREFIX}\n` +
        `*╰──────────────➣*\n\n` +
        `*╭──〔 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 𝐔𝐬 〕──➣*\n` +
        `*┃👤 \`𝖮𝗐𝗇𝖾𝗋\` :* Stanza\n` +
        `*┃📞 \`𝖭𝗎𝗆𝖻𝖾𝗋\` :* ${config.OWNER_NUMBER}\n` +
        `*┃🌐 \`𝖶𝖾𝖻\` :* https://stanza-mini.co\n` +
        `*╰──────────────➣*\n\n` +
        `🔻 ꜱᴇʟᴇᴄᴛ ᴄᴀᴛᴇɢᴏʀʏ ʙᴇʟʟᴏᴡ\n` +
        `© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜱᴛᴀɴᴢᴀ_ᴍɪɴɪ </>`;

    // අලුත් පින්තූරය (alive.jpg) තියෙනවද බලනවා
    const imgPath = path.join(__dirname, '../alive.jpg');
    
    // කලින් හදපු බොත්තම් (Buttons) මෙතන තියෙනවා
    const buttons = [
        { buttonId: 'ping', buttonText: { displayText: '⚡ PING' }, type: 1 },
        { buttonId: 'menu', buttonText: { displayText: '📋 MAIN MENU' }, type: 1 },
        { buttonId: 'setting', buttonText: { displayText: '⚙️ SETTINGS' }, type: 1 },
        { buttonId: 'help', buttonText: { displayText: '📞 HELP' }, type: 1 }
    ];

    try {
        if (fs.existsSync(imgPath)) {
            // පින්තූරය තියෙනවා නම් පින්තූරයත් එක්කම බොත්තම් යවනවා
            await zanta.sendMessage(from, {
                image: fs.readFileSync(imgPath),
                caption: aliveText,
                footer: 'ꜱᴛᴀɴᴢᴀ_ᴍɪɴɪ',
                buttons: buttons,
                headerType: 4
            }, { quoted: mek });
        } else {
            // පින්තූරය නැත්නම් සාමාන්‍ය විදියට බොත්තම් යවනවා
            await zanta.sendMessage(from, {
                text: aliveText,
                footer: 'ꜱᴛᴀɴᴢᴀ_ᴍɪɴɪ',
                buttons: buttons,
                headerType: 1
            }, { quoted: mek });
        }
    } catch (e) {
        console.error("Alive Error: ", e);
        // බොත්තම් යවද්දි අවුලක් ආවොත් සාමාන්‍ය text එක විතරක් යවනවා
        await zanta.sendMessage(from, { text: aliveText }, { quoted: mek });
    }
});