const Cleverbot = require('cleverbot.io');

exports.run = async (bot, message, args, Log) => {
 'use strict';
 let input = args.join(' ');
 if (!input) return message.reply("```>di [intenta hablarle owo]```");
 message.channel.send(`:speech_balloon: Respondiendo,,,`).then(msg => msg.delete(12000));
 message.channel.startTyping();
 if (!args[0]) return console.log(`>di usado por: ${message.author.tag} en el server ${message.guild.name} con falta de usos`);
 let clbt = new Cleverbot('3hvWzi38KHKHHY0y', 'vdAjTZR6qfnxKmJOX9cSotqjD5K1qzxK');
 clbt.setNick('Ricardo');
 clbt.create(function (err, session) {
   clbt.ask(input, function (err, response) {
         message.channel.stopTyping();
         console.log(session + ':', response);
         message.channel.send(response);
         console.log(`>di usado por: ${message.author.tag} en el server ${message.guild.name} con su uso "${input}"`);
         Log(bot, message, args);
       });
   });
}
