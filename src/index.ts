import "dotenv/config";
import Commands from "./commands/commands";

import {
  Client,
  GatewayIntentBits,
  Collection,
  ClientVoiceManager,
} from "discord.js";

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

var servers = {};
//ON_READY

bot.on("ready", () => {
  console.log(`${bot.user.tag} logged in.`);
});

var servers = {};

//MESSAGE_CATCH

bot.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(process.env.DISCORD_PREFIX)) return;
  //if server doesn't have a queue add server to servers
  //list with a new queue
  if (!servers[message.guild.id])
    servers[message.guild.id] = {
      queue: [],
      playing: false,
      connection: null,
      player: null,
    };
  var server = servers[message.guild.id];

  const [CMD_NAME, ...args] = message.content
    .trim()
    .substring(process.env.DISCORD_PREFIX.length)
    .split(/\s+/);
  switch (CMD_NAME) {
    case "h":
    case "help":
      Commands.help(message, args);
      break;
    case "prefix":
      Commands.prefix(message, args);
      break;
    case "p":
    case "play":
      Commands.play(message, server, args);
      break;
    case "clear":
      Commands.clear(message, server);
      break;
    case "leave":
    case "disconnect":
    case "stop":
    case "quit":
      Commands.stop(message, server);
      break;
  }
});

bot.login(process.env.DISCORD_TOKEN);
