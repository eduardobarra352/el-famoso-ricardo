exports.run = async (bot, message, cmd, prefix, args, webshot) => {
      if (!args[0]) return message.reply("```>breakingnews [headline] | [ticker] \n <imagen>```");
      let imagen = message.attachments.first().url;
      let barra = ' | ';
      let args2 = message.content.slice(prefix.lenght).trim().split(prefix);
      let args3 = message.content.slice(args2.lenght).trim().split(barra);
      let ticker = args3[1];
      let headline = args2[1];
      if (!headline) return message.channel.send(":x: sedesconoce eltitulon, siga intentando");
      if (!ticker) return message.channel.send(":x: sedesconoce lainfo destacada, siga intentando");
      if (!imagen) return message.reply(":no_entry: soloesta permitido una imagen copiada o ya descargada");
      if (!headline && ticker && imagen) return message.channel.send(":x: sedesconoce eltitulon, siga intentando");
      if (headline && !ticker && imagen) return message.channel.send(":x: sedesconoce lainfo destacada, siga intentando");
      if (headline && ticker && !imagen) return message.reply(":no_entry: soloesta permitido una imagen copiada o ya descargada");
      
      const today = new Date();
      var m = today.getMinutes();
      var h = today.getHours();
      if (m < 10) {
          m = "0" + m
      };
      if (cmd === `${prefix}breakingnews` && headline && barra && ticker) {
            var options = {
                  siteType: 'html',
                  defaultWhiteBackground: true,
                  screenSize: {
                        width: 1024,
                        height: 576
                  }
            };
            message.channel.send(`:speech_balloon: Enviando,,,`).then(msg => msg.delete(1000));
            webshot(`<link href="https://fonts.googleapis.com/css?family=Signika" rel="stylesheet"/><style type="text/css">.text2 {	font-family: Signika;	font-size: x-large;	color: #FFFFFF;	text-align: center;}.auto-style1 {	font-family: Signika;	font-size: 30pt;}.auto-style2 {	font-family: Signika;	font-size: x-large;	color: #000000;	text-align: left;}.auto-style3 {	margin-bottom: 0px;}</style><form id="form1" runat="server" style="width: 1024px; position: absolute; left: 0px; top: 0px; height: 576px;" class="auto-style3"><div style="height: 576px; position: absolute; left: 0px; top: 0px;"> <img height="576" src="https://github.com/eduardobarra352/el-famoso-ricardo/blob/master/img/breaking.png?raw=true" width="1024" /></div><img alt="" height="576" src=${imagen} width="1024" /></form><p id="headli" class="auto-style1" style="position: absolute; left: 76px; top: 387px; width: 940px; height: 61px;"><strong>${headline}</strong></p><p class="text2" style="position: absolute; left: 69px; top: 480px; width: 70px; height: 37px" id="clock">${h}:${m}</p><p class="auto-style2" style="position: absolute; left: 161px; top: 480px; width: 852px; height: 30px" id="tick"><strong>${ticker}</strong></p>`, 'breakingnews.png', options, function(err) {
            message.channel.send({file: ("breakingnews.png")});
            });
      }
  }
