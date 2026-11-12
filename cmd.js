import { cmd } from '../command.js';
import config from '../config.js';
import { commands } from '../command.js';

cmd({
    pattern: "cmd",
    alias: ["cmds", "commands"],
    desc: "List all available commands",
    category: "main"
}, async (zanta, mek, m, { from, reply }) => {
    
    let text = `╭━━━〔 *${config.BOT_NAME} - ALL CMD* 〕━━━➢\n`;
    
    // Categories වලට group කරනවා
    const categories = {};
    commands.forEach((c) => {
        if (!c.dontAddCommandList && c.pattern) {
            if (!categories[c.category]) categories[c.category] = [];
            categories[c.category].push(c.pattern);
        }
    });

    for (const [cat, cmds] of Object.entries(categories)) {
        text += `┃\n┃ 📂 *${cat.toUpperCase()}*\n`;
        cmds.forEach((c) => {
            text += `┃ ◈ ${config.PREFIX}${c}\n`;
        });
    }

    text += `┃\n┃ © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ${config.BOT_NAME}\n`;
    text += `╰━━━━━━━━━━━━━➢`;

    await reply(text);
});