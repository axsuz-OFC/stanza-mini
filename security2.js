import { cmd } from '../command.js';

// Antidelete & Antispam (Basic enable/disable)
cmd({ pattern: "antidelete", desc: "Enable/Disable antidelete", category: "owner" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const status = args[0] === "on" ? "Enabled ✅" : "Disabled ❌";
        await reply(`🛡️ *Anti-Delete ${status}*`);
    } catch (e) { reply("❌ *System Error!*"); }
});

cmd({ pattern: "antispam", desc: "Enable/Disable antispam", category: "owner" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const status = args[0] === "on" ? "Enabled ✅" : "Disabled ❌";
        await reply(`🛡️ *Anti-Spam ${status}*`);
    } catch (e) { reply("❌ *System Error!*"); }
});

// Welcome Message
cmd({ pattern: "welcome", desc: "Set welcome message", category: "group" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(" ");
        if (!text) return reply("❌ Please provide a welcome message.");
        await reply(`✅ *Welcome Message Set:*\n${text}`);
    } catch (e) { reply("❌ *System Error!*"); }
});