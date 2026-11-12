import { cmd } from '../command.js';
import axios from 'axios';

// 1. .igstalk
cmd({ pattern: "igstalk", desc: "Instagram stalker", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const username = args[0];
        if (!username) return reply("❌ Please provide an IG username.");
        
        await reply("🔍 Searching...");
        const res = await axios.get(`https://api.nexoracle.com/stalker/igstalk?username=${username}`);
        const data = res.data.result;
        
        if (!data) return reply("❌ *Fetch Failed!* User not found.");
        
        await zanta.sendMessage(from, { 
            image: { url: data.profile_pic }, 
            caption: `📸 *Instagram Stalk*\n\n👤 *Name:* ${data.full_name}\n🔗 *User:* ${data.username}\n📝 *Bio:* ${data.biography}\n👥 *Followers:* ${data.followers}\n👣 *Following:* ${data.following}\n📦 *Posts:* ${data.posts}` 
        }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});

// 2. .githubstalk
cmd({ pattern: "githubstalk", alias: ["gh"], desc: "Get GitHub user info", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const username = args[0];
        if (!username) return reply("❌ Please provide a username.");
        
        await reply("🔍 Searching GitHub...");
        const res = await axios.get(`https://api.github.com/users/${username}`);
        const data = res.data;

        await reply(`🐙 *GITHUB STALK*\n\n👤 *Name:* ${data.name || "N/A"}\n🔗 *User:* ${data.login}\n🏢 *Company:* ${data.company || "N/A"}\n📍 *Location:* ${data.location || "N/A"}\n👥 *Followers:* ${data.followers}\n📦 *Public Repos:* ${data.public_repos}\n🔗 *Profile:* ${data.html_url}`);
    } catch (e) { reply("❌ *Fetch Failed!* User not found."); }
});