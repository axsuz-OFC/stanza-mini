import { cmd } from '../command.js';
import axios from 'axios';

cmd({ pattern: "snackvideo", alias: ["snack"], desc: "Snack Video Downloader", category: "download" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const url = args[0];
        if (!url || !url.includes("snackvideo.com")) return reply("❌ Please provide a valid Snack Video link.");
        
        await reply("⏳ Downloading Snack Video...");
        const res = await axios.get(`https://api.nexoracle.com/downloader/snackvideo?url=${encodeURIComponent(url)}`);
        const videoUrl = res.data?.result?.video;
        
        if (!videoUrl) return reply("❌ *Fetch Failed!* Video not found.");
        
        await zanta.sendMessage(from, { 
            video: { url: videoUrl }, 
            caption: "✅ *Snack Video Downloaded*" 
        }, { quoted: mek });
    } catch (e) { 
        reply("❌ *Fetch Failed!* API error or invalid link."); 
    }
});