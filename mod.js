import { cmd } from '../command.js';
import axios from 'axios';

cmd({
    pattern: "mod",
    alias: ["modapk"],
    desc: "Search for MOD APKs",
    category: "download"
}, async (zanta, mek, m, { from, args, reply }) => {
    const query = args.join(" ");
    if (!query) return reply("❌ Type App name.\n\n*EX:* `.mod spotify`");

    try {
        await reply(`🔍 *"${query} mod"* Searching...`);

        const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${encodeURIComponent(query + " mod")}/limit=1`;
        const res = await axios.get(apiUrl);
        const app = res.data?.datalist?.list?.[0];

        if (!app) return reply(`⚠️ *"${query}"* Couldn't find a MOD APK .`);

        const appSize = (app.size / 1048576).toFixed(2);
        const caption = `╭━〔 *MOD APK* 〕━➢\n┃❍ \`📱 𝖭𝖺𝗆𝖾\` : ${app.name}\n┃❍ \`📦 𝖲𝗂𝗓𝖾\` : ${appSize} MB\n┃❍ \`⚙️ 𝖵𝖾𝗋\` : ${app.file?.vername || 'Unknown'}\n╰━━━━━━━━━━━━━━➢\n\n⏳ *Downloading...*`;

        if (app.icon) {
            await zanta.sendMessage(from, { image: { url: app.icon }, caption }, { quoted: mek });
        }

        await zanta.sendMessage(from, {
            document: { url: app.file.path_alt },
            fileName: `${app.name}.apk`,
            mimetype: "application/vnd.android.package-archive"
        }, { quoted: mek });

    } catch (e) {
        console.error("MOD Error:", e.message);
        reply("❌ *Fetch Failed!* .");
    }
});