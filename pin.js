import { cmd } from '../command.js';
import axios from 'axios';

cmd({ pattern: "pin", alias: ["pinterest"], desc: "Pinterest Downloader", category: "download" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const url = args[0];
        if (!url || !url.includes("pinterest.com")) return reply("❌ Please provide a valid Pinterest link.");
        
        await reply("⏳ Downloading...");
        const res = await axios.get(`https://api.nexoracle.com/downloader/pinterest?url=${encodeURIComponent(url)}`);
        const mediaUrl = res.data?.result?.url;
        
        if (!mediaUrl) return reply("❌ *Fetch Failed!*");
        await zanta.sendMessage(from, { video: { url: mediaUrl }, caption: "✅ Pinterest Video" }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});