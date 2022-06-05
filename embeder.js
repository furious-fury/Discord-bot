require('dotenv').config();
const Discord = require('discord.js');
const axios = require('axios').default;
const { MessageEmbed } = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {

    if (message.content.startsWith('!price')) {
        const SLUG = message.content.replace('!price ', '')

        // let URL = `https://api.coingecko.com/api/v3/simple/price?ids=${SLUG}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
        let URL = `https://api.nomics.com/v1/currencies/ticker?key=${process.env.NOMICS_API}&ids=${SLUG}&interval=1d&convert=USD&platform-currency=USD&per-page=100&page=1`
    axios.get(URL)
  .then(function (response) {
    // handle success

    // console.log(`response.data.${SLUG}`)

    const SlugValue = `${SLUG}`

    console.log(response)

    // function SlugObject (SLUG) {
    //     var NewSlugObject = `response.data.${SLUG}`
    //     console.log(JSON.parse(NewSlugObject))
    // }

    // SlugObject(SLUG)

    const Embed = new MessageEmbed()
    .setColor('#218500')
    .setTitle(`**${SLUG.toUpperCase()}**`)
    // .setDescription('some description')
    // .addFields(
    //     { name: `PRICE`, value: response.data[0].price },
    //     { name: `MARKET CAP`, value: response.data[0].market_cap },
    //     { name: `24 HOUR CHANGE`, value: `${response.data[0].price}`})
    .setTimestamp()
    .setFooter({ text: 'Crypto Market Cap & Pricing Data Provided By CoinGecko', iconURL: 'https://www.coingecko.com/'});
         message.channel.send({ embeds: [Embed] });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
            }
    });

client.login(process.env.BOT_MEME);