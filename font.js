import { cmd } from '../command.js';

cmd({
    pattern: "font",
    alias: ["fonts"],
    desc: "Convert text into stylish fonts",
    category: "tools"
}, async (zanta, mek, m, { from, args, reply }) => {
    const text = args.join(" ");
    
    if (!text) {
        return reply("❌ Type a word OR Name.\n\n*උදා:* `.font Stanza`");
    }

    // විවිධ අකුරු කේත (Unicode) පරාසයන්
    const fonts = {
        "Bold": "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳",
        "Italic": "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧",
        "Script": "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏",
        "Double": "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫",
        "Monospace": "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣",
        "Fancy": "αв¢∂єƒgнιנкℓмησρqяѕтυνωχуz",
        "Vaporwave": "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ",
        "Bubble": "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ",
        "Strike": "S̶t̶r̶i̶k̶e̶",
        "Underline": "U̲n̲d̲e̲r̲l̲i̲n̲e̲"
    };

    // අකුරු හරවන Function එක
    const convert = (str, fontMap) => {
        const normalChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const fontChars = Array.from(fontMap);
        
        return str.split("").map(char => {
            let index = normalChars.indexOf(char);
            if (index !== -1) {
                // Array එකේ අකුරු ගණන සහ සාමාන්‍ය අකුරු ගණන සමාන නම් විතරක් මාරු කරනවා
                if (fontChars.length === normalChars.length) {
                    return fontChars[index];
                } else if (fontChars.length === 26) { // අකුරු 26ක් විතරක් තියෙන විට
                    if (index > 25) index -= 26; // Lowercase handle කරන්න
                    return fontChars[index];
                }
            }
            return char;
        }).join("");
    };

    // ස්ට්‍රයික් සහ අන්ඩර්ලයින් වෙනම හදමු
    const makeStrike = (str) => str.split("").map(c => c + "\u0336").join("");
    const makeUnderline = (str) => str.split("").map(c => c + "\u0332").join("");

    let resultText = `╭━〔 *ꜱᴛᴀɴᴢᴀ_ᴍɪɴɪ ꜰᴏɴᴛꜱ* 〕━➢\n\n`;
    resultText += `📝 *Original:* ${text}\n\n`;

    for (const [name, chars] of Object.entries(fonts)) {
        if (name === "Strike") {
            resultText += `┃❍ *${name}:* ${makeStrike(text)}\n`;
        } else if (name === "Underline") {
            resultText += `┃❍ *${name}:* ${makeUnderline(text)}\n`;
        } else {
            resultText += `┃❍ *${name}:* ${convert(text, chars)}\n`;
        }
    }

    resultText += `\n╰━━━━━━━━━━━━━━➢\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜱᴛᴀɴᴢᴀ_ᴍɪɴɪ </>`;

    await reply(resultText);
});