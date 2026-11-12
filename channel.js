import { cmd } from '../command.js';
import config from '../config.js';

cmd({
    pattern: "channel",
    alias: ["ch"],
    desc: "Show bot channel info",
    category: "main"
}, async (zanta, mek, m, { from, reply }) => {
    const channelText = `╭━〔 *CHANNEL INFO* 〕━➢\n` +
        `┃❍ \`📢 𝖭𝖺𝗆𝖾\` : ${config.CHANNEL_NAME}\n` +
        `┃❍ \`🔗 𝖫𝗂𝗇𝗄\` : ${config.CHANNEL_LINK}\n` +
        `┃❍ \`📌 𝖲𝗍𝖺𝗍𝗎𝗌\` : Auto-Followed\n` +
        `╰━━━━━━━━━━━━━━➢\n\n` +
        `👉 Join our channel for updates!`;
    await reply(channelText);
});