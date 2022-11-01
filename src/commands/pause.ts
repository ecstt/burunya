export const pause = async (message, server, args?) => {
  if (server.player !== null) server.player.pause();
};
