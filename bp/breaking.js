exports.run = async (bot, message, cmd, prefix, args, pdfcrowd, clientee) => {
      if (!args[0]) return message.reply("```>breakingnews [headline] | [ticker] \n <imagen>```");
      let imagen = message.attachments.first().url;
      let barra = ' | ';
      let headline = args.join(' ').split(' | ');
      let ticker = args.slice(headline.lenght).join(' ');
      if (!headline) return message.channel.send(":x: sedesconoce eltitulon, siga intentando");
      if (!ticker) return message.channel.send(":x: sedesconoce lainfo destacada, siga intentando");
      if (!imagen) return message.reply(":no_entry: soloesta permitido una imagen copiada o ya descargada");
      const today = new Date();
      var m = today.getMinutes();
      var h = today.getHours();
      if (m < 10) {
          m = "0" + m
      };
          if (cmd === `${prefix}breakingnews` && headline && barra && ticker) {
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
                `<link href="https://fonts.googleapis.com/css?family=Signika" rel="stylesheet"/>\n<style type="text/css">\n.text2 {\nfont-family: Signika;\nfont-size: x-large;\ncolor: #FFFFFF;\ntext-align: center;\n}\n.auto-style1 {\nfont-family: Signika;\nfont-size: 30pt;}\n.auto-style2 {\nfont-family: Signika;\nfont-size: x-large;\ncolor: #000000;\ntext-align: left;\n}</style>\n<form id="form1" runat="server" style="width: 1024px; position: absolute; left: 0px; top: 0px; height: 546px;">\n<div style="height: 546px; position: absolute; left: 0px; top: 0px;"> \n<img height="546" src="https://github.com/eduardobarra352/el-famoso-ricardo/blob/master/img/breaking.png?raw=true" width="1024" />\n</div><img alt="" height="546" src=${imagen} width="1024" /></form>\n<p id="headli" class="auto-style1" style="position: absolute; left: 76px; top: 369px; width: 940px; height: 61px;">\n<strong>${headline}</strong></p>\n<p class="text2" style="position: absolute; left: 67px; top: 455px; width: 70px; height: 37px" id="clock">${h}:${m}</p>\n<p class="auto-style2" style="position: absolute; left: 159px; top: 456px; width: 852px; height: 30px" id="tick">\n<strong>${ticker}</strong></p>`,
                "breakingnews.png",
                function(err, fileName) {
                  if (err) return console.error("Pdfcrowd Error: " + err);
                  console.log("Success: the file was created " + fileName);
                  message.channel.send({file: ("breakingnews.png")});
                });
      }
  }
