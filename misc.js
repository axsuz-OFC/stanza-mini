import { cmd } from '../command.js';

// 1. .ping (Bot Speed)
cmd({ pattern: "ping", desc: "Check bot speed", category: "main" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const start = Date.now();
        const msg = await reply("*ᴘɪɴɢɪɴɢ...*");
        const end = Date.now();
        await zanta.sendMessage(from, { text: `🏓 *ᴘᴏɴɢ!*\n\n📡 *sᴘᴇᴇᴅ:* ${end - start} ms`, edit: msg.key });
    } catch (e) { reply("❌ *System Error!*"); }
});

// 2. .uptime
cmd({ pattern: "uptime", desc: "Bot uptime", category: "main" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const uptime = process.uptime();
        const minutes = Math.floor(uptime / 60);
        const seconds = Math.floor(uptime % 60);
        await reply(`⏱ *Bot Uptime:* ${minutes}m ${seconds}s`);
    } catch (e) { reply("❌ *System Error!*"); }
});