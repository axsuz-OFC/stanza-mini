import { cmd } from '../command.js';

// 1. .dice (දාදු කැටය)
cmd({ pattern: "dice", desc: "Roll a dice", category: "fun" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const num = Math.floor(Math.random() * 6) + 1;
        await reply(`🎲 *You rolled a ${num}!*`);
    } catch (e) { reply("❌ *System Error!*"); }
});

// 2. .coin (කාසියේ පෙරළිය)
cmd({ pattern: "coin", desc: "Flip a coin", category: "fun" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const result = Math.random() < 0.5 ? "Heads" : "Tails";
        await reply(`🪙 *It's ${result}!*`);
    } catch (e) { reply("❌ *System Error!*"); }
});

// 3. .ship (ආදරය ගණනය කරන්න)
cmd({ pattern: "ship", desc: "Calculate love", category: "fun" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        if (args.length < 2) return reply("❌ Please provide two names. (Ex: `.ship Kamal Nimal`)");
        const percentage = Math.floor(Math.random() * 100) + 1;
        
        await reply(`❤️ *LOVE CALCULATOR* ❤️\n\n👤 ${args[0]}\n👤 ${args[1]}\n\n💖 *Love Percentage:* ${percentage}%\n\n${percentage > 50 ? "Perfect Match! 😍" : "Not a good match! 💔"}`);
    } catch (e) { reply("❌ *System Error!*"); }
});

// 4. .truth / .dare
const truths = ["What is the biggest lie you've ever told?", "Have you ever secretly liked someone?", "What is your biggest fear?"];
const dares = ["Call a friend and say 'I love you'.", "Send your last photo to this group.", "Keep your profile picture for 5 minutes."];

cmd({ pattern: "truth", desc: "Truth question", category: "fun" }, async (zanta, mek, m, { from, reply }) => {
    try { await reply(`🎯 *TRUTH*\n\n${truths[Math.floor(Math.random() * truths.length)]}`); } catch (e) { reply("❌ *System Error!*"); }
});

cmd({ pattern: "dare", desc: "Dare challenge", category: "fun" }, async (zanta, mek, m, { from, reply }) => {
    try { await reply(`🔥 *DARE*\n\n${dares[Math.floor(Math.random() * dares.length)]}`); } catch (e) { reply("❌ *System Error!*"); }
});