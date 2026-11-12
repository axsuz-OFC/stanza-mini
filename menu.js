import { cmd } from '../command.js';
import config from '../config.js';
import { commands } from '../command.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. ප්‍රධාන මෙනු එක (Main Menu)
cmd({
    pattern: "menu",
    alias: ["help", "list"],
    desc: "Show bot commands",
    category: "main"
}, async (zanta, mek, m, { from, reply }) => {
    
    const totalCmds = commands.length;
    const uptime = process.uptime();
    const minutes = Math.floor(uptime / 60);
    const seconds = Math.floor(uptime % 60);

    let menuText = `╭━〔 ꜱᴛᴀɴᴢᴀ_ᴍɪɴɪ 〕━➢\n` +
        `┃❍ \`👑 𝖮𝗐𝗇𝖾𝗋\` : Adithya PRamoD\n` +
        `┃❍ \`⚙️ 𝖬𝗈𝖽𝖾\` : PRIVATE\n` +
        `┃❍ \`🔣 𝖯𝗋𝖾𝖿𝗂𝗑\` : ${config.PREFIX}\n` +
        `┃❍ \`📚 𝖢𝗈𝗆𝗆𝖺𝗇𝖽𝗌\` : ${totalCmds}\n` +
        `╰━━━━━━━━━━━━━━➢\n` +
        `╭━〔 *𝗦𝗬𝗦𝗧𝗘𝗠 𝗦𝗧𝗔𝗧𝗦* 〕━➢\n` +
        `┃❍ \`⏱ 𝖴𝗉𝗍𝗂𝗆𝖾\` : ${minutes}m ${seconds}s\n` +
        `┃❍ \`🚀 𝖫𝖺𝗍𝖾𝗇𝖼𝗒\` : ${Date.now() - mek.messageTimestamp * 1000}ms\n` +
        `┃❍ \`💻 𝖯𝗅𝖺𝗍𝖿𝗈𝗋𝗆\` : AXsUZ\n` +
        `┃❍ \`🤖 𝖵𝖾𝗋𝗌𝗂𝗈𝗇\` : 1.0.2\n` +
        `╰━━━━━━━━━━━━━━➢\n\n` +
        `🔻ꜱᴇʟᴇᴄᴛ ᴄᴀᴛᴇɢᴏʀʏ ʙᴇʟʟᴏᴡ\n` +
        `© ꜱᴛᴀɴᴢᴀ_ᴍɪɴɪ`;

    const buttons = [
        { buttonId: 'menu_download', buttonText: { displayText: '📥 DOWNLOAD' }, type: 1 },
        { buttonId: 'menu_media', buttonText: { displayText: '🎨 MEDIA' }, type: 1 },
        { buttonId: 'menu_tools', buttonText: { displayText: '🛠️ TOOLS' }, type: 1 },
        { buttonId: 'menu_group', buttonText: { displayText: '👥 GROUP' }, type: 1 }
    ];

    const imgPath = path.join(__dirname, '../stanza.jpg');
    
    try {
        if (fs.existsSync(imgPath)) {
            await zanta.sendMessage(from, {
                image: fs.readFileSync(imgPath),
                caption: menuText,
                footer: 'ꜱᴛᴀɴᴢᴀ_ᴍɪɴɪ',
                buttons: buttons,
                headerType: 4
            }, { quoted: mek });
        } else {
            await zanta.sendMessage(from, {
                text: menuText,
                footer: 'ꜱᴛᴀɴᴢᴀ_ᴍɪɴɪ',
                buttons: buttons,
                headerType: 1
            }, { quoted: mek });
        }
    } catch (e) {
        await reply(menuText);
    }
});

// 2. DOWNLOAD බොත්තම එබුවම
cmd({ pattern: "menu_download", dontAddCommandList: true }, async (zanta, mek, m, { from }) => {
    let text = `╭━〔 *📥 DOWNLOAD MENU* 〕━➢\n`;
    commands.forEach((c) => {
        if (c.category === 'download' && c.pattern) text += `┃❍ ${config.PREFIX}${c.pattern}\n`;
    });
    text += `╰━━━━━━━━━━━━━━➢`;
    await zanta.sendMessage(from, { text: text }, { quoted: mek });
});

// 3. MEDIA (AI) බොත්තම එබුවම
cmd({ pattern: "menu_media", dontAddCommandList: true }, async (zanta, mek, m, { from }) => {
    let text = `╭━〔 *🎨 MEDIA & AI* 〕━➢\n`;
    commands.forEach((c) => {
        if ((c.category === 'ai' || c.category === 'fun') && c.pattern) text += `┃❍ ${config.PREFIX}${c.pattern}\n`;
    });
    text += `╰━━━━━━━━━━━━━━➢`;
    await zanta.sendMessage(from, { text: text }, { quoted: mek });
});

// 4. TOOLS බොත්තම එබුවම
cmd({ pattern: "menu_tools", dontAddCommandList: true }, async (zanta, mek, m, { from }) => {
    let text = `╭━〔 *🛠️ TOOLS MENU* 〕━➢\n`;
    commands.forEach((c) => {
        if (c.category === 'tools' && c.pattern) text += `┃❍ ${config.PREFIX}${c.pattern}\n`;
    });
    text += `╰━━━━━━━━━━━━━━➢`;
    await zanta.sendMessage(from, { text: text }, { quoted: mek });
});

// 5. GROUP බොත්තම එබුවම
cmd({ pattern: "menu_group", dontAddCommandList: true }, async (zanta, mek, m, { from }) => {
    let text = `╭━〔 *👥 GROUP MENU* 〕━➢\n`;
    commands.forEach((c) => {
        if (c.category === 'group' && c.pattern) text += `┃❍ ${config.PREFIX}${c.pattern}\n`;
    });
    text += `╰━━━━━━━━━━━━━━➢`;
    await zanta.sendMessage(from, { text: text }, { quoted: mek });
});