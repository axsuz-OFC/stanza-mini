import { cmd } from '../command.js';
import axios from 'axios';

// 1. .news (Sri Lanka News)
cmd({ pattern: "news", alias: ["lkanews"], desc: "Sri Lanka News", category: "tools" }, async (zanta, mek, m, { from, reply }) => {
    try {
        await reply("⏳ Fetching latest news...");
        // නොමිලේ වැඩ කරන API එකක්
        const res = await axios.get('https://api.nexoracle.com/news/lk');
        const news = res.data.result;
        if (!news || news.length === 0) return reply("❌ *Fetch Failed!* No news found.");
        
        let text = `📰 *LATEST SRI LANKA NEWS*\n\n`;
        for (let i = 0; i < 3; i++) {
            text += `📌 *${news[i].title}*\n🔗 ${news[i].url}\n\n`;
        }
        await reply(text);
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});

// 2. .bus (Bus Route - Example)
cmd({ pattern: "bus", desc: "Bus route info", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const route = args.join(" ");
        if (!route) return reply("❌ Please provide a route (Ex: `.bus Colombo Kandy`)");
        
        // මේක දැනට උදාහරණයක් විතරයි. ඇත්තටම වැඩ කරන්න නම් හොඳ API එකක් ඕනේ.
        await reply(`🚌 *Bus Route Info*\n\n📍 Route: ${route}\n\n(Error)`);
    } catch (e) { reply("❌ *System Error!*"); }
});