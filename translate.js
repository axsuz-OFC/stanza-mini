import { cmd } from '../command.js';
import axios from 'axios';

cmd({ pattern: "tr", alias: ["translate"], desc: "Translate text", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    const lang = args[0];
    const text = args.slice(1).join(" ");
    if (!lang || !text) return reply("❌ Give Language & Text.\n*EX:* `.tr si Hello World`");
    try {
        const res = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`);
        await reply(`📝 *Original:* ${text}\n🌐 *Translated (${lang}):* ${res.data[0][0][0]}`);
    } catch (e) { reply("❌ Couldn't Translate."); }
});