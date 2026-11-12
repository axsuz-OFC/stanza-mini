import { cmd } from '../command.js';

// 1. .reverse (අකුරු ආපසු හරවන්න)
cmd({ pattern: "reverse", desc: "Reverse text", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(" ");
        if (!text) return reply("❌ Please provide text.");
        await reply(text.split("").reverse().join(""));
    } catch (e) { reply("❌ *System Error!*"); }
});

// 2. .binary (ටෙක්ස්ට් එක Binary කරන්න)
cmd({ pattern: "binary", desc: "Text to binary", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(" ");
        if (!text) return reply("❌ Please provide text.");
        const binary = text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        await reply(`💻 *Binary:*\n${binary}`);
    } catch (e) { reply("❌ *System Error!*"); }
});

// 3. .smallcaps (ලස්සන පොඩි අකුරු)
cmd({ pattern: "smallcaps", desc: "Convert text to smallcaps", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(" ");
        if (!text) return reply("❌ Please provide text.");
        
        const map = { a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ" };
        const res = text.toLowerCase().split("").map(c => map[c] || c).join("");
        
        await reply(`🔤 *Smallcaps:* ${res}`);
    } catch (e) { reply("❌ *System Error!*"); }
});