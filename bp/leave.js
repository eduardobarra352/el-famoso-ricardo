const ytdl = require('ytdl-core');

exports.run = async (bot, message, args, opus) => {
        if (!message.member.voiceChannel) return message.channel.send(":x: No estas en un canal de voz, porfa lentra™");
        if (!message.guild.me.voiceChannel) return message.reply(":no_entry: No puedo conectarme al tal canal de voz sorri");
        if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send(":x: no estas en el canal de voz correcto,,,");
        message.guild.me.voiceChannel.leave();
        message.channel.send(":runner: Saliendo del canal de voz,,,").then(msg => msg.delete(2000));
        console.log(`>leave usado por: ${message.author.tag} en el server ${message.guild.name}`);
}
