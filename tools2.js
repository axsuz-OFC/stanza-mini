import { cmd } from '../command.js';
import axios from 'axios';

// 1. .wiki (Wikipedia Search)
cmd({ pattern: "wiki", desc: "Search Wikipedia", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const query = args.join(" ");
        if (!query) return reply("❌ Please provide a search term.");
        
        const res = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        if (res.data.type === "disambiguation") return reply("❌ Multiple results found. Please be more specific.");
        
        await reply(`📖 *${res.data.title}*\n\n${res.data.extract}\n\n🔗 ${res.data.content_urls.desktop.page}`);
    } catch (e) { reply("❌ *Fetch Failed!* Article not found."); }
});

// 2. .carbon (Code to Image)
cmd({ pattern: "carbon", desc: "Convert code to image", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const code = args.join(" ");
        if (!code) return reply("❌ Please provide some code.");
        
        const url = `https://carbonara.solopov.dev/api/cook?code=${encodeURIComponent(code)}`;
        await zanta.sendMessage(from, { image: { url: url }, caption: "✅ Code Image" }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});

// 3. .fakeinfo (Fake Details Generator)
cmd({ pattern: "fakeinfo", alias: ["fake"], desc: "Generate fake info", category: "tools" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://randomuser.me/api/');
        const user = res.data.results[0];
        await reply(`👤 *Name:* ${user.name.first} ${user.name.last}\n📧 *Email:* ${user.email}\n📱 *Phone:* ${user.phone}\n🏠 *Address:* ${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.country}`);
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});