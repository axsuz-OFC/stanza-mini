import { cmd } from '../command.js';

cmd({ pattern: "spoiler", desc: "Hide text with spoiler", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(" ");
        if (!text) return reply("❌ Please provide text to hide.");
        
        // WhatsApp Spoiler format එක වෙන්නේ || මේක ඇතුලේ තියෙන එක ||
        await reply(`||${text}||`);
    } catch (e) { 
        reply("❌ *System Error!*"); 
    }
});