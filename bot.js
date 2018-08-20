const Discord = require('discord.js');
const bot = new Discord.Client({ disableEveryone: true });
const FFMPEG = require('ffmpeg');
const ytdl = require('ytdl-core');
const opus = require('node-opus');
const opusscript = require('opusscript');
const ffmpegbinaries = require('ffmpeg-binaries');
const pdfcrowd = require("pdfcrowd");
const clientee = new pdfcrowd.HtmlToImageClient("barrato352", "9685063c868898c4fbe0d8c0b6d76b2a");
const avconv = require('avconv');

//bot en conexión
bot.on("ready", () => {
    var play = `>help`;
    console.log(`${bot.user.username} is online! `);
    bot.user.setAvatar("https://cdn.discordapp.com/attachments/400718108454551562/478220221513990144/enlarge.png");
    bot.user.setStatus(`dnd`);
    bot.user.setPresence({ game: { name: play, type: 1 } });
});

bot.on("message", message => {

    if (message.author.bot) return undefined;
    if (message.channel.type === "dm") return;

    //variantes
    const prefix = '>';
    let msg = message.content.toLowerCase();
    let args = message.content.slice(prefix.lenght).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    if (cmd === `${prefix}invite`) {
        message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=476139360870334464&permissions=8&scope=bot");
    }
    if (cmd === `${prefix}server`) {
        message.channel.send("https://discord.gg/NGV4RNS");
    }
    if (message.content === '>') {
        message.channel.send("Si");
    }
    if (message.content === '<') {
        message.channel.send("No");
        if (args[0]) return message.reply("es para el otro lado XDSJ");
    }

    //comandos de prefix
    if (cmd === `${prefix}famoso`) {
        message.channel.send("ricardo");
    }
    if (cmd === `${prefix}ricardo`) {
        message.channel.send("famoso");
    }
    if (cmd === `${prefix}say`) {
        let say = args.join(' ');
        if (!args[0]) return message.reply("```>say [TextXD]```");
        message.delete();
        message.channel.send(say);
    }
    if (cmd === `${prefix}tm`) {
        message.channel.send({ file: ("./img/tm.png")});
    }
    if (cmd === `${prefix}playing`) {
        bot.user.setPresence({ game: { name:  `>help`, type: 1 } });
        let play = args.join(' ');
        if (!args[0]) return message.reply("```>playing [TextXD]```");
        if (cmd === `${prefix}playing` && play) {
            bot.user.setPresence({ game: { name: play, type: 1 } });
            message.channel.send(":white_check_mark: uy jaja me cambiastes mi _estado_ (algunas veces puede tardar,,,tm)");
        }
    }
    if (cmd === `${prefix}paz`) {
        message.channel.send("amemonos");
    }
    if (cmd === `${prefix}avatar`) {
        let image = message.attachments.first().url;
        if (!args[0] && !image) return message.reply("```>avatar \n <Imagen>```");
        let avatarlink = args.join(' ');
        if (args[0]) return message.channel.send(":x: los links no son compatibles, intenta con una ya descargada jajaj");
        if (!image) return message.channel.send(":warning: Solo funciona si es una imagen ya descargada, si es una imagen copiada, puede tardar mas de 5 minutos");
        bot.user.setAvatar(image);
        message.channel.send(":information_source: Cambio de perfil ya personalizado \n**casos**: \n-lacuestión puede tardar 1 o 3 segundos \n-si lo cambias constantemente el avatar de famoso ricardo, discord no permitira que sigas cambiando por las mismas limitaciones \n-si le llego este mensaje como respuesta y aun el bot no se ha cambiado el perfil, puede por ser una imagen copiada y llega a tardar mas de 5 minutos (es mas recomendable una descargada) \n-si no ha cambiado el perfil aun, paso el segundo caso");
    }
    if (cmd === `${prefix}purge`) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: No tienes los permisos o el mismisimo famoso ricardo no los tendrá para acceder a algo así");
        if (!args[0]) return message.channel.send(":x: No puedes eliminar algo que sea nada q grasioso no¿");
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`se ha borrado ${args[0]} mensajes, omg soi un **destructor** _ricardo_.`).then(msg => msg.delete(4000));
        });
    }
    if (cmd === `${prefix}sans`) {
        message.channel.send("gaming");
    }
    if (cmd === `${prefix}play`) {
        try {
            let commandFile = require(`./bp/play.js`);
            commandFile.run(bot, message, args);
        } catch(e) {
            console.log(e.stack);
        }
    }
    if (cmd === `${prefix}leave`) {
        try {
            let commandFile = require(`./bp/leave.js`);
            commandFile.run(bot, message, args);
        } catch(e) {
            console.log(e.stack);
        }
    }

    if (cmd === `famoso`) {
        let famosoemoji = message.guild.emojis.find('name', "famosoricardo");
        message.react(famosoemoji);
    }
    if (cmd === `famosa`) {
        let famosaemoji = message.guild.emojis.find('name', "famosaricarda");
        message.react(famosaemoji);
    }
    if (cmd === `barrato`) {
        let barratoemoji = message.guild.emojis.find('name', "barrato");
        message.react(barratoemoji);
    }
    if (cmd === `phineas`) {
        let phineasemoji = message.guild.emojis.find('name', "phineas");
        message.react(phineasemoji);
    }

    if (cmd === `${prefix}gaming`) {
        message.channel.send("sans");
    }
    if (cmd === `${prefix}gato`) {
        message.channel.send("https://www.youtube.com/channel/UCmUk4tyuIw1AZBzYqXmxsbw");
    }
    if (cmd === `${prefix}gatogaymermaluma`) {
        message.channel.send("https://www.youtube.com/channel/UCmUk4tyuIw1AZBzYqXmxsbw");
    }
    if (cmd === `${prefix}barrato`) {
        message.channel.send("https://media.discordapp.net/attachments/360843373889847298/394934845505011713/emote.png **mi contraparte pero a la ves _loqieromucho_ __ATM__**");
    }
    if (cmd === `${prefix}tu`) {
        let tus = args.join(' ');
        if (!args[0]) return message.reply("```>tu [texto]```");
        if (cmd === `${prefix}tu` && tus) {
          message.channel.send(`:speech_balloon: Enviando,,,`).then(msg => msg.delete(2000));
          try {
              clientee.setOutputFormat("png");
          } catch(why) {
              console.error("Pdfcrowd Error: " + why);
              console.error("Pdfcrowd Error Code: " + why.getCode());
              console.error("Pdfcrowd Error Message: " + why.getMessage());
              process.exit(1);
          }
          clientee.convertStringToFile(
          `<style type="text/css">\n.auto-style1 {\n	text-align: center;\n	font-size: 35pt;\n}\n</style>\n<body style="width: 1024px; height: 798px;">\n<p id="textu" class="auto-style1" enableviewstate="true" style="position: absolute; left: 347px; top: 335px; width: 563px; height: 246px; max-width: 267px; max-height: 125px; line-height: normal; vertical-align: text-top; color: #000000; font-style: normal; word-spacing: 20px;" visible="true">${tus}</p><p style="width: 504px">\n<img alt="image" height="801" src="https://cdn.discordapp.com/attachments/415365025121697792/478043122169937920/tus.png" width="1024" /></p>\n</body>`,
          "Tu.png",
          function(err, fileName) {
            if (err) return console.error("Pdfcrowd Error: " + err);
            console.log("Success: the file was created " + fileName);
            message.channel.send({file: ("Tu.png")});
          });
            //message.channel.send(tus, { file: ("./img/tus.png") });
            //\n https://cdn.discordapp.com/attachments/415365025121697792/478043122169937920/tus.png
          }
    }
    if (cmd === `${prefix}detectorql`) {
        let barratoemoji = message.guild.emojis.find('name', "barrato");
        var number = 5;
        var random = Math.floor (Math.random() * (number - 4 + 3)) + 1;
        switch (random) {
            case 1: message.channel.send(`https://img00.deviantart.net/09d5/i/2005/074/6/5/a_skull_animation_by_crazyfuck.gif ${message.author} no eres **QL** uff tesalvastes bb :baby_symbol: :skull:`); break;
            case 2: message.channel.send(`https://img00.deviantart.net/09d5/i/2005/074/6/5/a_skull_animation_by_crazyfuck.gif detecto qls cerca mio pero no se qien ${barratoemoji} :skull: :coffin: TM`); break;
            case 3: message.channel.send(`https://img00.deviantart.net/09d5/i/2005/074/6/5/a_skull_animation_by_crazyfuck.gif ${message.author} me uele a que loeres perote qiero asi q no :heart:XD :skull:`); break;
            case 4: message.channel.send(`https://img00.deviantart.net/09d5/i/2005/074/6/5/a_skull_animation_by_crazyfuck.gif ${message.author} mmmmm :sos:pechoso :skull: :tm:`); break;
            case 5: message.channel.send(`https://img00.deviantart.net/09d5/i/2005/074/6/5/a_skull_animation_by_crazyfuck.gif ${message.author} UN **QL** tienes 5 segundos para correr SJXASJSA :skull: :coffin: :man_dancing: adjunto`); break;
        }
    }
    if (cmd === `${prefix}famosisimo`) {
        let famosoemoji = message.guild.emojis.find('name', "famosoricardo");
        let famosaemoji = message.guild.emojis.find('name', "famosaricarda");
        let shrekardoemoji = message.guild.emojis.find('name', "olacomoestan");
        let putqemoji = message.guild.emojis.find('name', "putq");
        let barratoemoji = message.guild.emojis.find('name', "barrato");
        let meemputasemoji = message.guild.emojis.find('name', "meemputas");
        var number = 6;
        var random = Math.floor (Math.random() * (number - 1 + 1)) + 1;
        switch (random) {
            case 1: message.channel.send(`${message.author}, te identificas con el famoso ricardo omg ${famosoemoji} https://cdn.discordapp.com/attachments/394255759539437568/478669540088217601/enlarge.png`); break;
            case 2: message.channel.send(`${message.author}, te identificas con la famosa ricarda jsjsj ${famosaemoji} https://cdn.discordapp.com/attachments/394255759539437568/478669584103112725/enlarge.png`); break;
            case 3: message.channel.send(`${message.author}, te identificas con el famoso _**s h r e k a r d o**_ OLACOMOestan ${shrekardoemoji} https://cdn.discordapp.com/attachments/394255759539437568/478669637194743834/enlarge.png`); break;
            case 4: message.channel.send(`${message.author}, te identificas con el _acaca_ __**PUTQ**__ ono ${putqemoji} https://cdn.discordapp.com/attachments/394255759539437568/478669679670591488/enlarge.png`); break;
            case 5: message.channel.send(`${message.author}, te identificas con el barratisimo :b:arrato ${barratoemoji} https://media.discordapp.net/attachments/360843373889847298/394934845505011713/emote.png`); break;
            case 6: message.channel.send(`${message.author}, te identificas con Frida:tm: ME EMPUTQS DXDDJXJD ${meemputasemoji} https://cdn.discordapp.com/attachments/394255759539437568/478669913871876124/enlarge.png`); break;
        }
    }
    if (cmd === `${prefix}tumor`) {
      try {
          let commandFile = require(`./bp/tumor.js`);
          commandFile.run(bot, message, args);
      } catch(e) {
          console.log(e.stack);
      }
    }

//  if (cmd === `${prefix}breakingnews`) {
//      message.reply("confusion, la forma en la q sehace es la sig:```>breakingnews [headline] [ticker] [imageurl]```");
//      let imageurl = args.join(' ');
//      function eventWindowLoaded() {
//          canvasApp();
//      }
//
//      function drawImageProp(context, img, x, y, w, h, offsetX, offsetY) {
//
//          if (arguments.length === 2) {
//              x = y = 0;
//              w = 1280;
//              h = 720;
//          }
//
//          /// default offset is center
//          offsetX = offsetX ? offsetX : 0.5;
//          offsetY = offsetY ? offsetY : 0.5;
//
//          /// keep bounds [0.0, 1.0]
//          if (offsetX < 0) offsetX = 0;
//          if (offsetY < 0) offsetY = 0;
//          if (offsetX > 1) offsetX = 1;
//          if (offsetY > 1) offsetY = 1;
//
//          var iw = img.width,
//              ih = img.height,
//              r = Math.min(w / iw, h / ih),
//              nw = iw * r,   /// new prop. width
//              nh = ih * r,   /// new prop. height
//              cx, cy, cw, ch, ar = 1;
//
//          /// decide which gap to fill
//          if (nw < w) ar = w / nw;
//          if (nh < h) ar = h / nh;
//          nw *= ar;
//          nh *= ar;
//
//          /// calc source rectangle
//          cw = iw / (nw / w);
//          ch = ih / (nh / h);
//
//          cx = (iw - cw) * offsetX;
//          cy = (ih - ch) * offsetY;
//
//          /// make sure source rectangle is valid
//          if (cx < 0) cx = 0;
//          if (cy < 0) cy = 0;
//          if (cw > iw) cw = iw;
//          if (ch > ih) ch = ih;
//
//          /// fill image in dest. rectangle
//          context.drawImage(img, cx, cy, cw, ch, x, y, w, h);
//      }
//
//      function canvasApp() {
//
//          var headline = "Something went viral online";
//          var ticker = "\"Is this really news?\" asks commenter  |  5 million retweets in 1 hour already";
//          var img = new Image();
//
//          var theCanvas = document.getElementById("canvasOne");
//          var context = theCanvas.getContext("2d");
//
//          var formElement = document.getElementById("textBox");
//          formElement.addEventListener("keyup", textBoxChanged, false);
//
//          var formElement2 = document.getElementById("tickerBox");
//          formElement2.addEventListener("keyup", textBox2Changed, false);
//
//          var imageLoader = document.getElementById('imageLoader');
//          imageLoader.addEventListener('change', handleImage, false);
//
//
//          var imageObj = new Image();
//          imageObj.src = 'overlay.png';
//
//
//          drawScreen();
//
//          function drawScreen() {
//
//              //Background
//              context.fillStyle = "#222222";
//              context.fillRect(0, 0, theCanvas.width, theCanvas.height);
//
//
//              //Image
//              if (img.src) {
//                  drawImageProp(context, img);
//              }
//
//              //Live
//              context.fillStyle = "rgba(194, 21, 15, 1.000)";
//              context.fillRect(80, 40, 104, 60);
//
//              context.font = "700 36px Signika";
//              context.fillStyle = "#FFFFFF";
//              context.fillText('LIVE', 96, 84);
//
//              //Box
//              context.fillStyle = "rgba(255,255,255,0.85)";
//              context.fillRect(80, 510, 1200, 110);
//
//              //Clock
//
//              context.fillStyle = "#000";
//              context.fillRect(80, 620, 100, 60);
//
//              today = new Date();
//              var m = today.getMinutes();
//              var h = today.getHours();
//
//              if (m < 10) {
//                  m = "0" + m
//              };
//
//              context.font = "700 28px Signika";
//              context.fillStyle = "#FFFFFF";
//              context.fillText((h + ":" + m), 96, 660);
//
//              //Breaking News Strap
//              // Create gradient
//              redgrd = context.createLinearGradient(0, 430, 0, 510);
//
//              // Add colors
//              redgrd.addColorStop(0.000, 'rgba(109, 36, 39, 1.000)');
//              redgrd.addColorStop(0.015, 'rgba(224, 54, 44, 1.000)');
//              redgrd.addColorStop(0.455, 'rgba(194, 21, 15, 1.000)');
//              redgrd.addColorStop(0.488, 'rgba(165, 10, 1, 1.000)');
//              redgrd.addColorStop(1.000, 'rgba(109, 36, 39, 1.000)');
//
//              context.fillStyle = redgrd;
//              context.fillRect(80, 430, 420, 80);
//
//              context.font = "700 48px Signika";
//              context.fillStyle = "#FFFFFF";
//              context.fillText('BREAKING NEWS', 100, 488);
//
//              //Text
//              context.font = "700 72px Signika";
//              context.fillStyle = "#000000";
//              context.fillText(message.toUpperCase(), 100, 590);
//
//              //Ticker
//              context.fillStyle = "#feeb1a";
//              context.fillRect(180, 620, 1100, 60);
//
//              context.font = "700 28px Signika";
//              context.fillStyle = "#000";
//              context.fillText(ticker.toUpperCase(), 200, 660);
//
//              //Logo
//              context.shadowColor = "rgba(0,0,0,0.7)";
//              context.shadowOffsetX = 0;
//              context.shadowOffsetY = 0;
//              context.shadowBlur = 6;
//              context.globalAlpha = 0.6;
//              //context.drawImage(imageObj, 560, 20);
//              context.font = "400 36px Signika";
//              context.fillStyle = "#fff";
//              context.fillText('breakyourownnews.com', 860, 80);
//              context.globalAlpha = 1;
//              context.shadowBlur = 0;
//          }
//          function handleImage(e) {
//              var reader = new FileReader();
//              reader.onload = function (event) {
//                  img.onload = function () {
//                      drawScreen();
//                  }
//                  img.src = event.target.result;
//              }
//              reader.readAsDataURL(e.target.files[0]);
//          }
//          if (cmd === `${prefix}breakingnews` && headline === (' ') && ticker === (' ') && imageurl === 'https://') {
//              eventWindowLoaded();
//              var converter = new HtmlToImageConverter
//              {
//                  Width = 1280,
//                      Height = 720
//              };
//              var pngBytes = converter.GenerateImage(headline + ticker + imageurl, drawScreen);
//              message.channel.SendFileAsync(new MemoryStream(pngBytes), "breakingnews.png");
//          }
//      }
//  }

    if (cmd === `${prefix}help`) {
        message.channel.send('ola mis __niños__ hoy lespuedo ayudarle acojer digodigo a usarme como tu qieras u.uXD O TOA VIOLARA \ncomandos:```>tm \n>invite \n>server \n>paz \n \n-"Tumoristico": \n>famosisimo \n>detectorql \n>tu \n>tumor (100 variaciones distintas omg) \n>gatogaymermaluma \n \n-Funciones bknes: \n>say (decir algoXD) \n>purge (el destructor ricardo) \n>playing (cambia mi estado de juego omg) \n>avatar (puedes cambiar el perfil con imagenes si es que discord no pueda restringir por el sobrecambio del perfil) \n \n-Música jijij: \n>play \n>leave```');
    }
//ESPACIO:
    //comandos especiales y administracion
    if (cmd === `${prefix}352421`) {
        let status = args.join(' ');
        message.delete();
        if (cmd === `${prefix}352421` && status === 'online') {
            bot.user.setStatus(`Online`);
            message.delete();
            message.channel.send(`:white_check_mark: Status cambiado correctamente.`).then(msg => msg.delete(2000));
        }
        if (cmd === `${prefix}352421` && status === 'idle') {
            bot.user.setStatus(`idle`);
            message.delete();
            message.channel.send(`:white_check_mark: Status cambiado correctamente.`).then(msg => msg.delete(2000));
        }
        if (cmd === `${prefix}352421` && status === 'dnd') {
            bot.user.setStatus(`dnd`);
            message.delete();
            message.channel.send(`:white_check_mark: Status cambiado correctamente.`).then(msg => msg.delete(2000));
        }
        if (cmd === `${prefix}352421` && status === 'servers') {
            message.delete();
            message.channel.send(`estoi actualmente por ${bot.guilds.size} servidores o`);
        }
    }
});

bot.login(process.env.token);
