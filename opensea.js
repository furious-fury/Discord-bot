require('dotenv').config();
const Discord = require('discord.js');
const axios = require('axios').default;
const { MessageEmbed } = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {

    if (message.content.startsWith('!fp')) {
        const SLUG = message.content.replace('!fp ', '')

        const URL = `https://api.opensea.io/api/v1/collection/${SLUG}`
        axios.get(URL)
        .then(res => {

            function kFormatter(num) {
                return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
            }
                const openseaEmbed = new MessageEmbed()
                    .setColor('#218500')
                    .setTitle(`${res.data.collection.name}`)
                    .setURL(`https://opensea.io/collection/${res.data.collection.slug}`)
                    .setDescription(`${res.data.collection.description}`)
                    .setThumbnail(`${res.data.collection.featured_image_url}`)
                    .addFields(
                        { name: 'FLOOR PRICE', value: `Ξ${res.data.collection.stats.floor_price.toFixed(2)}` },
                        { name: 'VOLUME', value: `Ξ${kFormatter(res.data.collection.stats.total_volume)}` },
                        { name: 'TOTAL SUPPLY', value: `${kFormatter(res.data.collection.stats.total_supply)}` },
                        { name: 'OWNERS', value: `${res.data.collection.stats.num_owners}` },
                    )
                    .setTimestamp()
                    .setFooter({ text: 'All data gotten from Opensea', iconURL: 'https://opensea.io/' });
                message.channel.send({ embeds: [openseaEmbed] });
        })
        .catch(err => console.error(err.success));
            }
    });

client.login(process.env.BOT_OPENSEA);