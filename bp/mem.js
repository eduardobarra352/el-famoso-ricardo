const meme = require('nodejs-meme-generator');

exports.run = async (bot, message, args, AttachImagen) => {
  let memeGenerator = new meme({
    canvasOptions: {
      canvasWidth: 500,
      canvasHeight: 500
    },
    fontOptions: {
      fontSize: 46,
      fontFamily: 'impact',
      lineHeight: 2
    }
  });
  memeGenerator.generateMeme({
    topText: 'Meme',
    bottomText: 'Generator',
    url: 'https://i.imgur.com/7FHoSIG.png'
   })
   .then(function(data) {
    console.log(data);
   });
}
