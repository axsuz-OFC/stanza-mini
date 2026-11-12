import { cmd } from '../command.js';
import SpottyDL from 'spottydl';
import fs from 'fs';
import path from 'path';
import os from 'os';

cmd({
    pattern: "spotify",
    alias: ["song", "sp"],
    desc: "Download Spotify tracks (no API key needed)",
    category: "download"
}, async (zanta, mek, m, { from, args, reply }) => {
    const url = args[0];
    if (!url || !url.includes('open.spotify.com/track')) {
        return reply("❌ Type Spotify track Link.\n\n*EX:* `.spotify https://open.spotify.com/track/...`");
    }

    try {
        await reply("⏳ *Downloading...* (This may take moment)");

        // Track info එක ගන්නවා
        const track = await SpottyDL.getTrack(url);
        const tempDir = os.tmpdir();
        
        // Track එක download කරනවා
        const result = await SpottyDL.downloadTrack(track, tempDir);

        if (!result || !result[0] || result[0].status !== 'Success') {
            return reply("❌ Couldn't find Song.");
        }

        const filePath = result[0].filename;
        const audioBuffer = fs.readFileSync(filePath);

        // WhatsApp එකට audio එක එවනවා
        await zanta.sendMessage(from, {
            audio: audioBuffer,
            mimetype: 'audio/mp4',
            fileName: `${track.title}.mp3`,
            caption: `🎵 *${track.title}*\n👤 *${track.artist}*`
        }, { quoted: mek });

        // Temp file එක delete කරනවා
        fs.unlinkSync(filePath);

    } catch (e) {
        console.error("Spotify Error:", e.message);
        reply("❌ *Spotify Download Failed!* .");
    }
});