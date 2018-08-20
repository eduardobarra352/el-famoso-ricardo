const ytdl = require('ytdl-core');

exports.run = async (bot, message, prefix, args, opus) => {
        if (!message.member.voiceChannel) return message.channel.send(":x: No estas en un canal de voz, porfa lentra™");
        if (message.guild.me.voiceChannel) return message.channel.send("uy pero ya estoi en elcanal de voz jej");
        if (!args[0]) return message.reply("```>play [url]```");
        let validate = await ytdl.validateURL(args[0]);
        if (!validate) return message.reply(":no_entry: El Url es incorrecto o no es existente u.u");
        let info = await ytdl.getInfo(args[0]);
        let connection = await message.member.voiceChannel.join();
        let dispatcher = await connection.playStream(ytdl(args[0], { filter: "audioonly" }));
        message.channel.send(`:musical_note: Ahorita escuchando: ${info.title}`);
    if (cmd === `${prefix}leave`) {
        if (!message.member.voiceChannel) return message.channel.send(":x: No estas en un canal de voz, porfa lentra™");
        if (!message.guild.me.voiceChannel) return message.reply(":no_entry: No puedo conectarme al tal canal de voz sorri");
        if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send(":x: no estas en el canal de voz correcto,,,");
        message.guild.me.voiceChannel.leave();
        message.channel.send(":runner: Saliendo del canal de voz,,,").then(msg => msg.delete(2000));
    }
}
