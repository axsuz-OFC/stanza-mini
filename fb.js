import { cmd } from '../command.js';
import axios from 'axios';

cmd({ pattern: "fb", alias: ["facebook"], desc: "FB Downloader", category: "download" }, async (zanta, mek, m, { from, args, reply }) => {
    const url = args[0];
    if (!url || !url.includes("facebook.com")) return reply("❌ Type a vaild FB LINK.");
    try {
        await reply("⏳ Downloading...");
        const res = await axios.get(`https://api.nexoracle.com/downloader/fbdl?url=${encodeURIComponent(url)}`);
        const videoUrl = res.data?.result?.hd || res.data?.result?.sd;
        if (!videoUrl) return reply("❌ Couldn't find video.");
        await zanta.sendMessage(from, { video: { url: videoUrl }, caption: "✅ FB Video" }, { quoted: mek });
    } catch (e) { reply("❌ FB Download Faild."); }
});
