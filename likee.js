import { cmd } from '../command.js';
import axios from 'axios';

cmd({ pattern: "likee", desc: "Likee Video Downloader", category: "download" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const url = args[0];
        if (!url || !url.includes("likee.video")) return reply("❌ Please provide a valid Likee link.");
        
        await reply("⏳ Downloading Likee video...");
        const res = await axios.get(`https://api.nexoracle.com/downloader/likee?url=${encodeURIComponent(url)}`);
        const videoUrl = res.data?.result?.video;
        
        if (!videoUrl) return reply("❌ *Fetch Failed!* Video not found.");
        
        await zanta.sendMessage(from, { 
            video: { url: videoUrl }, 
            caption: "✅ *Likee Video Downloaded*" 
        }, { quoted: mek });
    } catch (e) { 
        reply("❌ *Fetch Failed!* API error or invalid link."); 
    }
});