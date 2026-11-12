import { cmd } from '../command.js';

const truths = ["What is the biggest lie you've ever told?", "Have you ever secretly liked someone?", "What is your biggest fear?"];
const dares = ["Call a friend and say 'I love you'.", "Send your last photo to this group.", "Keep your profile picture for 5 minutes."];

cmd({ pattern: "truth", desc: "Truth question", category: "fun" }, async (zanta, mek, m, { from, reply }) => {
    try {
        await reply(`🎯 *TRUTH*\n\n${truths[Math.floor(Math.random() * truths.length)]}`);
    } catch (e) { reply("❌ *System Error!*"); }
});

cmd({ pattern: "dare", desc: "Dare challenge", category: "fun" }, async (zanta, mek, m, { from, reply }) => {
    try {
        await reply(`🔥 *DARE*\n\n${dares[Math.floor(Math.random() * dares.length)]}`);
    } catch (e) { reply("❌ *System Error!*"); }
});

cmd({ pattern: "ship", desc: "Calculate love", category: "fun" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        if (args.length < 2) return reply("❌ Please provide two names. (Ex: `.ship Kamal Nimal`)");
        const percentage = Math.floor(Math.random() * 100) + 1;
        await reply(`❤️ *LOVE CALCULATOR* ❤️\n\n👤 ${args[0]}\n👤 ${args[1]}\n\n💖 *Love Percentage:* ${percentage}%\n\n${percentage > 50 ? "Perfect Match! 😍" : "Not a good match! 💔"}`);
    } catch (e) { reply("❌ *System Error!*"); }
});

cmd({ pattern: "8ball", desc: "Magic 8ball", category: "fun" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        if (!args[0]) return reply("❌ Please ask a question. (Ex: `.8ball Will I pass?`)");
        const answers = ["Yes, absolutely!", "No, it won't happen.", "Maybe...", "I don't know.", "Wait and see."];
        await reply(`🎱 *Question:* ${args.join(" ")}\n\n🔮 *Answer:* ${answers[Math.floor(Math.random() * answers.length)]}`);
    } catch (e) { reply("❌ *System Error!*"); }
});