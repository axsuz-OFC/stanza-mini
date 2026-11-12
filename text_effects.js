import { cmd } from '../command.js';

// 1. .reverse (Reverse Text)
cmd({ pattern: "reverse", desc: "Reverse text", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(" ");
        if (!text) return reply("❌ Please provide some text.");
        await reply(text.split("").reverse().join(""));
    } catch (e) { reply("❌ *System Error!*"); }
});

// 2. .fancy (Fancy Text Generator - Based on your .font cmd)
cmd({ pattern: "fancy", desc: "Fancy text generator", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(" ");
        if (!text) return reply("❌ Please provide some text.");
        
        const fonts = {
            "Bold": "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳",
            "Italic": "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧",
            "Script": "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏"
        };

        const convert = (str, fontMap) => {
            const normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            const fontChars = Array.from(fontMap);
            return str.split("").map(char => {
                let index = normal.indexOf(char);
                if (index !== -1) return fontChars[index];
                return char;
            }).join("");
        };

        let res = `📝 *Text Effects:*\n\n`;
        for (const [name, chars] of Object.entries(fonts)) {
            res += `*${name}:* ${convert(text, chars)}\n`;
        }
        await reply(res);
    } catch (e) { reply("❌ *System Error!*"); }
});

// 3. .binary (Text to Binary)
cmd({ pattern: "binary", desc: "Text to binary", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(" ");
        if (!text) return reply("❌ Please provide text.");
        const binary = text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        await reply(`💻 *Binary:*\n${binary}`);
    } catch (e) { reply("❌ *System Error!*"); }
});