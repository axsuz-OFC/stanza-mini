import { cmd } from '../command.js';
import axios from 'axios';

// 1. .qrcode
cmd({ pattern: "qrcode", alias: ["qr"], desc: "Generate QR code", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const text = args.join(" ");
        if (!text) return reply("❌ Please provide text or URL.");
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}`;
        await zanta.sendMessage(from, { image: { url: url }, caption: "✅ QR Code Generated" }, { quoted: mek });
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});

// 2. .fakeinfo
cmd({ pattern: "fakeinfo", alias: ["fake"], desc: "Generate fake info", category: "fun" }, async (zanta, mek, m, { from, reply }) => {
    try {
        const res = await axios.get('https://randomuser.me/api/');
        const user = res.data.results[0];
        await reply(`👤 *Name:* ${user.name.first} ${user.name.last}\n📧 *Email:* ${user.email}\n📱 *Phone:* ${user.phone}\n🏠 *Address:* ${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.country}`);
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});

// 3. .password
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