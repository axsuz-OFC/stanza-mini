import { cmd } from '../command.js';
import axios from 'axios';

cmd({ pattern: "quote", alias: ["quotes"], desc: "Get a quote", category: "fun" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://api.quotable.io/random');
        await reply(`💬 *"${res.data.content}"*\n\n✍️ *- ${res.data.author}*`);
    } catch (e) { reply("❌ Couldnt generate Quote."); }
});