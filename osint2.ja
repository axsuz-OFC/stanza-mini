import { cmd } from '../command.js';
import axios from 'axios';

// Whois Lookup
cmd({ pattern: "whois", desc: "Domain lookup", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const domain = args[0];
        if (!domain) return reply("❌ Please provide a domain (Ex: `.whois google.com`)");
        
        const res = await axios.get(`https://api.nexoracle.com/tools/whois?domain=${domain}`);
        const data = res.data.result;
        
        if (!data) return reply("❌ *Fetch Failed!* Domain not found.");
        await reply(`🌐 *WHOIS INFO*\n\n🔗 *Domain:* ${data.domain}\n🏢 *Registrar:* ${data.registrar}\n📅 *Created:* ${data.creation_date}\n📅 *Expires:* ${data.expiration_date}\n📍 *Country:* ${data.country}`);
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});