export const prefix = (message, server, args?) => {
  if (!args[0]) return message.reply("no prefix");
  const newPrefix = args[0].match(/^[^0-9]+?[^\w@#]{1}$/);
  if (!newPrefix) {
    return message.reply("prefix invalid, example: b!");
  }
  server.prefix = newPrefix[0];
  message.reply("```" + `changed prefix to ${server.prefix}` + "```");
};
