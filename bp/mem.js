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
    fs.readFile(data, function(err, mem) {
      if (err) { message.channel.send(":x: Uy, un erroralgo feo, mmmm siga intentando"); console.log(err); }
      http.createServer(function(req, res) {
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(data);
        message.channel.send({file: (mem) });
      })
    });
   });
}
