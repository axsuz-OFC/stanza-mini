import { cmd } from '../command.js';

cmd({ pattern: "kick", desc: "Kick member", category: "group" }, async (zanta, mek, m, { from, reply }) => {
    const quoted = mek.message.extendedTextMessage?.contextInfo?.participant;
    if (!quoted) return reply("❌ Please reply to a massage and type '.kick'.");
    try { await zanta.groupParticipantsUpdate(from, [quoted], "remove"); reply("✅ deleted succusfully."); } catch (e) { reply("❌ Couldn't delete."); }
});

cmd({ pattern: "promote", desc: "Promote to admin", category: "group" }, async (zanta, mek, m, { from, reply }) => {
    const quoted = mek.message.extendedTextMessage?.contextInfo?.participant;
    if (!quoted) return reply("❌ Reply & type '.promote'.");
    try { await zanta.groupParticipantsUpdate(from, [quoted], "promote"); reply("✅ Admined."); } catch (e) { reply("❌ Fetch Faild."); }
});

cmd({ pattern: "tagall", desc: "Tag everyone", category: "group" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const groupMetadata = await zanta.groupMetadata(from);
        const participants = groupMetadata.participants;
        let text = `📢 *Attention Everyone!*\n\n📝 *Message:* ${args.join(" ") || "No message"}\n\n`;
        let mentions = [];
        for (let mem of participants) {
            text += `@${mem.id.split('@')[0]}\n`;
            mentions.push(mem.id);
        }
        await zanta.sendMessage(from, { text, mentions }, { quoted: mek });
    } catch (e) { reply("❌ Couldn't Tag."); }
});