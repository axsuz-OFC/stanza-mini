import { cmd } from '../command.js';

cmd({
    pattern: "ping",
    desc: "Check bot speed",
    category: "main"
}, async (zanta, mek, m, { from, reply }) => {
    
    const start = new Date().getTime();
    // පින්තූරයත් එක්කම "Pinging..." එවනවා
    const msg = await reply("*ᴘɪɴɢɪɴɢ...*"); 
    const end = new Date().getTime();
    
    await zanta.sendMessage(from, { 
        text: `❤️😉💯 *ᴘᴏɴɢ!*\n\n📡 *sᴘᴇᴇᴅ:* ${end - start} ms`, 
        edit: msg.key 
    });
});