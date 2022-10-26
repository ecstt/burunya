import { EmbedBuilder } from "@discordjs/builders";

export const help = (message, server, args?) => {
  const embed = new EmbedBuilder()
    .setColor(0x3393ff)
    .setTitle("HELP")
    .setDescription("Command list of Burunya")
    .addFields(
      {
        name: "```" + `${server.prefix}prefix` + "```",
        value: "change prefix",
      },
      {
        name: "```" + `${server.prefix}play <link>` + "```",
        value: "play song from yt link",
      },
      {
        name: "```" + `${server.prefix}skip <n>` + "```",
        value: "skip n songs",
      },
      { name: "```" + `${server.prefix}queue` + "```", value: "show queue" },
      { name: "```" + `${server.prefix}clear` + "```", value: "clear queue" },
      {
        name: "```" + `${server.prefix}quit` + "```",
        value: "leave channel (leave,disconnect and stop are also valid)",
      }
    )
    .setTimestamp()
    .setFooter({ text: "Burunya" });
  message.reply({ embeds: [embed] });
  /* `${process.env.DISCORD_PREFIX}prefix <newprefix> - to change prefix\n` +
      `${process.env.DISCORD_PREFIX}play <ytLink> - play from yt (also: ${process.env.DISCORD_PREFIX}p)\n` +
      `${process.env.DISCORD_PREFIX}skip - skip song (also: ${process.env.DISCORD_PREFIX}s)\n` +
      `${process.env.DISCORD_PREFIX}clear - clear queue\n` +
      `${process.env.DISCORD_PREFIX}quit - quit channel (also: ${process.env.DISCORD_PREFIX}leave/disconnect/stop)` */
};
