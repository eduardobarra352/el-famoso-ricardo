const Cleverbot = require('cleverbot.io');

exports.run = async (bot, message, args) => {
 'use strict';
 let input = args.join(' ');
 if (!input) return message.reply("```>di [intenta hablarle owo]```");
 let clbt = new Cleverbot('3hvWzi38KHKHHY0y', 'vdAjTZR6qfnxKmJOX9cSotqjD5K1qzxK');
 clbt.setNick('Ricardo');
 clbt.create(function (err, session) {
   clbt.ask(input, function (err, response) {
         console.log(session + ':', response)
         message.channel.send(`:speech_balloon: Respondiendo,,,`).then(msg => msg.delete(5000));
         message.channel.send(response);
       });
   });
}
