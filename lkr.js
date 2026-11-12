import { cmd } from '../command.js';
import axios from 'axios';

cmd({ pattern: "currency", alias: ["lkr"], desc: "Convert LKR to other currencies", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const amount = parseFloat(args[0]);
        const target = (args[1] || "USD").toUpperCase();
        if (!amount) return reply("❌ Usage: `.currency 1000 USD`");
        
        const res = await axios.get('https://api.exchangerate-api.com/v4/latest/LKR');
        const rate = res.data.rates[target];
        
        if (!rate) return reply("❌ Invalid currency code.");
        
        const converted = (amount * rate).toFixed(2);
        await reply(`💵 *Currency Conversion*\n\n🇱🇰 LKR: ${amount}\n🌍 ${target}: ${converted}\n\n📈 *Rate:* 1 LKR = ${rate} ${target}`);
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});