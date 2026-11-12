import { cmd } from '../command.js';
import axios from 'axios';

cmd({ pattern: "tta", desc: "TikTok Audio Downloader", category: "download" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const url = args[0];
        if (!url || !url.includes("tiktok.com")) return reply("❌ Please provide a valid TikTok link.");
        
        await reply("⏳ Downloading audio...");
        const res = await axios.get(`https://api.nexoracle.com/downloader/tiktok?url=${encodeURIComponent(url)}`);
        const audioUrl = res.data?.result?.audio;
        
        if (!audioUrl) return reply("❌ *Fetch Failed!* Audio not found.");
        await zanta.sendMessage(from, { audio: { url: audioUrl }, mimetype: 'audio/mp4', fileName: 'tiktok_audio.mp3' }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});