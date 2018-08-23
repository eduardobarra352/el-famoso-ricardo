const Cleverbot = require('cleverbot.io');

exports.run = async (bot, message, args, msg) => {
 'use strict';
 let input = args.join(' ');
 if (!input) return message.reply("```>di [intenta hablarle owo]```");
 message.channel.send(`:speech_balloon: Respondiendo,,,`);
 let clbt = new Cleverbot('3hvWzi38KHKHHY0y', 'vdAjTZR6qfnxKmJOX9cSotqjD5K1qzxK');
 clbt.setNick('Ricardo');
 clbt.create(function (err, session) {
   clbt.ask(input, function (err, response) {
         console.log(session + ':', response);
         msg.delete();
         message.channel.send(response);
       });
   });
}
