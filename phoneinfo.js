import { cmd } from '../command.js';
import axios from 'axios';

cmd({ pattern: "phoneinfo", desc: "Phone number lookup", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const number = args[0];
        if (!number) return reply("❌ Please provide a phone number with country code (Ex: 94704536039).");
        
        const res = await axios.get(`https://api.nexoracle.com/tools/phoneinfo?number=${number}`);
        const data = res.data.result;
        if (!data) return reply("❌ *Fetch Failed!* Invalid number.");
        
        await reply(`📱 *Phone Info*\n\n🔢 *Number:* ${data.number}\n🌍 *Country:* ${data.country}\n📡 *Carrier:* ${data.carrier}\n📍 *Location:* ${data.location}`);
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});