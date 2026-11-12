import { cmd } from '../command.js';

cmd({
    pattern: "jid",
    desc: "Get JID of a user or group",
    category: "tools"
}, async (zanta, mek, m, { from, reply }) => {
    const isGroup = from.endsWith('@g.us');
    const sender = mek.key.participant || mek.key.remoteJid;
    
    // රිප්ලයි කරපු මැසේජ් එකක් තියෙනවද බලනවා
    const quotedMsg = mek.message.extendedTextMessage?.contextInfo;
    
    let text = `╭━━━〔 *JID FINDER* 〕━━━➢\n┃\n`;
    
    if (quotedMsg && quotedMsg.participant) {
        text += `┃ 👤 *ǫᴜᴏᴛᴇᴅ ᴜsᴇʀ:* \n┃ \`\`\`${quotedMsg.participant}\`\`\`\n┃\n`;
    }
    
    text += `┃ 💬 *ᴄᴜʀʀᴇɴᴛ ᴄʜᴀᴛ:* \n┃ \`\`\`${from}\`\`\`\n┃\n`;
    
    if (isGroup) {
        text += `┃ 👤 *ʏᴏᴜʀ ᴊɪᴅ:* \n┃ \`\`\`${sender}\`\`\`\n┃\n`;
    }
    
    text += `╰━━━━━━━━━━━━━➢`;
    await reply(text);
});