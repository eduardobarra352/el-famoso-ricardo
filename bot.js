const Discord = require('discord.js');
const fs = require('fs');
const request = require('request');
const bot = new Discord.Client({ disableEveryone: true });
const FFMPEG = require('ffmpeg');
const yt = require('yt-search');
const gis = require('g-i-s');
const jimp = require('jimp');
const isUrl = require('is-url');
const webshot = require('node-webshot');
const avconv = require('avconv');
const activo = new Map();
const botid = process.env.botID;
const ownerID = process.env.ownerID;
const ownerTAG = process.env.ownerTAG;
const guildID = process.env.serverID;
const play = ` | >help`;
const attach = new Map();

//bot en conexión
bot.on("ready", () => {
    console.log(`${bot.user.username} is online! `);
    setInterval(function(){ console.log("t"); }, 5000);
    bot.user.setStatus(`dnd`);
    bot.user.setPresence({ game: { name: `>help`, type: 1 } });
    bot.guilds.get(guildID).channels.get("482387992837881858").send(":white_check_mark: ya estoi en linea jajaj").then(msg => msg.delete(20000));
});

bot.on("message", message => {

    //if (message.author.bot) return undefined;

    //variantes
    const prefix = '>';
    const code = process.env.code;
    let msg = message.content.toLowerCase();
    let args = message.content.slice(prefix.lenght).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    if (!attach.imagen) { attach.imagen = []; AttachImagen(0, 0); }

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
    let reurl = cmd[0];
    if (isUrl(reurl) == true) {
	if (ytdl.validateURL(reurl)) { 
		let attachidvideo = ytdl.getURLVideoID(reurl);
		AttachImagen('https://i.ytimg.com/vi/'+attachidvideo+'/hqdefault.jpg', message.channel.id);
        } 
	else {
		AttachImagen(reurl, message.channel.id);
	}
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
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":no_entry: eres bastantePENDJ opara aser esto sinpermisos");
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
	if (message.attachments.size > 0) {
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
	else { message.reply("```>avatar \n <Imagen>```"); }
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
    if (cmd === `${prefix}yt`) {
        if (!args[0]) return message.reply("```>yt [nombre de video pss]```");
	let responsable = message.author.id;
        message.channel.startTyping();
        console.log(`${prefix}yt usado por: ${message.author.tag} en el server ${message.guild.name} con su uso "${args}"`);
        yt(args.join(' '), function(err, res){
          if (err) return message.channel.send(":x: Uy, un erroralgo feo, mmmm siga intentando");
          let videos = res.videos.slice(0, 10);
          let resp = '';
          for(var i in videos) {
            var titulo = videos[i].title;
	    var limitetitulo = 40;
	    if (titulo.length > (limitetitulo-1)) titulo = titulo.substring(0, limitetitulo) + '...';
            resp += `**${parseInt(i)+1}**- **${titulo}** \`\`${videos[i].timestamp}\`\`\n`;
          }
          resp += `\neliga el número del video q qieres mm: **1-${videos.length}**`;
          message.channel.send(resp).then(msg => msg.delete(30000));
          message.channel.stopTyping();
          const filtro = m => !isNaN(m.content) && m.author.id == responsable && m.content < videos.length+1 && m.content > 0;
          const collector = message.channel.createMessageCollector(filtro, { time: 30000 });
          collector.videos = videos;
          collector.once('collect', function(m) {
              message.channel.send('https://youtube.com'+[this.videos[parseInt(m.content)-1].url]);
	      AttachImagen('https://i.ytimg.com/vi/'+[this.videos[parseInt(m.content)-1].videoId]+'/hqdefault.jpg', message.channel.id);
          });
          Log(bot, message, args);
        });
    }
    if (cmd === `${prefix}img`) {
        if (!args[0]) return message.reply("```>img [lo q qieras buscar]```");
        let buscar = args.join(' ');
        gis(buscar, resultados);
	let responsable = message.author.id;
	let limite;
        let nivel = 1;
        let minim = 0;
	let veces = 0;
        let embed;
        let msgid;
	let filtro;
	let collector;
	var edit_timer;
	var part_timer;
        message.channel.startTyping();
        function resultados(err, res) {
            if (err) return message.channel.send(":x: Uy, un erroralgo feo, mmmm siga intentando");
            res = JSON.stringify(res, null, '  ');
            res = JSON.parse(res);
   	    limite = res.length;
            res = res.slice(minim, nivel);
            try {
                for(var i in res) {
                    embed = new Discord.RichEmbed()
                    .setColor("#40f230")
                    .setAuthor(message.author.username, message.author.avatarURL)
		    .setImage(decodeURI(res[i].url))
                    .addField("Resultados:", nivel + "-"+limite)
		    .setFooter("escribe un numero para ver los otros resultados o.o");
		    if (veces == 0) { message.channel.send(embed).then(msg => msgid = msg).then(setTimeout(()=>{ if (veces == 0) { embed.setFooter('se termino los resultados,,'); msgid.edit(embed); } },16000)); }
	            AttachImagen(decodeURI(res[i].url), message.channel.id);
                }
                filtro = m => !isNaN(m.content) && m.author.id == responsable && m.content < limite+1 && m.content > 0;
                collector = message.channel.createMessageCollector(filtro, { time: 15000 });
                collector.res = res;
                collector.on('collect', m => {
		    clearTimeout(edit_timer);
		    clearTimeout(part_timer);
	            if (nivel > 0 || nivel < (limite+1)) {
			    nivel = m;
			    minim = m-1;
			    veces = veces+1;
			    gis(buscar, resultados);
			    edit_timer = setTimeout(()=>{ msgid.edit(embed); m.delete(); },1000);
			    part_timer = setTimeout(()=>{
				    collector.on('end', m => {
		    			setTimeout(()=>{ embed.setFooter('se termino los resultados,,'); msgid.edit(embed); },2000);
				    });
		  	    },15000);
		    }
                });
            }
            catch(e) {
                console.log(e.stack);
                message.channel.send(":x: error ultra desconocido :spy:...sigale intentando ñ");
            }
            message.channel.stopTyping();
        }
	Log(bot, message, args);
    }
    if (cmd === `${prefix}sans`) {
        message.channel.send("gaming");
        console.log(`${prefix}sans usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
    }
    if (cmd === `${prefix}meme`) {
	try {
          let commandFile = require(`./bp/mem.js`);
          commandFile.run(bot, message, args, AttachImagen);
      	} catch(e) {
          console.log(e.stack);
      	}
      	console.log(`${prefix}meme usado por: ${message.author.tag} en el server ${message.guild.name} con su uso "${args}"`);
	Log(bot, message, args);
    }
    if (cmd === `${prefix}jpg`) {
		if (attach.imagen[attach.imagen.length-1].guild == message.channel.id && !args[0]) { 
			setTimeout(()=>{
				let urlimagen = attach.imagen[attach.imagen.length-1].url;
				message.channel.startTyping();
				jimp.read(urlimagen, (err, jpeg) => {
					if (err) return message.channel.send(":x: Uy, un erroralgo feo, mmmm siga intentando");
					jpeg
					.quality(1)
					.write('jpeg.jpg');
					setTimeout(()=>{ message.channel.send({ file: ("jpeg.jpg")}) },2000);
				});
				message.channel.stopTyping();
				return;
			},2000);
		 }
		 else {
			if (args.includes("help")) return message.reply("```>jpg [url] o <imagen>```");
			if (!args[0] && !message.attachments.size) return message.reply("```>jpg [url] o <imagen>```");
			if (message.attachments.size > 0) {
			    message.channel.startTyping();
			    let imagen = message.attachments.first().url;
			    let anchura = message.attachments.first().width;
			    let altura = message.attachments.first().height;
			    jimp.read(imagen, (err, jpeg) => {
				if (err) return message.channel.send(":x: Uy, un erroralgo feo, mmmm siga intentando");
				jpeg
				.resize(anchura, altura)
				.quality(1)
				.write('jpeg.jpg');
				setTimeout(()=>{ message.channel.send({ file: ("jpeg.jpg")}) },2000);
			    });
			}
			else {
			    let urlimagen = args[0];
			    if (isUrl(urlimagen) == false) return message.reply(":x: imagen posiblemente malito, sigale,,.-..");
			    AttachImagen(urlimagen, message.channel.id);
			    message.channel.startTyping();
			    jimp.read(urlimagen, (err, jpeg) => {
				if (err) return message.channel.send(":x: Uy, un erroralgo feo, mmmm siga intentando");
				jpeg
				.quality(1)
				.write('jpeg.jpg');
				setTimeout(()=>{ message.channel.send({ file: ("jpeg.jpg")}) },2000);
			    });
			}
		  }
	    	  message.channel.stopTyping();
	    	  Log(bot, message, args);
    }
    if (cmd === `${prefix}resize`) {
	if (attach.imagen[attach.imagen.length-1].guild == message.channel.id && !args[0]) { 
		message.channel.startTyping();
		setTimeout(()=> { message.channel.send({ file: (attach.imagen[attach.imagen.length-1].url)}); message.channel.stopTyping(); },2000);
	}
	else { 
		if (!args[0] && !message.attachments.size) return message.reply("```>resize [url] o <imagen>```");
		if (message.attachments.size > 0) {
		    message.channel.startTyping();
		    let imagen = message.attachments.first().url;
		    jimp.read(imagen, (err, jpeg) => {
			if (err) return message.channel.send(":x: Uy, un erroralgo feo, mmmm siga intentando");
			jpeg
			.write('resize.png');
			setTimeout(()=>{ message.channel.send({ file: ("resize.png")}) },2000);
		    });
		}
		else {
		    let urlimagen = args[0];
		    if (isUrl(urlimagen) == false) return message.reply(":x: imagen posiblemente malito, sigale,,.-..");
		    AttachImagen(urlimagen, message.channel.id);
		    message.channel.startTyping();
		    jimp.read(urlimagen, (err, jpeg) => {
			if (err) return message.channel.send(":x: Uy, un erroralgo feo, mmmm siga intentando");
			jpeg
			.write('resize.png');
			setTimeout(()=>{ message.channel.send({ file: ("resize.png")}) },2000);
		    });
		}
	}
	message.channel.stopTyping();
	Log(bot, message, args);
    }
    if (cmd === `${prefix}emji`) {
        let say = args[0];
        message.channel.startTyping();
        setTimeout(()=>{ message.channel.stopTyping(); },800);
        if (!args[0] || args[1] || isNaN(args[0])) return message.reply("```>emji [ID de un emoji deun server]```");
        if (!say) return console.log(`${prefix}emji usado por: ${message.author.tag} en el server ${message.guild.name} con falta de usos`);
	message.delete();
	try {
	    let emji = bot.emojis.get(say);
	    if (emji != undefined) { message.channel.send(`${emji}`); }
	    else { message.reply(':x: no se encontroel emoji jajjajsg ñ'); }
	}
	catch(e) {
	    console.log(e);
	    message.channel.send(":x: Uy, un erroralgo feo, mmmm siga intentando");
	}
        console.log(`${prefix}emji usado por: ${message.author.tag} en el server ${message.guild.name} con su uso "${say}"`);
        Log(bot, message, args);
    }
    if (cmd === `famoso`) {
        let famosoemoji;
	if (message.guild.emojis.find('name', "famosoricardo")) {
	    famosoemoji = message.guild.emojis.find('name', "famosoricardo");
            message.react(famosoemoji);
	}
	else {
	    famosoemoji = '439570889340878851';
	    message.react(bot.emojis.get(famosoemoji));
	}
    }
    if (cmd === `famosa`) {
        let famosaemoji;
	if (message.guild.emojis.find('name', "famosaricarda")) {
            famosaemoji = message.guild.emojis.find('name', "famosaricarda");
	    message.react(famosaemoji);
        }
	else {
	    famosaemoji = '439570878196613130';
	    message.react(bot.emojis.get(famosaemoji));
	}
    }
    if (cmd === `barrato`) {
        let barratoemoji;
	if (message.guild.emojis.find('name', "barrato")) {
            barratoemoji = message.guild.emojis.find('name', "barrato");
	    message.react(barratoemoji);
	}
	else {
            barratoemoji = '439570642715803649';
	    message.react(bot.emojis.get(barratoemoji));
	}
    }
    if (cmd === `phineas`) {
        let phineasemoji;
	if (message.guild.emojis.find('name', "phineas")) {
            phineasemoji = message.guild.emojis.find('name', "phineas");
	    message.react(phineasemoji);
	}
	else {
	    phineasemoji = '439570324309409792';
	    message.react(bot.emojis.get(phineasemoji));
	}
    }
    if (cmd === `${prefix}deviantart`) {
	try {
          let commandFile = require(`./bp/da.js`);
          commandFile.run(bot, message, args, AttachImagen);
      	} catch(e) {
          console.log(e.stack);
      	}
      	console.log(`${prefix}deviantart usado por: ${message.author.tag} en el server ${message.guild.name} con su uso "${args}"`);
	Log(bot, message, args);
    }
    if (cmd === `${prefix}sc` || cmd === `${prefix}screenshot`) {
	if (!args[0]) return message.reply("```>sc / screenshot [url de una pagina]```");
	let url = args[0];
	console.log(`${prefix}sc usado por: ${message.author.tag} en el server ${message.guild.name} con su uso "${args}"`);
	Log(bot, message, args);
	message.channel.startTyping();
	webshot(url, 'screenshot.png', function(err) {
	    if (err) return message.channel.send(":x: error ultra desconocido :spy:...sigale intentando ñ");
	    message.channel.send(`__${url}__`,{file: ("screenshot.png")});
	    message.channel.stopTyping();
	});
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
        message.channel.send("**mi contraparte pero a la ves _loqieromucho_ __ATM__**", { file: ("https://media.discordapp.net/attachments/360843373889847298/394934845505011713/emote.png")});
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
    if (cmd === `${prefix}desmotivacion`) {
      let barra = ' | ';
      let urlimagen = args[0];
      let space = urlimagen + ' ';
      let args2 = message.content.slice(cmd.lenght).trim().split(space);
      let toptext = args2[1];
      let bottomtext = '';
      let args3 = message.content.slice(args2.lenght).trim().split(barra);
      let args4 = toptext.slice(cmd.lenght).trim().split(barra);
      toptext = args4[0];
      bottomtext = args3[1];
      if (bottomtext == undefined) { bottomtext = ''; }
      if (!args[0]) return message.reply("```1- >desmotivacion [url] [toptext]```");
      if (!toptext) return message.reply(":x: no sepudo leer lawea, siga intentando g");
      if (isUrl(urlimagen) == false || urlimagen.match(/\.(jpeg|jpg|gif|png)$/) == null) return message.reply(":x: imagen posiblemente malito, sigale,,.-..");
      AttachImagen(urlimagen, message.channel.id);
      message.channel.startTyping();
      console.log(`${prefix}desmotivacion usado por: ${message.author.tag} en el server ${message.guild.name} con su uso "${args}"`);
      var options = {
          siteType: 'html',
          defaultWhiteBackground: true,
          screenSize: {
                width: 650,
                height: 598
          }
      };
      webshot(`<head><style type="text/css">.auto-style1 {	color: #FFFFFF;	text-align: center;	font-size: 28pt;	margin-bottom: 0px;}.auto-style2 {	color: #FFFFFF;	text-align: center;	font-size: large;	margin-bottom: 0px;}</style></head> <form id="form1" runat="server" style="width: 487px; position: absolute; left: 0px; top: 0px; height: 602px;" class="auto-style2">	<div style="height: 253px; position: absolute; left: 0px; top: 0px; width: 113px;"> 		<img height="598" src="https://raw.githubusercontent.com/eduardobarra352/el-famoso-ricardo/master/img/desmotivacion.png" width="650" />	</div><img alt="" height="541" src=${urlimagen} width="647" /></form> <p class="auto-style1" style="width: 587px; height: 22px; position: absolute; left: 32px; top: 464px;">${toptext}</p><p class="auto-style2" style="width: 587px; height: 87px; position: absolute; left: 32px; top: 529px;">${bottomtext}</p>`, 'desmotivacion.png', options, function(err) {
      message.channel.send({file: ("desmotivacion.png")});
      message.channel.stopTyping();
      });
      Log(bot, message, args);
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
    if (cmd === `${prefix}detectorql`) {
        message.channel.startTyping();
        console.log(`${prefix}detectorql usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
	let barratoemoji = '';
        if (message.guild.emojis.find('name', "barrato")) { barratoemoji = message.guild.emojis.find('name', "barrato"); } else { barratoemoji = bot.emojis.get('439570642715803649'); }
        var number = 5;
        var random = Math.floor (Math.random() * (number - 4 + 3)) + 1;
        switch (random) {
            case 1: message.channel.send(`${message.author} no eres **QL** uff tesalvastes bb :baby_symbol: :skull:`, { file: ("https://img00.deviantart.net/09d5/i/2005/074/6/5/a_skull_animation_by_crazyfuck.gif")}); break;
            case 2: message.channel.send(`detecto qls cerca mio pero no se qien ${barratoemoji} :skull: :coffin: TM`, { file: ("https://img00.deviantart.net/09d5/i/2005/074/6/5/a_skull_animation_by_crazyfuck.gif")}); break;
            case 3: message.channel.send(`${message.author} me uele a que loeres perote qiero asi q no :heart:XD :skull:`, { file: ("https://img00.deviantart.net/09d5/i/2005/074/6/5/a_skull_animation_by_crazyfuck.gif")}); break;
            case 4: message.channel.send(`${message.author} mmmmm :sos:pechoso :skull: :tm:`, { file: ("https://img00.deviantart.net/09d5/i/2005/074/6/5/a_skull_animation_by_crazyfuck.gif")}); break;
            case 5: message.channel.send(`${message.author} UN **QL** tienes 5 segundos para correr SJXASJSA :skull: :coffin: :man_dancing: adjunto`, { file: ("https://img00.deviantart.net/09d5/i/2005/074/6/5/a_skull_animation_by_crazyfuck.gif")}); break;
        }
        message.channel.stopTyping();
    }
    if (cmd === `${prefix}famosisimo`) {
        message.channel.startTyping();
        console.log(`${prefix}famosisimo usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
	let famosoemoji = '';
	let famosaemoji = '';
	let shrekardoemoji = '';
	let putqemoji = '';
	let barratoemoji = '';
	let meemputasemoji = '';
        if(message.guild.emojis.find('name', "famosoricardo")) { famosoemoji = message.guild.emojis.find('name', "famosoricardo"); } else { famosoemoji = bot.emojis.get('439570889340878851'); }
        if (message.guild.emojis.find('name', "famosaricarda")) { famosaemoji = message.guild.emojis.find('name', "famosaricarda"); } else { famosaemoji = bot.emojis.get('439570878196613130'); }
        if (message.guild.emojis.find('name', "olacomoestan")) { shrekardoemoji = message.guild.emojis.find('name', "olacomoestan"); } else { shrekardoemoji = bot.emojis.get('439571637831204874'); }
        if (message.guild.emojis.find('name', "putq")) { putqemoji = message.guild.emojis.find('name', "putq"); } else { putqemoji = bot.emojis.get('439571673583321088'); }
        if (message.guild.emojis.find('name', "barrato")) { barratoemoji = message.guild.emojis.find('name', "barrato"); } else { barratoemoji = bot.emojis.get('439570642715803649'); }
        if (message.guild.emojis.find('name', "meemputas")) { meemputasemoji = message.guild.emojis.find('name', "meemputas"); } else { meemputasemoji = bot.emojis.get('439570953912057856'); }
        var number = 6;
        var random = Math.floor (Math.random() * (number - 1 + 1)) + 1;
        switch (random) {
            case 1: message.channel.send(`${message.author}, te identificas con el famoso ricardo omg ${famosoemoji}`, { file: ("https://cdn.discordapp.com/attachments/394255759539437568/478669540088217601/enlarge.png")}); break;
            case 2: message.channel.send(`${message.author}, te identificas con la famosa ricarda jsjsj ${famosaemoji}`, { file: ("https://cdn.discordapp.com/attachments/394255759539437568/478669584103112725/enlarge.png")}); break;
            case 3: message.channel.send(`${message.author}, te identificas con el famoso _**s h r e k a r d o**_ OLACOMOestan ${shrekardoemoji}`, { file: ("https://cdn.discordapp.com/attachments/394255759539437568/478669637194743834/enlarge.png")}); break;
            case 4: message.channel.send(`${message.author}, te identificas con el _acaca_ __**PUTQ**__ ono ${putqemoji}`, { file: ("https://cdn.discordapp.com/attachments/394255759539437568/478669679670591488/enlarge.png")}); break;
            case 5: message.channel.send(`${message.author}, te identificas con el barratisimo :b:arrato ${barratoemoji}`, { file: ("https://media.discordapp.net/attachments/360843373889847298/394934845505011713/emote.png")}); break;
            case 6: message.channel.send(`${message.author}, te identificas con Frida:tm: ME EMPUTQS DXDDJXJD ${meemputasemoji}`, { file: ("https://cdn.discordapp.com/attachments/394255759539437568/478669913871876124/enlarge.png")}); break;
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
    if (cmd === `${prefix}translate`) {
      try {
          let commandFile = require(`./bp/transl.js`);
          commandFile.run(bot, message, args);
      } catch(e) {
          console.log(e.stack);
      }
      console.log(`${prefix}translate usado por: ${message.author.tag} en el server ${message.guild.name} con su uso ${args}`);
      Log(bot, message, args);
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
        if (botid != message.author.id) {
		let imagenattach = '';
		if (message.attachments.size > 0) { bot.guilds.get(guildID).channels.get("482387992837881858").send(`<@${ownerID}> \n:mailbox_with_mail: has recibido mensaje **dm** de __${message.author.tag}__\nID = ${message.author.id}\nMensaje = \n${message.content}`, {file: (message.attachments.first().url)}); }
		else { bot.guilds.get(guildID).channels.get("482387992837881858").send(`<@${ownerID}> \n:mailbox_with_mail: has recibido mensaje **dm** de __${message.author.tag}__\nID = ${message.author.id}\nMensaje = \n${message.content}`); }
	}
    }
    if (cmd === `${prefix}help`) {
        message.channel.send('ola mis __niños__ hoy lespuedo ayudarle acojer digodigo a usarme como tu qieras .__.xD \ncomandos:```>tm \n>invite \n>server \n>paz \n \n-"Tumoristico": \n>famosisimo \n>detectorql \n>meme [url] [Text] o >meme [text0] <imagen> \n>tu [textXD] \n>tumor (100 variaciones distintas omg) \n>esqeletin [textXD] \n>jpg [url de imagen] o <imagen> \n>desmotivacion [url] [Texto] \n>gatogaymermaluma \n>breakingnews | [headline] | [ticker] <imagen> \n \n-Funciones bknes: \n>say (decir algoXD) \n>img [lo q vayas a buscar] \n>yt [nombre del video] \n>translate [idioma original] [idioma q vas a traducir] [textoxD] \n>sc / screenshot [url deuna pagina] (captura un sitio enuna imagen,,) \n>emji [ID de unemoji de un server] (lomismo q >say pero es solo un emoji "global") \n>resize [url] o <imagen> \n>purge (el destructor ricardo) \n>playing (cambia mi estado de juego omg) \n>di [dile algo al famoso, enbase decleverbot XD] \n>avatar <imagen> (puedes cambiar el perfil con imagenes si es que discord no pueda restringir por el sobrecambio del perfil) \n \n-Comandos base (mas comandos ocpionalespro nto,,,): \n>deviantart```');
        console.log(`${prefix}help usado por: ${message.author.tag} en el server ${message.guild.name}`);
        Log(bot, message, args);
    }
//ESPACIO:
    //comandos especiales y administracion
    if (cmd === `${prefix}${code}`) {
        let status = args[0];
        let dammi = args[1];
        let realize = args.slice(2).join(' ');
        message.delete();
        if (args[0].includes('online')) {
            bot.user.setStatus(`Online`);
            message.channel.send(`:white_check_mark: Status cambiado correctamente.`).then(msg => msg.delete(2000));
        }
        if (args[0].includes('idle')) {
            bot.user.setStatus(`idle`);
            message.channel.send(`:white_check_mark: Status cambiado correctamente.`).then(msg => msg.delete(2000));
        }
        if (args[0].includes('dnd')) {
            bot.user.setStatus(`dnd`);
            message.channel.send(`:white_check_mark: Status cambiado correctamente.`).then(msg => msg.delete(2000));
        }
        if (args[0].includes('servers')) {
            message.channel.send(`estoi actualmente por ${bot.guilds.size} servidores o **\n-${bot.guilds.map(g=>g.name).join('\n-')}**`);
        }
	if (args[0].includes('emojis')) {
	    message.channel.send(`emojis: ${bot.emojis.size}`);
            let min = 1;
	    let max = bot.emojis.size;
	    let indx = Math.random() * (max - min) + min;
	    message.channel.send(`<:${bot.emojis.map(e=>e.name).slice((indx-1),indx)}:${bot.emojis.map(e=>e.id).slice((indx-1),indx)}>`);
        }
        if (args[0].includes('send')) {
            if (!isNaN(dammi)) {
                try {
		    if (message.attachments.size > 0) { bot.users.get(dammi).send(realize, {file: (message.attachments.first().url)}); }
		    else { bot.users.get(dammi).send(realize); }
                    message.channel.send(`:white_check_mark: Mensaje enviado.`).then(msg => msg.delete(2000));
		}
		catch (err) {
                    console.log(err);
                    bot.guilds.get(guildID).channels.get("482387992837881858").send(err);
                }
            }
        }
    }
    if (message.attachments.size > 0) { AttachImagen(message.attachments.first().url, message.channel.id); }
    
    function AttachImagen (url, guild) {
	attach.imagen.push({
		url: url,
		guild: guild
	});
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
