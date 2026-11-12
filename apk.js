import { cmd } from '../command.js';
import axios from 'axios';

cmd({
    pattern: "apk",
    alias: ["android", "app"],
    desc: "Download APK files from Aptoide",
    category: "download"
}, async (zanta, mek, m, { from, args, reply }) => {
    const query = args.join(" ");
    
    if (!query) {
        return reply("❌ කරුණාකර ඔයාට අවශ්‍ය App එකේ නම type කරන්න.\n\n*උදාහරණය:* `.apk whatsapp`");
    }

    try {
        await reply(`🔍 *"${query}"* 𝚂𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐...`);

        // Aptoide Search API එකට request එක යවනවා
        const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${encodeURIComponent(query)}/limit=1`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        // App එකක් හම්බුනේ නැත්නම්
        if (!data?.datalist?.list?.length) {
            return reply(`⚠️ *"${query}"* 𝙳𝚒𝚍𝚗'𝚝 𝚏𝚘𝚞𝚗𝚍 𝚊 𝚊𝚙𝚙 . 𝚃𝚛𝚢 𝚏𝚛𝚘𝚖 𝚊𝚗𝚘𝚝𝚑𝚎𝚛 𝚗𝚊𝚖𝚎.`);
        }

        const app = data.datalist.list[0];
        const appName = app.name;
        const appSize = (app.size / 1048576).toFixed(2); // MB වලට හරවනවා
        const downloadUrl = app.file.path_alt;

        // App එකේ විස්තර ටික caption එකට හදාගන්නවා
        const caption = `╭━━━〔 *APK DOWNLOADER* 〕━━━➢\n` +
            `┃\n` +
            `┃ 📱 *ɴᴀᴍᴇ:* ${appName}\n` +
            `┃ 📦 *sɪᴢᴇ:* ${appSize} MB\n` +
            `┃ 🏢 *ᴅᴇᴠᴇʟᴏᴘᴇʀ:* ${app.developer?.name || 'Unknown'}\n` +
            `┃ ⚙️ *ᴠᴇʀsɪᴏɴ:* ${app.file?.vername || 'Unknown'}\n` +
            `┃\n` +
            `╰━━━━━━━━━━━━━➢\n\n` +
            `⏳ *Downloading...*`;

        // පින්තූරය (Icon) සහ caption එක එවනවා
        if (app.icon) {
            await zanta.sendMessage(from, { image: { url: app.icon }, caption: caption }, { quoted: mek });
        }

        // APK file එක Document එකක් විදියට එවනවා
        await zanta.sendMessage(from, {
            document: { url: downloadUrl },
            fileName: `${appName}.apk`,
            mimetype: "application/vnd.android.package-archive"
        }, { quoted: mek });

    } catch (error) {
        console.error("APK Downloader Error:", error.message);
        
        // Error එක fetch / network එකක් නම්
        if (error.message.includes('fetch') || error.message.includes('ENOTFOUND') || error.message.includes('timeout')) {
            reply("❌ *Fetch Failed!*\n\n⚠️ 𝚂𝚘𝚖𝚎𝚝𝚑𝚒𝚗𝚐 𝚎𝚛𝚛𝚘𝚛 . 𝚃𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛..");
        } else {
            reply("❌ *System Error!*\n\n⚠️ 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚠𝚒𝚝𝚑 𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝙰𝙿𝙺 .");
        }
    }
});