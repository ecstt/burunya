export const queue = async (message, server) => {
  if (!message.member.voice.channel)
    return message.reply("Not in a voice Channel");
  if (!server.playing) return message.reply("Not playing");
  if (server.queue.length == 0) return message.reply("Queue empty");
  let response = "```";
  let index = 0;
  while (index < server.queue.length) {
    response = response + index + " - " + server.queue[index].title + "\n";
    index++;
  }
  response = response.trim();
  response = response + "```";
  message.reply(response);
};
