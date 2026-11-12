import { cmd } from '../command.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../database.json');

cmd({
    pattern: "set",
    alias: ["update"],
    desc: "Change bot settings",
    category: "main"
}, async (zanta, mek, m, { from, args, reply }) => {
    if (args.length < 2) {
        return reply("❌ *Usage:* `.set <number> <value>`\n\n*Ex:* `.set 16 off`\n*Ex:* `.set 1 New Bot Name`");
    }

    const settingNum = args[0];
    const value = args.slice(1).join(" ").toLowerCase();
    
    let db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    let updated = false;
    let message = "";

    // අංකයට අදාළ සෙටින්ග් එක වෙනස් කරනවා
    switch (settingNum) {
        case "1": db.botName = value; message = `Bot Name changed to *${value}*`; updated = true; break;
        case "2": db.ownerName = value; message = `Owner Name changed to *${value}*`; updated = true; break;
        case "3": db.prefix = value; message = `Prefix changed to *${value}*`; updated = true; break;
        case "4": db.workMode = value.toUpperCase(); message = `Work Mode changed to *${value.toUpperCase()}*`; updated = true; break;
        case "7": db.alwaysOnline = value === "on"; message = `Always Online is now *${value.toUpperCase()}*`; updated = true; break;
        case "8": db.autoRead = value === "on"; message = `Auto Read is now *${value.toUpperCase()}*`; updated = true; break;
        case "9": db.autoTyping = value === "on"; message = `Auto Typing is now *${value.toUpperCase()}*`; updated = true; break;
        case "10": db.statusSeen = value === "on"; message = `Status Seen is now *${value.toUpperCase()}*`; updated = true; break;
        case "11": db.statusReact = value === "on"; message = `Status React is now *${value.toUpperCase()}*`; updated = true; break;
        case "12": db.readCmd = value === "on"; message = `Read Cmd is now *${value.toUpperCase()}*`; updated = true; break;
        case "13": db.recordingVoice = value === "on"; message = `Recording Voice is now *${value.toUpperCase()}*`; updated = true; break;
        case "14": db.autoReply = value === "on"; message = `Auto Reply is now *${value.toUpperCase()}*`; updated = true; break;
        case "15": db.connectMsg = value === "on"; message = `Connect Msg is now *${value.toUpperCase()}*`; updated = true; break;
        case "16": db.buttons = value === "on"; message = `Buttons are now *${value.toUpperCase()}*`; updated = true; break;
        case "17": db.voiceReply = value === "on"; message = `Voice Reply is now *${value.toUpperCase()}*`; updated = true; break;
        case "18": db.antiDelete = value === "on"; message = `Anti-Delete is now *${value.toUpperCase()}*`; updated = true; break;
        case "19": db.antiEdit = value.toUpperCase(); message = `Anti-Edit changed to *${value.toUpperCase()}*`; updated = true; break;
        case "20": db.autoReact = value === "on"; message = `Auto React is now *${value.toUpperCase()}*`; updated = true; break;
        case "21": db.groupSecurity = value === "on"; message = `Group Security is now *${value.toUpperCase()}*`; updated = true; break;
        case "22": db.antiCall = value === "on"; message = `Anti-Call is now *${value.toUpperCase()}*`; updated = true; break;
        default:
            return reply("❌ Enter a vaild number. (1-22 )");
    }

    if (updated) {
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
        await reply(`✅ *Setting Updated!*\n\n${message}`);
    }
});