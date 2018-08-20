exports.run = async (bot, message, prefix, args, pdfcrowd, clientee) => {
      if (!args[0]) return message.reply("```>breakingnews [headline] | [ticker] | [imageurl]```");
      let headline = args.join(' ');
      let ticker = args.join(' ');
      let imageurl = args.join(` `);
      if (!headline) return message.channel.send(":x: estan malpuestos o son incorrectos, intentaaaXD");
      if (!ticker) return message.channel.send(":x: estan malpuestos o son incorrectos, intentaaaXD");
      if (!imageurl) return message.channel.send(":x: estan malpuestos o son incorrectos, intentaaaXD");
          if (message.content === `${prefix}breakingnews` && headline && `|` && ticker && `|` && imageurl) {
              message.channel.send(`:speech_balloon: Enviando,,,`).then(msg => msg.delete(4000));
              try {
                clientee.setOutputFormat("png");
              } catch(why) {
                console.error("Pdfcrowd Error: " + why);
                console.error("Pdfcrowd Error Code: " + why.getCode());
                console.error("Pdfcrowd Error Message: " + why.getMessage());
                process.exit(1);
              }
              clientee.convertStringToFile(
                `<script type="text/javascript" src="https://www.breakyourownnews.com/script.js?v=2.15"></script><link href="https://fonts.googleapis.com/css?family=Signika" rel="stylesheet"><canvas id="canvasOne" width="1280" height="720" class="byon-canvas">.</canvas>`,
                "breakingnews.png",
                function(err, fileName) {
                  if (err) return console.error("Pdfcrowd Error: " + err);
                  console.log("Success: the file was created " + fileName);
                  message.channel.send({file: ("breakingnews.png")});
                });
          }
}
