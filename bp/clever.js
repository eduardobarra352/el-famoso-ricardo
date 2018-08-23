const Cleverbot = require('cleverbot.io');

exports.run = async (bot, message, args) => {
 'use strict';
 let input = process.args.slice(2).join(' ');
 if (!input) return message.reply("```>di [intenta hablarle owo]```");
 let clbt = new Cleverbot('3hvWzi38KHKHHY0y', 'vdAjTZR6qfnxKmJOX9cSotqjD5K1qzxK');
 clbt.setNick('Vlad');
 clbt.create(function (err, session) {
   clbt.ask(input, function (err, response) {
         console.log(session + ':', response)
         message.channel.send(session + ':', response);
       });
   });
}
