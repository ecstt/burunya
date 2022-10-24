export const stop = async (message, server) => {
  try {
    if (server.connection !== null) {
      await server.connection.destroy();
      server.connection = null;
      server.queue = [];
      return message.reply("Disconnected");
    }
  } catch (err) {
    return message.reply("Can't disconnect");
  }
};
