import { validURL } from "../helpers/urlCheck";
import { playSong } from "../helpers/playSong";
import {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  NoSubscriberBehavior,
} from "@discordjs/voice";

export const play = async (message, server, args?) => {
  if (!message.member.voice.channel)
    return message.reply("Not in a voice Channel");
  if (!args[0]) return message.reply("No link");
  //only link support
  if (!validURL(args[0])) return message.reply("Only supports YT links");
  const videoLink = args[0];
  server.queue.push({ title: videoLink as String, isUrl: true });
  const newSong = server.queue[server.queue.length - 1];
  //check if bot is already in the channel
  /* if (
    server.connection === null ||
    server.connection.joinConfig.channelId != message.member.voice.channelId
  ) {
    //try to join voice channel
    console.log("Changing channel...");
    try {
      server.connection = await joinVoiceChannel({
        channelId: message.member.voice.channelId,
        guildId: message.member.voice.channel.guildId,
        adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
      });
    } catch (err) {
      return message.reply("error connecting");
    }
  } */
  try {
    server.connection = await joinVoiceChannel({
      channelId: message.member.voice.channelId,
      guildId: message.member.voice.channel.guildId,
      adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
    });
  } catch (err) {
    return message.reply("error connecting");
  }
  //check if audio is already playing

  if (!server.playing) return playSong(message, server);
  return message.channel.send(`Added ${newSong.title} to the queue`);
};
