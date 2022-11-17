export const ping = (message) => {
  message.reply(`Pong: ${Date.now() - message.createdTimestamp}ms`);
};
