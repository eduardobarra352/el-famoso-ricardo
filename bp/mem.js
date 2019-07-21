const meme = require('nodejs-meme-generator');
const http = require('http');
const fs = require('fs');

exports.run = async (bot, message, args, AttachImagen) => {
  let memeGenerator = new meme({
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
  memeGenerator.generateMeme({
    topText: 'Meme',
    bottomText: 'Generator',
    url: 'https://i.imgur.com/7FHoSIG.png'
   })
   .then(function(data) {
    fs.readFile('file.jpg', function(err, data) {
      if (err) return message.channel.send(":x: Uy, un erroralgo feo, mmmm siga intentando");
      http.createServer(function(req, res) {
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(data);
        message.channel.send({file: (data) });
      })
    });
   });
}
