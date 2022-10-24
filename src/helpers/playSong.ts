import ytdl from "ytdl-core";
import OpusScript = require("opusscript");
import {
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
  AudioPlayerStatus,
  entersState,
} from "@discordjs/voice";

export const playSong = async (message, server) => {
  const song = server.queue[0];
  const format = "251";
  //create audio player
  server.player = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Stop,
    },
  });
  //subscribe audio player to connection
  server.connection.subscribe(server.player);
  if (song) {
    const stream = createAudioResource(ytdl(song.title, { quality: format }));
    server.player.play(stream);
    try {
      await entersState(server.player, AudioPlayerStatus.Playing, 5_000);
      server.playing = true;
    } catch (err) {
      console.log(err);
    }
    server.player.on(AudioPlayerStatus.Idle, () => {
      server.playing = false;
      server.queue.shift();
      playSong(message, server);
    });
  }
};
