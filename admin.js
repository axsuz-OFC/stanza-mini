import { cmd } from '../command.js';
import config from '../config.js';

// 1. .restart (Bot Restart)
cmd({ pattern: "restart", desc: "Restart the bot", category: "owner" }, async (zanta, mek, m, { from, reply }) => {
    try {
        await reply("🔄 *Restarting Bot...*");
        process.exit(0); // PM2 හෝ Termux එකෙන් ආයේ auto start වෙයි
    } catch (e) { reply("❌ *System Error!*"); }
});

// 2. .shutdown (Bot Off)
cmd({ pattern: "shutdown", desc: "Shutdown the bot", category: "owner" }, async (zanta, mek, m, { from, reply }) => {
    try {
        await reply("🛑 *Bot is shutting down...*");
        process.exit(1);
    } catch (e) { reply("❌ *System Error!*"); }
});

// 3. .broadcast (Send msg to all chats/groups)
cmd({ pattern: "broadcast", desc: "Broadcast message", category: "owner" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(" ");
        if (!text) return reply("❌ Please provide a message to broadcast.");
        
        await reply("⏳ Broadcasting...");
        // මෙතනදී අපි ඔයාගේ chats වලට msg එක යවනවා (මේක සරලව හදලා තියෙන්නේ)
        const chats = Object.keys(await zanta.groupFetchAllParticipating());
        let count = 0;
        for (const id of chats) {
            await zanta.sendMessage(id, { text: `📢 *BROADCAST*\n\n${text}` });
            count++;
        }
        await reply(`✅ Broadcast sent to ${count} groups.`);
    } catch (e) { reply("❌ *System Error!*"); }
});