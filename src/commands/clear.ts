export const clear = async (message, server) => {
  server.queue = [];
  message.reply("Queue cleared");
};
