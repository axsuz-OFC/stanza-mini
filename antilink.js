import { cmd } from '../command.js';

cmd({ pattern: "antilink", desc: "Enable/Disable antilink", category: "group" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const status = args[0] === "on" ? "Enabled ✅" : "Disabled ❌";
        await reply(`🛡️ *Antilink ${status}*`);
    } catch (e) {
        reply("❌ *System Error!*");
    }
});

export const checkLink = async (zanta, mek, from) => {
    try {
        const body = mek.message?.conversation || mek.message?.extendedTextMessage?.text || "";
        const linkRegex = /(https?:\/\/[^\s]+)/g;
        
        if (linkRegex.test(body) && from.endsWith('@g.us')) {
            const groupMetadata = await zanta.groupMetadata(from);
            const botId = zanta.user.id.split(':')[0] + '@s.whatsapp.net';
            const isBotAdmin = groupMetadata.participants.find(p => p.id === botId)?.admin;
            const sender = mek.key.participant;
            const isSenderAdmin = groupMetadata.participants.find(p => p.id === sender)?.admin;

            if (isBotAdmin && !isSenderAdmin) {
                await zanta.sendMessage(from, { delete: mek.key });
                await zanta.groupParticipantsUpdate(from, [sender], "remove");
                await zanta.sendMessage(from, { text: `🚫 *Antilink Detected!*\n\n@${sender.split('@')[0]} removed for sending links.`, mentions: [sender] });
            }
        }
    } catch (e) { 
        console.error("Antilink Error:", e.message); 
    }
};