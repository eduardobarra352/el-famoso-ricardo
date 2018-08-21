exports.run = async (bot, message, cmd, prefix, args, pdfcrowd, clientee) => {
      if (!args[0]) return message.reply("```>breakingnews [headline] | [ticker] \n <imagen>```");
      let imagen = message.attachments.first().url;
      let headline = args.join(' ');
      let ticker = args.join(' ');
      let barra = ' | ';
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
                `<link href="https://fonts.googleapis.com/css?family=Signika" rel="stylesheet"/><style type="text/css">.text2 {font-family: Signika;font-size: x-large;color: #FFFFFF;text-align: center;}.auto-style1 {font-family: Signika;font-size: 30pt;}.auto-style2 {font-family: Signika;font-size: x-large;color: #000000;text-align: left;}</style><body><form id="form1" runat="server" style="width: 1024px; position: absolute; left: 4px; top: 5px; height: 546px;"><div style="height: 576px; position: absolute; left: -7px; top: -13px;"> <img height="546" src="https://github.com/eduardobarra352/el-famoso-ricardo/blob/master/img/breaking.png?raw=true" width="1024" /></div><img alt="" height="546" src=${imagen} width="1024" /></form><p id="headline" class="auto-style1" style="position: absolute; left: 73px; top: 358px; width: 940px; height: 61px;"><strong>${headline}</strong></p><p class="text2" style="position: absolute; left: 67px; top: 446px; width: 70px; height: 37px" id="clock">${h}:${m}</p><p class="auto-style2" style="position: absolute; left: 159px; top: 445px; width: 852px; height: 30px" id="ticker"><strong>${ticker}</strong></p></body>`,
                "breakingnews.png",
                function(err, fileName) {
                  if (err) return console.error("Pdfcrowd Error: " + err);
                  console.log("Success: the file was created " + fileName);
                  message.channel.send({file: ("breakingnews.png")});
                });
      }
  }
