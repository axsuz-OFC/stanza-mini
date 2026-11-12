import { cmd } from '../command.js';

// Hangman Game (Simple version)
cmd({ pattern: "hangman", desc: "Play hangman", category: "fun" }, async (zanta, mek, m, { from, reply }) => {
    try {
        // සරල වචන ලැයිස්තුවක්
        const words = ["APPLE", "BANANA", "ORANGE", "MANGO", "GRAPE"];
        const word = words[Math.floor(Math.random() * words.length)];
        const hidden = word.replace(/./g, "_ ");
        
        await reply(`🎮 *HANGMAN*\n\nWord: ${hidden}\n\nReply with a letter to guess! (Eg: A)`);
        // මෙතනදී ඇත්තටම game එක play වෙන්න නම් database එකක් ඕනේ, මේක දැනට සරලව පෙන්නන්න විතරයි.
    } catch (e) { reply("❌ *System Error!*"); }
});

// Guess Number
cmd({ pattern: "guess", desc: "Guess the number (1-10)", category: "fun" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const num = parseInt(args[0]);
        if (!num || num < 1 || num > 10) return reply("❌ Please guess a number between 1 and 10. (Ex: `.guess 5`)");
        
        const random = Math.floor(Math.random() * 10) + 1;
        if (num === random) {
            await reply(`🎉 *Correct!* The number was ${random}. You win!`);
        } else {
            await reply(`❌ *Wrong!* The number was ${random}. Try again!`);
        }
    } catch (e) { reply("❌ *System Error!*"); }
});