import { playSong } from "../helpers/playSong";
import { stop } from "./stop";
export const skip = async (message, server, args?) => {
  if (!message.member.voice.channel)
    return message.reply("Not in a voice Channel");
  if (server.playing) {
    //add verifica se args è un numero e se è minore uguale a server.queue.length()
    //add shift di quel numero, se è maggiore fai stop
    if (args[0] && server.queue.length >= args[0]) {
      for (let index = args[0] - 1; index > 0; index--) server.queue.shift();
    }
    server.queue.shift();
    if (server.queue[0]) playSong(message, server);
    else stop(message, server);
  }
};
