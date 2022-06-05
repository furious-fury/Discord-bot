require('dotenv').config();
const Discord = require('discord.js');
const axios = require('axios').default;
const { MessageEmbed } = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async messageCreate => {

    if (messageCreate.content.startsWith('!fp')) {
        const SLUG = messageCreate.content.replace('!fp ', '')

        const URL = `https://api.opensea.io/api/v1/collection/${SLUG}`
        axios.get(URL)
        .then(res => {

            function kFormatter(num) {
                return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
            }

            messageCreate.react('✅')

                const successEmbed = new MessageEmbed()
                    .setColor('#218500')
                    .setTitle(`${res.data.collection.name}`)
                    .setURL(`https://opensea.io/collection/${res.data.collection.slug}`)
                    .setDescription(`${res.data.collection.description}`)
                    .setThumbnail(`${res.data.collection.image_url}`)
                    .addFields(
                        { name: 'FLOOR PRICE', value: `Ξ${res.data.collection.stats.floor_price.toFixed(3)}` },
                        { name: 'VOLUME', value: `Ξ${kFormatter(res.data.collection.stats.total_volume.toFixed(3))}` },
                        { name: 'TOTAL SUPPLY', value: `${kFormatter(res.data.collection.stats.total_supply)}` },
                        { name: 'OWNERS', value: `${res.data.collection.stats.num_owners}` },
                    )
                    .setTimestamp()
                    .setFooter({ text: 'All data gotten from Opensea', iconURL: 'https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png' });
                    messageCreate.reply({ embeds: [successEmbed] });
        })
        .catch(err => {

            messageCreate.react('❌')

            const errorEmbed = new MessageEmbed()
            .setColor('#D20e12')
            .setTitle('**ERROR !**')
            .setDescription("The bot couldn't find the requested collectiond because the requested name may not be the same on opensea. Please crosscheck to see if the name matches the one on the opensea URL")
            .setImage('https://fieryper.sirv.com/opensea.jpg')
            .setTimestamp()
            .setFooter({ text: 'All data gotten from Opensea', iconURL: 'https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png' });
            messageCreate.reply({ embeds: [errorEmbed] });
        });
            }
    });

client.login(process.env.DISCORD_BOT_TOKEN);