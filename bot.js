const Discord = require('discord.js');
const bot = new Discord.Client({ disableEveryone: true });
const FFMPEG = require('ffmpeg');
const ytdl = require('ytdl-core');
const yt = require('yt-search');
const opus = require('node-opus');
const opusscript = require('opusscript');
const ffmpegbinaries = require('ffmpeg-binaries');
const webshot = require('node-webshot');
const avconv = require('avconv');
const activo = new Map();
const ownerID = process.env.ownerID;
const guildID = process.env.serverID;
const play = ` | >help`;

//bot en conexión
bot.on("ready", () => {
    console.log(`${bot.user.username} is online! `);
    bot.user.setStatus(`dnd`);
    bot.user.setPresence({ game: { name: `>help`, type: 1 } });
    bot.guilds.get(guildID).channels.get("482387992837881858").send(":white_check_mark: ya estoi en linea jajaj").then(msg => msg.delete(20000));
});

bot.on("message", message => {

    if (message.author.bot) return undefined;

    //variantes
    const prefix = '>';
    const code = process.env.code;
    let msg = message.content.toLowerCase();
    let args = message.content.slice(prefix.lenght).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    if (cmd === `${prefix}invite`) {
        message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=476139360870334464&permissions=8&scope=bot");
        console.log(`${prefix}invite usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
    }
    if (cmd === `${prefix}server`) {
        message.channel.send("https://discord.gg/NGV4RNS");
        console.log(`${prefix}server usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
    }
    if (message.content === '>') {
        message.channel.send("Si");
        console.log(`">" usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
    }
    if (message.content === '<') {
        message.channel.send("No");
        console.log(`"<" usado por: ${message.author.tag} en el server ${message.guild.name}`);
        if (args[0]) return message.reply("es para el otro lado XDSJ");
    }

    //comandos de prefix
    if (cmd === `${prefix}famoso`) {
        message.channel.send("ricardo");
        console.log(`${prefix}famoso usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
    }
    if (cmd === `${prefix}ricardo`) {
        message.channel.send("famoso");
        console.log(`${prefix}ricardo usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
    }
    if (cmd === `${prefix}say`) {  
        let say = args.join(' ');
        message.channel.startTyping();
        setTimeout(()=>{ message.channel.stopTyping(); },800);
        if (!args[0]) return message.reply("```>say [TextXD]```");
        if (!say) return console.log(`${prefix}say usado por: ${message.author.tag} en el server ${message.guild.name} con falta de usos`);
        message.delete();
        message.channel.send(say);
        console.log(`${prefix}say usado por: ${message.author.tag} en el server ${message.guild.name} con su uso "${say}"`);
        Log(bot, message, args);
    }
    if (cmd === `${prefix}tm`) {
        message.channel.send({ file: ("./img/tm.png")});
        console.log(`${prefix}tm usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
    }
    if (cmd === `${prefix}playing`) {
        bot.user.setPresence({ game: { name:  `>help`, type: 1 } });
        let pl = args.join(' ');
        if (!args[0]) return message.reply("```>playing [TextXD]```");
        if (!pl) return console.log(`${prefix}playing usado por: ${message.author.tag} en el server ${message.guild.name} con falta de usos`);
        if (cmd === `${prefix}playing` && pl) {
            bot.user.setPresence({ game: { name: `${pl}${play}`, type: 1 } });
            message.channel.send(":white_check_mark: uy jaja me cambiastes mi _estado_ (algunas veces puede tardar,,,tm)");
            console.log(`${prefix}playing usado por: ${message.author.tag} en el server ${message.guild.name} con su uso "${pl}"`);
            Log(bot, message, args);
        }
    }
    if (cmd === `${prefix}paz`) {
        message.channel.send("amemonos");
        console.log(`${prefix}paz usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
    }
    if (cmd === `${prefix}avatar`) {
        let image = message.attachments.first().url;
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":no_entry: eres bastantePENDJ opara aser esto sinpermisos");
        if (!args[0] && !image) return message.reply("```>avatar \n <Imagen>```");
        message.channel.startTyping();
        let avatarlink = args.join(' ');
        if (args[0]) return message.channel.send(":x: los links no son compatibles, intenta con una ya descargada jajaj");
        if (!image) return message.channel.send(":warning: Solo funciona si es una imagen ya descargada, si es una imagen copiada, puede tardar mas de 5 minutos");
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":no_entry: No tienes acceso o permiso para hacer semejante cosaXD");
        bot.user.setAvatar(image);
        message.channel.stopTyping();
        console.log(`${prefix}avatar usado por: ${message.author.tag} en el server ${message.guild.name} con su uso "${image}"`);
        Log(bot, message, args);
        message.channel.send(":information_source: Cambio de perfil ya personalizado \n**casos**: \n-lacuestión puede tardar 1 o 3 segundos \n-si lo cambias constantemente el avatar de famoso ricardo, discord no permitira que sigas cambiando por las mismas limitaciones \n-si le llego este mensaje como respuesta y aun el bot no se ha cambiado el perfil, puede por ser una imagen copiada y llega a tardar mas de 5 minutos (es mas recomendable una descargada) \n-si no ha cambiado el perfil aun, paso el segundo caso");
    }
    if (cmd === `${prefix}purge`) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: No tienes los permisos o el mismisimo famoso ricardo no los tendrá para acceder a algo así");
        if (!args[0]) return message.channel.send(":x: No puedes eliminar algo que sea nada q grasioso no¿");
        console.log(`${prefix}purge usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.startTyping();
            setTimeout(()=>{ message.channel.stopTyping(); },1000);
            message.channel.send(`se ha borrado ${args[0]} mensajes, omg soi un **destructor** _ricardo_.`).then(msg => msg.delete(4000));
        });
    }
    if (cmd === `${prefix}sans`) {
        message.channel.send("gaming");
        console.log(`${prefix}sans usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
    }
    if (cmd === `${prefix}play`) {
        try {
            let opus = {
                ownerID: ownerID,
                activo: activo
            }
            let commandFile = require(`./bp/play.js`);
            commandFile.run(bot, message, args, opus, activo);
        } catch(e) {
            console.log(e.stack);
        }
        console.log(`${prefix}play usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
    }
    //if (cmd === `${prefix}queue`) {
    //    try {
    //        let opus = {
    //            activo: activo
    //        }
    //        let commandFile = require(`./bp/queue.js`);
    //        commandFile.run(bot, message, args, opus, activo);
    //    } catch(e) {
    //        console.log(e.stack);
    //    }
    //}
    if (cmd === `${prefix}leave`) {
        try {
            let commandFile = require(`./bp/leave.js`);
            commandFile.run(bot, message, args, opus);
        } catch(e) {
            console.log(e.stack);
        }
        console.log(`${prefix}leave usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
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
        console.log(`${prefix}gaming usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
    }
    if (cmd === `${prefix}gato`) {
        message.channel.send("https://www.youtube.com/channel/UCmUk4tyuIw1AZBzYqXmxsbw");
        console.log(`${prefix}gato usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
    }
    if (cmd === `${prefix}gatogaymermaluma`) {
        message.channel.send("https://www.youtube.com/channel/UCmUk4tyuIw1AZBzYqXmxsbw");
        console.log(`${prefix}gatogaymermaluma usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
    }
    if (cmd === `${prefix}barrato`) {
        message.channel.send("https://media.discordapp.net/attachments/360843373889847298/394934845505011713/emote.png **mi contraparte pero a la ves _loqieromucho_ __ATM__**");
        console.log(`${prefix}barrato usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
    }
    if (cmd === `${prefix}tu`) {
        let tus = args.join(' ');
        if (!args[0]) return message.reply("```>tu [texto]```");
        if (!tus) return console.log(`${prefix}tu usado por: ${message.author.tag} en el server ${message.guild.name} con falta de usos`);
        if (cmd === `${prefix}tu` && tus) {
          message.channel.startTyping();
          console.log(`${prefix}tu usado por: ${message.author.tag} en el server ${message.guild.name} con su uso "${tus}"`);
          Log(bot, message, args);
          var options = {
              siteType: 'html',
              defaultWhiteBackground: true,
              screenSize: {
                  width: 1024,
                  height: 798
              }
          };
          webshot(`<style type="text/css">\n.auto-style1 {\n	text-align: center;\n	font-size: 35pt;\n}\n</style>\n<body style="width: 1024px; height: 798px;">\n<p id="textu" class="auto-style1" enableviewstate="true" style="position: absolute; left: 347px; top: 335px; width: 563px; height: 246px; max-width: 267px; max-height: 125px; line-height: normal; vertical-align: text-top; color: #000000; font-style: normal; word-spacing: 20px;" visible="true">${tus}</p><p style="width: 504px">\n<img alt="image" height="801" src="https://cdn.discordapp.com/attachments/415365025121697792/478043122169937920/tus.png" width="1024" /></p>\n</body>`, 'Tu.png', options, function(err) {
              message.channel.send({file: ("Tu.png")});
              message.channel.stopTyping();
          });
            //message.channel.send(tus, { file: ("./img/tus.png") });
            //\n https://cdn.discordapp.com/attachments/415365025121697792/478043122169937920/tus.png
          }
    }
    if (cmd === `${prefix}esqeletin`) {
        let esqsay = args.join(' ');
        if (!args[0]) return message.reply("```>esqeletin [texto]```");
        if (!esqsay) return console.log(`${prefix}esqeletin usado por: ${message.author.tag} en el server ${message.guild.name} con falta de usos`);
        if (cmd === `${prefix}esqeletin` && esqsay) {
          message.channel.startTyping();
          console.log(`${prefix}esqeletin usado por: ${message.author.tag} en el server ${message.guild.name} con su uso "${esqsay}"`);
          Log(bot, message, args);
          var options = {
                siteType: 'html',
                defaultWhiteBackground: true,
                screenSize: {
                      width: 1024,
                      height: 566
                }
          };
          webshot(`<head><link href="https://fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet"><style type="text/css">.auto-style1 {	font-family: Indie Flower;	font-size: xx-large;	margin-bottom: 0px;	margin-top: 0px;}.auto-style2 {	margin-top: 0px;}</style></head><p style="width: 1026px; position: absolute; left: 0px; top: 0px; height: 568px;" class="auto-style2"><img alt="esqueletin" height="566" src="https://github.com/eduardobarra352/el-famoso-ricardo/blob/master/img/esqeletin.png?raw=true" width="1024" class="auto-style2" /></p><p class="auto-style1" style="width: 244px; position: absolute; left: 589px; top: 205px; height: 161px;"><strong>${esqsay}</strong></p>`, 'esqeletin.png', options, function(err) {
          message.channel.send({file: ("esqeletin.png")});
          message.channel.stopTyping();
          });
            //message.channel.send({ file: ("./bp/esqeletin.png") });
            //\n https://github.com/eduardobarra352/el-famoso-ricardo/blob/master/img/esqeletin.png?raw=true
          }
    }
    if (cmd === `${prefix}john`) {
      let jon = args.join(' ');
      let args2;
      if (args.lenght >= 4) { let args2 = message.content.slice(jon.lenght).trim().split(' '); }
      let barra = args2;
      if (!args[0]) return message.reply("```>john [textoXD]```");
      if (cmd === `${prefix}john` && jon) {
        message.channel.startTyping();
        console.log(`${prefix}john usado por: ${message.author.tag} en el server ${message.guild.name} con su uso "${jon}"`);
        Log(bot, message, args);
        var options = {
              siteType: 'html',
              defaultWhiteBackground: false,
              shotOffset: {
                  left: 5,
                  right: 0,
                  top: 5,
                  bottom: 0
              },
              shotSize: {
                      width: 253,
                      height: 220
              }
        };
        webshot(`<style type="text/css">.auto-style1 {	text-align: left;	font-family: Arial, Helvetica, sans-serif;    font-weight: 400;    font-style: normal;	color: #FFFFFF;	margin-bottom: 0px;	font-size: medium;	margin-top: 0px;}</style><p id="text" visible="true" class="auto-style1" style="width: 253px">${jon}</p><img alt="" src="https://media.discordapp.net/attachments/458037874017828866/485632780584222720/end.png" height="177" width="253" />`, 'john.png', options, function(err) {
        message.channel.send({file: ("john.png")});
        message.channel.stopTyping();
        });
      }
    }
    if (cmd === `${prefix}detectorql`) {
        message.channel.startTyping();
        console.log(`${prefix}detectorql usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
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
        message.channel.stopTyping();
    }
    if (cmd === `${prefix}famosisimo`) {
        message.channel.startTyping();
        console.log(`${prefix}famosisimo usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
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
        message.channel.stopTyping();
    }
    if (cmd === `${prefix}tumor`) {
      try {
          let commandFile = require(`./bp/tumor.js`);
          commandFile.run(bot, message, args);
      } catch(e) {
          console.log(e.stack);
      }
      console.log(`${prefix}tumor usado por: ${message.author.tag} en el server ${message.guild.name}`);
      Log(bot, message, args);
    }
    if (cmd === `${prefix}di`) {
      try {
          let commandFile = require(`./bp/clever.js`);
          commandFile.run(bot, message, args, Log);
      } catch(e) {
          console.log(e.stack);
      }
    }
    if (cmd === `${prefix}breakingnews`) {
        try {
            let commandFile = require(`./bp/breaking.js`);
            commandFile.run(bot, message, cmd, prefix, args, webshot, Log);
        } catch(e) {
            console.log(e.stack);
        }
    }
    if (message.channel.type === "dm") {
        bot.guilds.get(guildID).channels.get("482387992837881858").send(`:mailbox_with_mail: has recibido mensaje **dm** de __${message.author.tag}__\nID = ${message.author.id}\nMensaje = ${cmd}`);
    }
    if (cmd === `${prefix}help`) {
        message.channel.send('ola mis __niños__ hoy lespuedo ayudarle acojer digodigo a usarme como tu qieras u.uXD O TOA VIOLARA \ncomandos:```>tm \n>invite \n>server \n>paz \n \n-"Tumoristico": \n>famosisimo \n>detectorql \n>tu [textXD] \n>tumor (100 variaciones distintas omg) \n>esqeletin [textXD] \n>gatogaymermaluma \n>breakingnews | [headline] | [ticker] <imagen> \n \n-Funciones bknes: \n>say (decir algoXD) \n>purge (el destructor ricardo) \n>playing (cambia mi estado de juego omg) \n>di [dile algo al famoso, enbase decleverbot XD] \n>avatar <imagen> (puedes cambiar el perfil con imagenes si es que discord no pueda restringir por el sobrecambio del perfil) \n \n-Música jijij (beta porq puedecontener errores sorri): \n>play \n>leave```');
        console.log(`${prefix}help usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
    }
//ESPACIO:
    //comandos especiales y administracion
    if (cmd === `${prefix}${code}`) {
        let status = args[0];
        //let realize = args[1];
        //let dammi = args[2];
        //var mention = message.mentions.users.first();
        message.delete();
        if (cmd === `${prefix}${code}` && status === 'online') {
            bot.user.setStatus(`Online`);
            message.delete();
            message.channel.send(`:white_check_mark: Status cambiado correctamente.`).then(msg => msg.delete(2000));
        }
        if (cmd === `${prefix}${code}` && status === 'idle') {
            bot.user.setStatus(`idle`);
            message.delete();
            message.channel.send(`:white_check_mark: Status cambiado correctamente.`).then(msg => msg.delete(2000));
        }
        if (cmd === `${prefix}${code}` && status === 'dnd') {
            bot.user.setStatus(`dnd`);
            message.delete();
            message.channel.send(`:white_check_mark: Status cambiado correctamente.`).then(msg => msg.delete(2000));
        }
        if (cmd === `${prefix}${code}` && status === 'servers') {
            message.delete();
            message.channel.send(`estoi actualmente por ${bot.guilds.size} servidores o **\n-${bot.guilds.map(g=>g.name).join('\n-')}**`);
        }
        //if (cmd === `${prefix}${code}` && status === 'send') {
        //    message.delete();
        //    try {
        //        if (cmd === `${prefix}${code}` && status === 'send' && realize === mention && dammi) {
        //            mention.sendMessage(dammi);
        //            message.channel.send(`:white_check_mark: Mensaje enviado.`).then(msg => msg.delete(2000));
        //        }
        //    }
        //    catch (err) {
        //        console.log(err);
        //        bot.guilds.get(guildID).channels.get("482387992837881858").send(err);
        //    }
        //}
    }
});

function Log(bot, message, args) {
    let thumbnail = message.guild.displayAvatarURL;
    let embed = new Discord.RichEmbed()
    .setColor("#40f230")
    .addField("Log", message.channel.name)
    .setDescription("Nuevos usos del bot y su respectivo sitio")
    .setThumbnail(thumbnail)
    .addField("Uso", message.content)
    .addField("Usuario", message.author.tag)
    .addField("Hora", message.createdAt)
    .addField("Servidor", message.guild.name)
    .setTimestamp(new Date())
    .setImage(thumbnail);
    return bot.guilds.get(guildID).channels.get("482387992837881858").send(embed);
}
bot.login(process.env.token);
