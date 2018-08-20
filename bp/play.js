const ytdl = require('ytdl-core');

exports.run = async (bot, message, args, opus) => {
        if (!message.member.voiceChannel) return message.channel.send(":x: No estas en un canal de voz, porfa lentra™");
        if (message.guild.me.voiceChannel) return message.channel.send("uy pero ya estoi en elcanal de voz jej");
        if (!args[0]) return message.reply("```>play [url]```");
        let validate = await ytdl.validateURL(args[0]);
        if (!validate) return message.reply(":no_entry: El Url es incorrecto o no es existente u.u");
        let info = await ytdl.getInfo(args[0]);
        let connection = await message.member.voiceChannel.join();
        let dispatcher = await connection.playStream(ytdl(args[0], { filter: "audioonly" }));
        message.channel.send(`:musical_note: Ahorita escuchando: ${info.title}`);
}
