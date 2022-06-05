require('dotenv').config();
const Discord = require('discord.js');
const axios = require('axios').default;

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.BOT_MEME);


client.on('message', async msg => {
  async function getMeme(){
    const res = await axios.get('https://memeapi.pythonanywhere.com/');
    return res.data.memes[0].url;
  }
    switch (msg.content) {
      //our meme command below
      case "!meme":
        msg.channel.send("Here's your meme!"); //Replies to user command
        const img = await getMeme(); //fetches an URL from the API
        msg.channel.send(img); //send the image URL
        break;
     }
  })
