import { cmd } from '../command.js';
import axios from 'axios';

// 1. .attp (Text to Sticker)
cmd({ pattern: "attp", desc: "Text to sticker", category: "fun" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(" ");
        if (!text) return reply("❌ Please provide text.");
        await reply("⏳ Creating sticker...");
        const url = `https://api.nexoracle.com/sticker/attp?text=${encodeURIComponent(text)}`;
        await zanta.sendMessage(from, { sticker: { url: url } }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});

// 2. .emojimix
cmd({ pattern: "emojimix", desc: "Mix two emojis", category: "fun" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args[0];
        if (!text || !text.includes("+")) return reply("❌ Usage: `.emojimix 😂+😍`");
        const url = `https://api.nexoracle.com/sticker/emojimix?text=${encodeURIComponent(text)}`;
        await zanta.sendMessage(from, { sticker: { url: url } }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});

// 3. .meme
cmd({ pattern: "meme", desc: "Get random meme", category: "fun" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://meme-api.com/gimme');
        await zanta.sendMessage(from, { image: { url: res.data.url }, caption: `😂 *${res.data.title}*` }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});

// 4. .define
cmd({ pattern: "define", desc: "Dictionary", category: "fun" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const word = args[0];
        if (!word) return reply("❌ Please provide a word.");
        const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = res.data[0];
        await reply(`📖 *Word:* ${data.word}\n\n📝 *Meaning:* ${data.meanings[0].definitions[0].definition}\n\n💡 *Example:* ${data.meanings[0].definitions[0].example || "N/A"}`);
    } catch (e) { reply("❌ *Fetch Failed!* Word not found."); }
});

// 5. .advice
cmd({ pattern: "advice", desc: "Get random advice", category: "fun" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://api.adviceslip.com/advice');
        await reply(`💡 *Advice:* ${res.data.slip.advice}`);
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});