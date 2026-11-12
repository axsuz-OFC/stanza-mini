import { cmd } from '../command.js';

// 1. .calculate (ගණිත ගැටළු විසඳන්න)
cmd({ pattern: "calculate", alias: ["calc"], desc: "Calculate math", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const expr = args.join(" ");
        if (!expr) return reply("❌ Please provide a math expression. (Ex: `.calc 5*5+10`)");
        
        // Safe evaluation
        const result = new Function(`return ${expr}`)();
        await reply(`🧮 *Expression:* ${expr}\n✅ *Result:* ${result}`);
    } catch (e) { reply("❌ *System Error!* Invalid math expression."); }
});

// 2. .define (ඉංග්‍රීසි වචනවල තේරුම)
cmd({ pattern: "define", desc: "Dictionary", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const word = args[0];
        if (!word) return reply("❌ Please provide a word. (Ex: `.define Apple`)");
        
        const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = res.data[0];
        await reply(`📖 *Word:* ${data.word}\n\n📝 *Meaning:* ${data.meanings[0].definitions[0].definition}\n\n💡 *Example:* ${data.meanings[0].definitions[0].example || "N/A"}`);
    } catch (e) { reply("❌ *Fetch Failed!* Word not found."); }
});

// 3. .readmore (WhatsApp Read more effect එක)
cmd({ pattern: "readmore", desc: "Create readmore text", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(" ");
        if (!text.includes("|")) return reply("❌ Usage: `.readmore Visible text | Hidden text`");
        
        const [visible, hidden] = text.split("|");
        await reply(`${visible.trim()}\n\n${hidden.trim()}`);
    } catch (e) { reply("❌ *System Error!*"); }
});