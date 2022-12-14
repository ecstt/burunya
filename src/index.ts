import "dotenv/config";
import Commands from "./commands/commands";

import {
  Client,
  GatewayIntentBits,
  Collection,
  ClientVoiceManager,
  ButtonComponent,
  ContextMenuCommandAssertions,
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
//ON_READY

bot.on("ready", () => {
  console.log(`${bot.user.tag} logged in.`);
});

var servers = {};
var selectedVideo: Number = null;

//MESSAGE_CATCH

bot.on("messageCreate", async (message) => {
  if (!servers[message.guild.id])
    servers[message.guild.id] = {
      queue: [],
      playing: false,
      looping: false,
      connection: null,
      player: null,
      prefix: process.env.DISCORD_PREFIX,
    };
  var server = servers[message.guild.id];
  if (message.author.bot) return;
  /* if (server.searchResult.length != 0) {
    if (
      (selectedVideo = parseInt(message.content.match(/[1-9]{1}[\d]{0,1}/)[0]))
    ) {
      console.log(selectedVideo);
      server.searchResult = [];
    }
  } */
  if (!message.content.startsWith(server.prefix)) return;
  //if server doesn't have a queue add server to servers
  //list with a new queue

  const [CMD_NAME, ...args] = message.content
    .trim()
    .substring(server.prefix.length)
    .split(/\s+/);
  console.log(
    `New message from: [${message.guildId}.${message.channelId}] - ${message.author.tag}: ${message.content}`
  );
  switch (CMD_NAME) {
    case "h":
    case "help":
      Commands.help(message, server, args);
      break;
    case "prefix":
      Commands.prefix(message, server, args);
      break;
    case "s":
    case "search":
      Commands.search(message, server, args);
      break;
    case "p":
    case "play":
      Commands.play(message, server, args);
      break;
    case "pause":
      Commands.pause(message, server, args);
      break;
    case "resume":
      Commands.resume(message, server, args);
      break;
    case "skip":
      Commands.skip(message, server, args);
      break;
    case "q":
    case "queue":
      Commands.queue(message, server);
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
    case "ping":
      Commands.ping(message);
      break;
  }
});

bot.login(process.env.DISCORD_TOKEN);
