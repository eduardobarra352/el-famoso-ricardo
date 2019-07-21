const meme = require('nodejs-meme-generator');

exports.run = async (bot, message, args, AttachImagen) => {
  if (!args[0] && !message.attachments.size) return message.reply("```>meme [url] [tExTo] \n>meme [TeXtO] <imagen>```");
  if (message.attachments.size > 0) {
    if (!args[0]) return message.reply(":x: nohay ninguntexto aparteXD sigale,,,,");
    let barra = ' | ';
    let toptext = args.slice(0, args.indexOf(barra)).join(' ');
    let bottomtext = args.slice(args.indexOf(barra)).join(' ');
    args.splice(args.indexOf(barra));
    if (bottomtext == undefined && Math.ceil(args.length / 2) > 0) toptext = args.slice(0, Math.ceil(args.length / 2)).join(' '); bottomtext = args.slice(Math.ceil(args.length / 2)).join(' ');
    console.log(toptext);
    console.log(bottomtext);
    message.channel.startTyping();
    let imagen = message.attachments.first().url;
    let opt = new meme({
      canvasOptions: {
        canvasWidth: 500,
        canvasHeight: 500
      },
      fontOptions: {
        fontSize: 46,
        fontFamily: 'arial',
        lineHeight: 3
      }
    });
    opt.generateMeme({
      topText: toptext,
      bottomText: bottomtext,
      url: imagen
     })
     .then(function(data) {
      message.channel.send({file:(data)});
    });
    message.channel.stopTyping();
  }
}
