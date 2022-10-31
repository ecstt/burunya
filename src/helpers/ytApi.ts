import https from "node:https";

export const ytSearch = (searchQuery: String) => {
  var str = "";
  var videos = [];
  const baseuri = "https://www.youtube.com/results?search_query=";
  return new Promise((resolve, reject) => {
    https.get(baseuri + searchQuery, (res) => {
      res.on("data", (chunk) => {
        str += chunk;
      });
      res.on("end", () => {
        const ytsearch = str.match(/"videoRenderer":[^]*?"longBylineText"/g);
        var i = 0;
        while (ytsearch[i] != undefined) {
          videos[i] = {
            id: ytsearch[i].match(/"videoId":"[^\"]*/)[0].substring(11),
            title: ytsearch[i].match(/"text":"[^]*?(?="})/)[0].substring(8),
          };
          i++;
        }
        resolve(videos);
      });
      res.on("error", reject);
    });
  });
};
