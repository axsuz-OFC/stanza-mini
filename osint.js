import { cmd } from '../command.js';
import axios from 'axios';

cmd({ pattern: "githubstalk", alias: ["gh"], desc: "Get GitHub user info", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const username = args[0];
        if (!username) return reply("❌ Please provide a username.");
        
        await reply("🔍 Searching GitHub...");
        const res = await axios.get(`https://api.github.com/users/${username}`);
        const data = res.data;

        await reply(`🐙 *GITHUB STALK*\n\n👤 *Name:* ${data.name || "N/A"}\n🔗 *User:* ${data.login}\n🏢 *Company:* ${data.company || "N/A"}\n📍 *Location:* ${data.location || "N/A"}\n👥 *Followers:* ${data.followers}\n📦 *Public Repos:* ${data.public_repos}\n🔗 *Profile:* ${data.html_url}`);
    } catch (e) { 
        console.error(e);
        reply("❌ *Fetch Failed!* User not found."); 
    }
});

cmd({ pattern: "ip", alias: ["iplookup"], desc: "IP Lookup", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const ip = args[0];
        if (!ip) return reply("❌ Please provide an IP address.");
        
        const res = await axios.get(`http://ip-api.com/json/${ip}`);
        const d = res.data;

        if (d.status === "fail") return reply("❌ Invalid IP address.");
        await reply(`🌐 *IP LOOKUP*\n\n📍 *IP:* ${d.query}\n🌍 *Country:* ${d.country}\n🏙 *City:* ${d.city}\n📡 *ISP:* ${d.isp}\n🕒 *Timezone:* ${d.timezone}`);
    } catch (e) { 
        console.error(e);
        reply("❌ *Fetch Failed!*"); 
    }
});