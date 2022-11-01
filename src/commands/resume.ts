export const resume = async (message, server, args?) => {
  if (server.player !== null) server.player.unpause();
};
