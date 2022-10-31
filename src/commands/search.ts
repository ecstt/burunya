import { EmbedBuilder } from "@discordjs/builders";
import { ytSearch } from "../helpers/ytApi";
import { play } from "./play";

export const search = async (message, server, args?) => {
  var videos;
  const search_query = args.join("+").trim();
  videos = await ytSearch(search_query);
  let index = 0;
  var response = "";
  while (index < videos.length) {
    response = response + (index + 1) + " # " + videos[index].title + "\n";
    index++;
  }
  const embed = new EmbedBuilder()
    .setColor(0x3393ff)
    .setTitle("CHOOSE TYPING THE NUMBER")
    .setDescription(response)
    .setTimestamp()
    .setFooter({ text: "Burunya" });
  await message.reply({ embeds: [embed] });
  const filter = (m) => m.content.match(/[1-9]{1}[\d]{0,1}/) != null;
  const awaited = await message.channel
    .awaitMessages({
      filter,
      max: 1,
      time: 15_000,
    })
    .then((collected) => {
      var selectedVideo: number = parseInt(collected.first().content);
      if (selectedVideo > videos.length)
        return message.reply("number exceeds limits");
      const uri =
        "https://www.youtube.com/watch?v=" + videos[selectedVideo - 1].id;
      console.log(uri);
      play(message, server, [uri]);
    })
    .catch((collected) => {
      message.reply("Timed Out");
    });
};
