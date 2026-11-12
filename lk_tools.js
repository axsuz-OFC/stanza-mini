import { cmd } from '../command.js';
import axios from 'axios';

// 1. .currency (LKR to USD)
cmd({ pattern: "currency", desc: "Convert LKR to USD", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const amount = parseFloat(args[0]);
        if (!amount) return reply("❌ Please provide an amount. (Ex: `.currency 1000`)");
        
        const res = await axios.get('https://api.exchangerate-api.com/v4/latest/LKR');
        const rate = res.data.rates.USD;
        const converted = (amount * rate).toFixed(2);
        
        await reply(`💵 *Currency Conversion*\n\n🇱🇰 LKR: ${amount}\n🇺🇸 USD: $${converted}\n\n📈 *Rate:* 1 LKR = ${rate} USD`);
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});