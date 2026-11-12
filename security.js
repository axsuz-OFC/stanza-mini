import { cmd } from '../command.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../database.json');

cmd({ pattern: "antidelete", desc: "Enable/Disable antidelete", category: "owner" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        const action = args[0] ? args[0].toLowerCase() : "";

        if (action === "on") {
            db.antiDelete = true;
            fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
            await reply("🛡️ *Anti-Delete Enabled!* Deleted messages will now be recovered.");
        } else if (action === "off") {
            db.antiDelete = false;
            fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
            await reply("❌ *Anti-Delete Disabled!*");
        } else {
            await reply("❌ *Usage:* `.antidelete on` or `.antidelete off`");
        }
    } catch (e) { 
        console.error(e);
        reply("❌ *System Error!*"); 
    }
});