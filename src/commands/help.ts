export const help = (message, args?) => {
  message.reply(
    `${process.env.DISCORD_PREFIX}prefix <newprefix> - to change prefix\n` +
      `${process.env.DISCORD_PREFIX}play <ytLink> - play from yt (also: ${process.env.DISCORD_PREFIX}p)\n` +
      `${process.env.DISCORD_PREFIX}skip - skip song (also: ${process.env.DISCORD_PREFIX}s)\n` +
      `${process.env.DISCORD_PREFIX}clear - clear queue\n` +
      `${process.env.DISCORD_PREFIX}quit - quit channel (also: ${process.env.DISCORD_PREFIX}leave/disconnect/stop)`
  );
};
