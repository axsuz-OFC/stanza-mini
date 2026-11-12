import { cmd } from '../command.js';
import axios from 'axios';

// 1. .quote (ලස්සන උපුටා ගැනීම්)
cmd({ pattern: "quote", alias: ["quotes"], desc: "Get a quote", category: "fun" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://api.quotable.io/random');
        await reply(`💬 *"${res.data.content}"*\n\n✍️ *- ${res.data.author}*`);
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});

// 2. .advice (අහඹු උපදෙස්)
cmd({ pattern: "advice", desc: "Get random advice", category: "fun" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://api.adviceslip.com/advice');
        await reply(`💡 *Advice:* ${res.data.slip.advice}`);
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});

// 3. .anime (ඇනිමේ පින්තූර)
cmd({ pattern: "anime", desc: "Random anime image", category: "fun" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://api.waifu.pics/sfw/waifu');
        await zanta.sendMessage(from, { image: { url: res.data.url }, caption: "✨ *Random Anime*" }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});