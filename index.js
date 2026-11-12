import baileys from "@whiskeysockets/baileys";
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, Browsers, getContentType, fetchLatestWaWebVersion } = baileys;

import P from "pino";
import fs from "fs";
import path from "path";
import config from "./config.js";
import { commands } from "./command.js";
import { fileURLToPath } from 'url';
import { checkLink } from "./plugins/antilink.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- DATABASE LOAD FUNCTION ---
const dbPath = path.join(__dirname, 'database.json');
const readDB = () => {
    if (!fs.existsSync(dbPath)) return {};
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
};

if (!global.msgStore) global.msgStore = new Map();
if (!global.isPairing) global.isPairing = false; // Pairing Loop එක නවත්තන්න

const logger = P({ level: "silent" });

const loadPlugins = async () => {
    const pluginDir = path.join(__dirname, 'plugins');
    if (!fs.existsSync(pluginDir)) fs.mkdirSync(pluginDir);
    const files = fs.readdirSync(pluginDir).filter(file => file.endsWith('.js'));
    for (const file of files) {
        try { await import(`./plugins/${file}`); } catch (e) { console.error(`Error loading plugin ${file}:`, e.message); }
    }
    console.log(`✅ Loaded ${commands.length} Commands from Plugins!`);
};

const sms = (zanta, mek) => {
    const type = getContentType(mek.message);
    let body = "";
    if (type === "conversation") body = mek.message.conversation;
    else if (type === "extendedTextMessage") body = mek.message.extendedTextMessage.text;
    else if (type === "buttonsResponseMessage") body = mek.message.buttonsResponseMessage.selectedButtonId;
    else if (type === "listResponseMessage") body = mek.message.listResponseMessage.singleSelectReply.selectedRowId;
    return { body, type };
};

async function connectToWA() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");
    
    let version;
    try {
        const waVersion = await fetchLatestWaWebVersion();
        version = waVersion.version;
    } catch (e) { version = [2, 3000, 1023223821]; }

    const zanta = makeWASocket({
        logger: logger,
        printQRInTerminal: false,
        browser: Browsers.macOS("Desktop"),
        auth: state,
        version: version,
        connectTimeoutMs: 60000,
    });

    zanta.ev.on("creds.update", saveCreds);

    zanta.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        const db = readDB();

        // --- Pairing Code Logic (Loop එක නවත්තපු අලුත් කේතය) ---
        if (!zanta.authState.creds.registered && !global.isPairing) {
            global.isPairing = true; // එක පාරක් විතරයි ඉල්ලන්න මේක දානවා
            
            setTimeout(async () => {
                try {
                    const cleanNumber = config.OWNER_NUMBER.replace(/[^0-9]/g, '').trim(); 
                    
                    console.log(`\n⏳ Connecting using number: ${cleanNumber}...`);
                    
                    const code = await zanta.requestPairingCode(cleanNumber);
                    console.log(`\n=========================================`);
                    console.log(`🔑 YOUR PAIRING CODE: ${code}`);
                    console.log(`=========================================\n`);
                    console.log(`👉 මේ කේතය දැන්ම WhatsApp එකට ගිහින් දාන්න!`);
                } catch (error) { 
                    console.error("❌ Pairing error: ", error.message); 
                    global.isPairing = false; // Error එකක් ආවොත් ආයේ ට්‍රයි කරන්න ඉඩ දෙනවා
                }
            }, 5000); 
        }

        if (connection === "close") {
            if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
                global.isPairing = false; // නැවත සම්බන්ධ වෙද්දී ආයේ Pairing ඉල්ලන්න ඉඩ දෙනවා
                connectToWA();
            }
        } else if (connection === "open") {
            console.log(`✅ Bot Connected Successfully!`);
            
            const botNumber = zanta.user.id.split(':')[0];
            const randomInstance = Math.floor(10 + Math.random() * 90);

            setInterval(async () => {
                const currentDb = readDB();
                if (currentDb.alwaysOnline) await zanta.sendPresenceUpdate('available');
            }, 30000);

            if (db.connectMsg !== false) {
                setTimeout(async () => {
                    try {
                        await zanta.newsletterFollow(config.CHANNEL_JID);
                        const connectMsg = `╭─❰ 𝚂𝚃𝙰𝙽𝚉𝙰-𝙼𝙳 𝙲𝙾𝙽𝙽𝙴𝙲𝚃𝙴𝙳 ❱─➢\n│\n│  📟 *Instance:* \`${randomInstance}\`\n│  👤 *User:* \`${botNumber}\`\n│\n│ \`Active වෙන්න විනාඩි 6ක් විතර යනවා\`\n│ \`ඉවසලා ඉන්න , ආස හිතෙයි🙈💗😖🥰🤟\`\n│\n│  🛠 *Use:*\n│  *📂View All cmd:* \`.menu\`\n│  *⚙️ Change settings:* \`.settings\`\n│\n╰──────────────➢\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜱᴛᴀɴᴢᴀ_ ᴍɪɴɪ </>`;

                        const imgPath = path.join(__dirname, 'stanza.jpg');
                        if (fs.existsSync(imgPath)) {
                            await zanta.sendMessage(zanta.user.id, { image: fs.readFileSync(imgPath), caption: connectMsg });
                        } else {
                            await zanta.sendMessage(zanta.user.id, { text: connectMsg });
                        }
                    } catch (e) { console.log("Connect Msg Error:", e.message); }
                }, 3000);
            }
        }
    });

    zanta.ev.on("messages.upsert", async ({ messages }) => {
        const mek = messages[0];
        if (!mek.message || mek.key.remoteJid === 'status@broadcast') return;

        const db = readDB();
        const from = mek.key.remoteJid;

        // Anti-Delete
        if (!mek.key.fromMe) global.msgStore.set(mek.key.id, mek);
        if (mek.message?.protocolMessage?.type === 0 && db.antiDelete === true) {
            const deletedId = mek.message.protocolMessage.key.id;
            const oldMsg = global.msgStore.get(deletedId);
            if (oldMsg && !oldMsg.key.fromMe) {
                const mType = getContentType(oldMsg.message);
                const sender = oldMsg.key.participant || oldMsg.key.remoteJid;
                const deletedText = oldMsg.message.conversation || oldMsg.message[mType]?.text || oldMsg.message[mType]?.caption || "Media Message";
                const alertMsg = `🚨 *ANTI-DELETE DETECTED* 🚨\n\n👤 *Sender:* @${sender.split('@')[0]}\n📝 *Deleted Message:* \n${deletedText}`;
                await zanta.sendMessage(from, { text: alertMsg, mentions: [sender] }, { quoted: mek });
            }
        }

        await checkLink(zanta, mek, from);

        const m = sms(zanta, mek);
        const body = m.body;
        if (!body) return;

        if (db.autoRead) await zanta.readMessages([mek.key]);
        if (db.autoTyping) await zanta.sendPresenceUpdate('composing', from);
        if (db.autoReact && !mek.key.fromMe) {
            const emojis = ['❤️', '👍', '💫', '✨'];
            await zanta.sendMessage(from, { react: { text: emojis[Math.floor(Math.random() * emojis.length)], key: mek.key } });
        }

        const prefix = db.prefix || '.';
        const isCmd = body.startsWith(prefix) || m.type === "buttonsResponseMessage" || m.type === "listResponseMessage";

        if (isCmd) {
            const args = body.trim().split(/ +/).slice(1);
            let commandName = body.startsWith(prefix) ? body.slice(prefix.length).trim().split(/ +/)[0].toLowerCase() : body.toLowerCase();
            const cmd = commands.find(c => c.pattern === commandName || (c.alias && c.alias.includes(commandName)));

            if (cmd) {
                const reply = async (text) => {
                    try {
                        const imgPath = path.join(__dirname, 'stanza.jpg');
                        if (fs.existsSync(imgPath)) return await zanta.sendMessage(from, { image: fs.readFileSync(imgPath), caption: text }, { quoted: mek });
                        return await zanta.sendMessage(from, { text: text }, { quoted: mek });
                    } catch (err) { return await zanta.sendMessage(from, { text: text }, { quoted: mek }); }
                };

                try {
                    await cmd.function(zanta, mek, m, { from, args, reply, db });
                } catch (e) {
                    if (e.message.includes('fetch') || e.message.includes('network') || e.message.includes('ENOTFOUND') || e.message.includes('timeout')) {
                        reply("❌ *Fetch Failed!*\n\n⚠️ API or Network issue.");
                    } else {
                        reply("❌ *System Error!*\n\n⚠️ Something went wrong.");
                    }
                }
            }
        }
    });
}

async function startSystem() {
    await loadPlugins();
    await connectToWA();
}

startSystem();