const { default: axios } = require("axios");
const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const getFpCommand = new SlashCommandBuilder()
  .setName("getfp")
  .setDescription("Check the floor price of a collection!")
  .addStringOption((option) =>
    option.setName("slug").setDescription("Collection slug").setRequired(true)
  );

async function Execute(interaction) {
  //getting slug value from interaction
  const SLUG = interaction.options.get("slug").value;
  //fetching data from opensea
  try {
    const res = await axios.get(
      `https://api.opensea.io/api/v1/collection/${SLUG}`
    );
    console.log(res.data);
    // utility function for formatting data
    function kFormatter(num) {
      return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
        : Math.sign(num) * Math.abs(num);
    }

    function truncate(str, n) {
      return str.length > n ? str.substr(0, n - 1) + " …;" : str;
    }
    // creating success embed
    const successEmbed = new EmbedBuilder()
      .setColor("#218500")
      .setTitle(`${res.data.collection.name}`)
      .setURL(`https://opensea.io/collection/${res.data.collection.slug}`)
      .setDescription(`*${truncate(res.data.collection.description, 300)}*`)
      .setThumbnail(`${res.data.collection.image_url}`)
      .addFields(
        {
          name: "FLOOR PRICE",
          value: `Ξ${res.data.collection.stats.floor_price.toFixed(3)}`,
        },
        {
          name: "VOLUME",
          value: `Ξ${kFormatter(
            res.data.collection.stats.total_volume.toFixed(3)
          )}`,
        },
        {
          name: "TOTAL SUPPLY",
          value: res.data.collection.stats.total_supply,
        },
        { name: "OWNERS", value: `${res.data.collection.stats.num_owners}` }
      )
      .setTimestamp()
      .setFooter({
        text: "All data gotten from Opensea",
        iconURL:
          "https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png",
      });

    //replying the interaction if api call successful
    await interaction.reply({ embeds: [successEmbed] });
  } catch (error) {
    //creating the error embed message
    const errorEmbed = new EmbedBuilder()
      .setColor("#D20e12")
      .setTitle("**ERROR !**")
      .setDescription(
        "The bot couldn't find the requested collection because the requested name may not be the same on opensea. Please crosscheck to see if the name matches the one on the opensea URL"
      )
      .setThumbnail("https://fieryper.sirv.com/404%20Error-pana-nunu.jpg")
      .setImage("https://fieryper.sirv.com/opensea.jpg")
      .setTimestamp()
      .setFooter({
        text: "All data gotten from Opensea",
        iconURL:
          "https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png",
      });

    //replying the interaction with the error embed
    await interaction.reply({ embeds: [errorEmbed] });
  }
}
module.exports = {
  getFpCommand,
  Execute,
};
