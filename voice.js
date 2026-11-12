import { cmd } from '../command.js';

// Text to Speech
cmd({ pattern: "tts", desc: "Text to Speech", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(" ");
        if (!text) return reply("❌ Please provide text.");
        
        await reply("🎙️ Generating voice...");
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=en&client=tw-ob`;
        await zanta.sendMessage(from, { audio: { url: url }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});