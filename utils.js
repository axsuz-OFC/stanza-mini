import { cmd } from '../command.js';

// 1. .qrcode
cmd({ pattern: "qrcode", alias: ["qr"], desc: "Generate QR code", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(" ");
        if (!text) return reply("❌ Please provide text or URL.");
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}`;
        await zanta.sendMessage(from, { image: { url: url }, caption: "✅ QR Code Generated" }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});

// 2. .readmore
cmd({ pattern: "readmore", desc: "Create readmore text", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(" ");
        if (!text.includes("|")) return reply("❌ Usage: `.readmore Visible text | Hidden text`");
        const [visible, hidden] = text.split("|");
        await reply(`${visible.trim()}\n\n${hidden.trim()}`);
    } catch (e) { reply("❌ *System Error!*"); }
});

// 3. .calculate
cmd({ pattern: "calculate", alias: ["calc"], desc: "Calculate math", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const expr = args.join(" ");
        if (!expr) return reply("❌ Please provide a math expression.");
        // Safe evaluation using Function
        const result = new Function(`return ${expr}`)();
        await reply(`🧮 *Expression:* ${expr}\n✅ *Result:* ${result}`);
    } catch (e) { reply("❌ *System Error!* Invalid math expression."); }
});

// 4. .password
cmd({ pattern: "password", alias: ["pw"], desc: "Generate password", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const length = parseInt(args[0]) || 12;
        if (length > 50) return reply("❌ Max length is 50.");
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        let password = "";
        for (let i = 0; i < length; i++) password += chars.charAt(Math.floor(Math.random() * chars.length));
        await reply(`🔐 *Generated Password:*\n\`${password}\``);
    } catch (e) { reply("❌ *System Error!*"); }
});