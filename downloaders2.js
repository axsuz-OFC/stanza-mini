import { cmd } from '../command.js';
import axios from 'axios';

// 1. TikTok Downloader (No Watermark)
cmd({ pattern: "tiktok", alias: ["tt2"], desc: "TikTok Video Downloader", category: "download" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const url = args[0];
        if (!url || !url.includes("tiktok.com")) return reply("❌ Please provide a valid TikTok link.");
        
        await reply("⏳ Downloading...");
        const res = await axios.get(`https://api.nexoracle.com/downloader/tiktok?url=${encodeURIComponent(url)}`);
        const videoUrl = res.data?.result?.video;
        
        if (!videoUrl) return reply("❌ *Fetch Failed!* Video not found.");
        await zanta.sendMessage(from, { video: { url: videoUrl }, caption: "✅ TikTok Video" }, { quoted: mek });
    } catch (e) { 
        console.error(e);
        reply("❌ *Fetch Failed!* TikTok download failed."); 
    }
});

// 2. Twitter Downloader
cmd({ pattern: "twitter", alias: ["twt"], desc: "Twitter Video Downloader", category: "download" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const url = args[0];
        if (!url || !url.includes("twitter.com") && !url.includes("x.com")) return reply("❌ Please provide a valid Twitter/X link.");
        
        await reply("⏳ Downloading...");
        const res = await axios.get(`https://api.nexoracle.com/downloader/twitter?url=${encodeURIComponent(url)}`);
        const videoUrl = res.data?.result?.url;
        
        if (!videoUrl) return reply("❌ *Fetch Failed!* Video not found.");
        await zanta.sendMessage(from, { video: { url: videoUrl }, caption: "✅ Twitter Video" }, { quoted: mek });
    } catch (e) { 
        console.error(e);
        reply("❌ *Fetch Failed!* Twitter download failed."); 
    }
});