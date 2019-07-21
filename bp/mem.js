const meme = require('nodejs-meme-generator');

exports.run = async (bot, message, args, AttachImagen) => {
  if (!args[0] && !message.attachments.size) return message.reply("```>meme [url] [tExTo] \n>meme [TeXtO] <imagen>```");
  if (message.attachments.size > 0) {
    if (!args[0]) return message.reply(":x: nohay ninguntexto aparteXD sigale,,,,");
    let barra = ' | ';
    let toptext = args.join(' ').slice(0, barra);
    let bottomtext = args.slice(barra);
    if (bottomtext == undefined) bottomtext = args.slice(Math.ceil(toptext.length / 2));
    message.channel.startTyping();
    let imagen = message.attachments.first().url;
    let anchura = message.attachments.first().width;
    let altura = message.attachments.first().height;
    console.log(toptext);
    let opt = new meme({
      canvasOptions: {
        canvasWidth: anchura,
        canvasHeight: altura
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
  }
}
