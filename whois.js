import { cmd } from '../command.js';
import axios from 'axios';

cmd({ pattern: "whois", desc: "Domain lookup", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const domain = args[0];
        if (!domain) return reply("❌ Please provide a domain (Ex: `.whois google.com`)");
        
        await reply("🔍 Searching domain info...");
        
        // නොමිලේ වැඩ කරන API එකක්
        const res = await axios.get(`https://api.nexoracle.com/tools/whois?domain=${domain}`);
        const data = res.data.result;
        
        if (!data) return reply("❌ *Fetch Failed!* Domain not found.");
        
        await reply(`🌐 *WHOIS INFO*\n\n` +
            `🔗 *Domain:* ${data.domain}\n` +
            `🏢 *Registrar:* ${data.registrar || "N/A"}\n` +
            `📅 *Created:* ${data.creation_date || "N/A"}\n` +
            `📅 *Expires:* ${data.expiration_date || "N/A"}\n` +
            `📍 *Country:* ${data.country || "N/A"}`);
            
    } catch (e) { 
        console.error(e);
        reply("❌ *Fetch Failed!* Could not retrieve domain info."); 
    }
});