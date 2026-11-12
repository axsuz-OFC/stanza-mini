import { cmd } from '../command.js';

cmd({ pattern: "smallcaps", desc: "Convert text to smallcaps", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(" ");
        if (!text) return reply("❌ Please provide text.");
        
        const map = { 
            a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ", 
            j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ", 
            s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ" 
        };
        
        const res = text.toLowerCase().split("").map(c => map[c] || c).join("");
        
        await reply(`🔤 *Smallcaps:* ${res}`);
    } catch (e) { 
        reply("❌ *System Error!*"); 
    }
});