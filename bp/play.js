const ytdl = require('ytdl-core');

function finish(bot, opus, dispatcher) {
  let fetched = opus.activo.get(dispatcher.guildID);
  fetched.queue.shift();
  if (fetched.queue.lenght > 0) {
    opus.activo.set(dispatcher.guildID, fetched);
    play(bot, opus, fetched);
  }
  else {
    opus.activo.delete(dispatcher.guildID);
    let vc = bot.guilds.get(dispatcher.guildID).me.voiceChannel;
    if (vc) vc.leave();
  }
}

async function play(bot, opus, data) {
  bot.channels.get(data.queue[0].announceChannel).send(`:musical_note: Ahorita por fin escuchas: **${data.queue[0].songTitle}** | Elegido de: **${data.queue[0].requester}**`);
  data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly' }));
  data.dispatcher.guildID = data.guildID;
  data.dispatcher.once('end', function() {
    finish(bot, opus, this);
  });
}

exports.run = async (bot, message, args, opus, activo) => {
        if (!message.member.voiceChannel) return message.channel.send(":x: No estas en un canal de voz, porfa lentra™");
        //if (message.guild.me.voiceChannel) return message.channel.send("uy pero ya estoi en elcanal de voz jej");
        if (!args[0]) return message.reply("```>play [url]```");
        let validate = await ytdl.validateURL(args[0]);
        if (!validate) return message.reply(":no_entry: El Url es incorrecto o no es existente u.u");
        let info = await ytdl.getInfo(args[0]);
        //let connection = await message.member.voiceChannel.join();
        //let dispatcher = await connection.play(ytdl(args[0], { filter: "audioonly" }));
        //message.channel.send(`:musical_note: Ahorita escuchando: **${info.title}**`);
        const data = opus.activo.get(message.guild.id) || {};
        if (!data.connection) data.connection = await message.member.voiceChannel.join();
        if (!data.queue) data.queue = [];
        data.guildID = message.guild.id;
        data.queue.push({
          songTitle: info.title,
          requester: message.author.tag,
          url: args[0],
          announceChannel: message.channel.id
        });
        if (!data.dispatcher) play(bot, opus, data);
        else {
          message.channel.send(`:notes: Se ha añadido al video **${info.title}** a la lista lel | Idea de: **${message.author.id}**`);
        }
        opus.activo.set(message.guild.id, data);
}
