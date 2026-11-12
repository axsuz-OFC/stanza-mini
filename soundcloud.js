import { cmd } from '../command.js';
import axios from 'axios';

cmd({ pattern: "soundcloud", alias: ["sc"], desc: "SoundCloud Downloader", category: "download" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const url = args[0];
        if (!url || !url.includes("soundcloud.com")) return reply("❌ Please provide a valid SoundCloud link.");
        
        await reply("⏳ Downloading SoundCloud audio...");
        const res = await axios.get(`https://api.nexoracle.com/downloader/soundcloud?url=${encodeURIComponent(url)}`);
        const audioUrl = res.data?.result?.audio;
        const title = res.data?.result?.title || "SoundCloud Audio";
        
        if (!audioUrl) return reply("❌ *Fetch Failed!* Audio not found.");
        
        await zanta.sendMessage(from, { 
            audio: { url: audioUrl }, 
            mimetype: 'audio/mp4', 
            fileName: `${title}.mp3` 
        }, { quoted: mek });
    } catch (e) { 
        reply("❌ *Fetch Failed!* API error or invalid link."); 
    }
});