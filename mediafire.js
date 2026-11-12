import { cmd } from '../command.js';
import axios from 'axios';

cmd({ pattern: "mediafire", alias: ["mf"], desc: "MediaFire Downloader", category: "download" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const url = args[0];
        if (!url || !url.includes("mediafire.com")) return reply("❌ Please provide a valid MediaFire link.");
        
        await reply("⏳ Fetching file info...");
        const res = await axios.get(`https://api.nexoracle.com/downloader/mediafire?url=${encodeURIComponent(url)}`);
        const fileUrl = res.data?.result?.url;
        const fileName = res.data?.result?.filename || "file.zip";
        const fileSize = res.data?.result?.size || "Unknown";
        
        if (!fileUrl) return reply("❌ *Fetch Failed!* File not found.");
        
        await reply(`📁 *MediaFire File*\n\n📄 *Name:* ${fileName}\n📦 *Size:* ${fileSize}\n\n⏳ Uploading to WhatsApp...`);
        
        await zanta.sendMessage(from, { 
            document: { url: fileUrl }, 
            fileName: fileName, 
            mimetype: "application/octet-stream" 
        }, { quoted: mek });
    } catch (e) { 
        reply("❌ *Fetch Failed!* API error or invalid link."); 
    }
});