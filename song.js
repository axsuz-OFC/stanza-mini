import { cmd } from '../command.js';
import yts from 'yt-search';
import axios from 'axios';

cmd({ pattern: "song", alias: ["play"], desc: "Download Song", category: "download" }, async (zanta, mek, m, { from, args, reply }) => {
    const query = args.join(" ");
    if (!query) return reply("❌ Type song name.");
    try {
        await reply("🔍 Searching...");
        const search = await yts(query);
        const video = search.videos[0];
        if (!video) return reply("❌ Couldnt Find Song.");
        
        const res = await axios.get(`https://api.nexoracle.com/downloader/ytmp3?url=${encodeURIComponent(video.url)}`);
        const audioUrl = res.data?.result?.url;
        await zanta.sendMessage(from, { image: { url: video.thumbnail }, caption: `🎵 *${video.title}*\n⏱ *${video.timestamp}*` }, { quoted: mek });
        await zanta.sendMessage(from, { audio: { url: audioUrl }, mimetype: 'audio/mp4', fileName: `${video.title}.mp3` }, { quoted: mek });
    } catch (e) { reply("❌ Couldnt Download Song."); }
});