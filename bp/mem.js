const meme = require('nodejs-meme-generator');

exports.run = async (bot, message, args, AttachImagen) => {
  if (!args[0] && !message.attachments.size) return message.reply("```>meme [url] [tExTo] \n>meme [TeXtO] <imagen>```");
  if (message.attachments.size > 0) {
    if (!args[0]) return message.reply(":x: nohay ninguntexto aparteXD sigale,,,,");
    let barra = '|';
    let indexBarra = args.indexOf(barra);
    let toptext;
    let bottomtext;
    if (indexBarra) {
      toptext = args.slice(0, indexBarra).join(' ');
      bottomtext = args.slice(indexBarra+1).join(' ');
    }
    if (indexBarra == -1) bottomtext = args.slice(indexBarra).join(' ');
    if (indexBarra) args.splice(indexBarra);
    if (bottomtext == undefined && args > 0) {
      toptext = args.slice(0, Math.max(args.length / 2)).join(' ');
      bottomtext = args.slice(Math.max(args.length / 2)).join(' ');
    }
    message.channel.startTyping();
    let imagen = message.attachments.first().url;
    let anchura = message.attachments.first().width;
    let altura = message.attachments.first().height;
    let opt = new meme({
      canvasOptions: {
        canvasWidth: anchura,
        canvasHeight: altura
      },
      fontOptions: {
        fontSize: 46,
        fontFamily: 'impact',
        lineHeight: 4
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
