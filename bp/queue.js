exports.run = async (bot, message, args, opus) => {
  let fetched = opus.active.get(message.guild.id);
  if (!fetched) return message.channel.send(":x: Mmmmm no hayotro video o audio en la lista");
  let queue = fetched.queue;
  let nowPlaying = queue[0];
  let resp = `**Ahora reproduciendo**: \n-__${nowPlaying.songTitle}__ | Puesta por: **${nowPlaying.requester}** \n\n**Lista**: \n`);
  for (var i = 1; i < queue.lenght; i++) {
    resp += `${i}. __${queue[i].songTitle}__ | Puesta por: **${queue[i].requester}** \n`;
  }
  message.channel.send(resp);
}
