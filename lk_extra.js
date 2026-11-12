import { cmd } from '../command.js';
import axios from 'axios';

// 1. .currency (LKR to USD)
cmd({ pattern: "currency", alias: ["lkr"], desc: "Convert LKR to other currencies", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const amount = parseFloat(args[0]);
        const target = (args[1] || "USD").toUpperCase();
        if (!amount) return reply("❌ Usage: `.currency 1000 USD`");
        
        const res = await axios.get('https://api.exchangerate-api.com/v4/latest/LKR');
        const rate = res.data.rates[target];
        
        if (!rate) return reply("❌ Invalid currency code.");
        
        const converted = (amount * rate).toFixed(2);
        await reply(`💵 *Currency Conversion*\n\n🇱🇰 LKR: ${amount}\n🌍 ${target}: ${converted}\n\n📈 *Rate:* 1 LKR = ${rate} ${target}`);
    } catch (e) { reply("❌ *Fetch Failed!*"); }
});

// 2. .weather (කාලගුණය)
cmd({ pattern: "weather", desc: "Get weather info", category: "tools" }, async (zanta, mek, m, { from, args, reply }) => {
    try {
        const city = args.join(" ");
        if (!city) return reply("❌ Please provide a city name (Ex: `.weather Colombo`).");
        
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b1b15e88fa797225412429c1c50c122a1&units=metric`);
        await reply(`🌤 *Weather in ${city}*\n\n🌡 *Temp:* ${res.data.main.temp}°C\n☁️ *Condition:* ${res.data.weather[0].main}\n💧 *Humidity:* ${res.data.main.humidity}%`);
    } catch (e) { reply("❌ *Fetch Failed!* City not found."); }
});