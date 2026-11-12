import { cmd } from '../command.js';
import axios from 'axios';

// 1. .lyrics (Search Lyrics)
cmd({ pattern: "lyrics", desc: "Find song lyrics", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const song = args.join(" ");
        if (!song) return reply("❌ Please provide a song name.");
        
        const res = await axios.get(`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(song)}`);
        if (res.data.error) return reply("❌ *Fetch Failed!* Lyrics not found.");
        
        await reply(`🎵 *Song:* ${res.data.title}\n👤 *Artist:* ${res.data.artist}\n\n📝 *Lyrics:*\n\n${res.data.lyrics}`);
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});