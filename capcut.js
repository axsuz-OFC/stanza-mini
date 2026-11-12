import { cmd } from '../command.js';
import axios from 'axios';

cmd({ pattern: "capcut", alias: ["cc"], desc: "CapCut Video Downloader", category: "download" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const url = args[0];
        if (!url || !url.includes("capcut.com")) return reply("❌ Please provide a valid CapCut link.");
        
        await reply("⏳ Downloading CapCut video...");
        const res = await axios.get(`https://api.nexoracle.com/downloader/capcut?url=${encodeURIComponent(url)}`);
        const videoUrl = res.data?.result?.video;
        
        if (!videoUrl) return reply("❌ *Fetch Failed!* Video not found.");
        
        await zanta.sendMessage(from, { 
            video: { url: videoUrl }, 
            caption: "✅ *CapCut Video Downloaded*" 
        }, { quoted: mek });
    } catch (e) { 
        reply("❌ *Fetch Failed!* API error or invalid link."); 
    }
});