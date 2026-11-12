import { cmd } from '../command.js';
import axios from 'axios';

cmd({ pattern: "weather", desc: "Get weather info", category: "fun" }, async (zanta, mek, m, { from, args, reply }) => {
    const city = args.join(" ");
    if (!city) return reply("❌ Type City name (EX: `.weather Colombo`).");
    try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b1b15e88fa797225412429c1c50c122a1&units=metric`);
        await reply(`🌤 *Weather in ${city}*\n\n🌡 *Temp:* ${res.data.main.temp}°C\n☁️ *Condition:* ${res.data.weather[0].main}\n💧 *Humidity:* ${res.data.main.humidity}%`);
    } catch (e) { reply("❌ System Error."); }
});