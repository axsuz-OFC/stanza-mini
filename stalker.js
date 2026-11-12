import { cmd } from '../command.js';
import axios from 'axios';

// 1. .igstalk
cmd({ pattern: "igstalk", desc: "Instagram stalker", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const username = args[0];
        if (!username) return reply("❌ Please provide an IG username.");
        const res = await axios.get(`https://api.nexoracle.com/stalker/igstalk?username=${username}`);
        const data = res.data.result;
        if (!data) return reply("❌ User not found.");
        await zanta.sendMessage(from, { image: { url: data.profile_pic }, caption: `📸 *Instagram Stalk*\n\n👤 *Name:* ${data.full_name}\n🔗 *User:* ${data.username}\n📝 *Bio:* ${data.biography}\n👥 *Followers:* ${data.followers}\n👣 *Following:* ${data.following}\n📦 *Posts:* ${data.posts}` }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});

// 2. .npmstalk
cmd({ pattern: "npmstalk", desc: "NPM package info", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const pkg = args[0];
        if (!pkg) return reply("❌ Please provide a package name.");
        const res = await axios.get(`https://registry.npmjs.org/${pkg}`);
        const data = res.data;
        await reply(`📦 *NPM Stalk*\n\n📛 *Name:* ${data.name}\n🔢 *Latest Version:* ${data['dist-tags'].latest}\n📝 *Description:* ${data.description}\n👤 *Author:* ${data.author?.name || "N/A"}`);
    } catch (e) { reply("❌ *Fetch Failed!* Package not found."); }
});

// 3. .wastalk
cmd({ pattern: "wastalk", desc: "Check WA number", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const number = args[0];
        if (!number) return reply("❌ Please provide a phone number (ex: 94704536039).");
        const jid = `${number}@s.whatsapp.net`;
        const [result] = await zanta.onWhatsApp(jid);
        if (result && result.exists) {
            await reply(`✅ *WhatsApp Number Valid!*\n\n📱 *Number:* ${number}\n🆔 *JID:* ${result.jid}`);
        } else {
            await reply(`❌ This number is not on WhatsApp.`);
        }
    } catch (e) { reply("❌ *System Error!*"); }
});