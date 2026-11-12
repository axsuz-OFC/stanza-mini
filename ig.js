import { cmd } from '../command.js';
import axios from 'axios';

cmd({ pattern: "ig", alias: ["instagram"], desc: "IG Downloader", category: "download" }, async (zanta, mek, m, { from, args, reply }) => {
    const url = args[0];
    if (!url || !url.includes("instagram.com")) return reply("❌ Please type a vaild IG LINK.");
    try {
        await reply("⏳ Downloading...");
        const res = await axios.get(`https://api.nexoracle.com/downloader/igdl?url=${encodeURIComponent(url)}`);
        const mediaUrl = res.data?.result?.[0]?.url;
        if (!mediaUrl) return reply("❌ Couldnt Find Media.");
        await zanta.sendMessage(from, { video: { url: mediaUrl }, caption: "✅ IG Video" }, { quoted: mek });
    } catch (e) { reply("❌ IG Download Faild."); }
});