import { cmd } from '../command.js';
import axios from 'axios';

cmd({
    pattern: "gameapk",
    alias: ["game", "apkgame"],
    desc: "Download game APKs",
    category: "download"
}, async (zanta, mek, m, { from, args, reply }) => {
    const query = args.join(" ");
    if (!query) return reply("❌ 𝚃𝚢𝚙𝚎 𝚊 𝚐𝚊𝚖𝚎.\n\n*𝙴𝚇:* `.gameapk pubg`");

    try {
        await reply(`🔍 *"${query}"* 𝚜𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐...`);

        // Aptoide API search (game category එකට)
        const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${encodeURIComponent(query)}/limit=1`;
        const res = await axios.get(apiUrl);
        const app = res.data?.datalist?.list?.[0];

        if (!app) return reply(`⚠️ *"${query}"* 𝙳𝚒𝚍𝚗'𝚝 𝚏𝚘𝚞𝚗𝚍 𝚊 game .`);

        const appSize = (app.size / 1048576).toFixed(2);
        const caption = `╭━━━〔 *GAME APK* 〕━━━➢\n┃\n┃ 🎮 *ɴᴀᴍᴇ:* ${app.name}\n┃ 📦 *sɪᴢᴇ:* ${appSize} MB\n┃ ⚙️ *ᴠᴇʀ:* ${app.file?.vername || 'Unknown'}\n┃\n╰━━━━━━━━━━━━━➢\n\n⏳ *Downloading...*`;

        if (app.icon) {
            await zanta.sendMessage(from, { image: { url: app.icon }, caption }, { quoted: mek });
        }

        await zanta.sendMessage(from, {
            document: { url: app.file.path_alt },
            fileName: `${app.name}.apk`,
            mimetype: "application/vnd.android.package-archive"
        }, { quoted: mek });

    } catch (e) {
        console.error("GameAPK Error:", e.message);
        reply("❌ *Fetch Failed!*.");
    }
});