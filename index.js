require("dotenv").config();
const { getFpCommand, Execute } = require("./commands/command");
const {
  Client,
  GatewayIntentBits,
  Routes,
  REST,
  Events,
} = require("discord.js");

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const GUILD_ID = process.env.DISCORD_GUILD_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: "10" }).setToken(TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const AllCommands = [getFpCommand.toJSON()];

async function main() {
  try {
    console.log("Started refreshing application (/) commands");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: AllCommands,
    });
    console.log("Successfully reloaded application (/) commands.");

    client.login(TOKEN);
  } catch (error) {
    console.log(error);
  }
}

client.on(Events.InteractionCreate, (interaction) => {
  if (interaction.commandName === "getfp") {
    Execute(interaction);
  }
});

main();
