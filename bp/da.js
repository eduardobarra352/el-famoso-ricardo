const request = require('request');
const Discord = require('discord.js');
const fs = require('fs');
const deviantnode = require('deviantnode');

exports.run = async (bot, message, args, AttachImagen) => {
  if (!args[0] || !['popular', 'undiscovered', 'newest', 'gallery'].includes(args[0])) return message.reply("lista de comandos relacionados a\nDeviantart\nDeviantart: ```\n\n>deviantart popular [opcional: algo q buscar] \n>deviantart undiscovered \n>deviantart newest [opcional: algo q buscar] \n>deviantart gallery [nombre de usuario]```");
  if (args[0].includes("popular")) {
    let query = args[1];
    let responsable = message.author.id;
    let res;
    let nivel = 1;
    let minim = 0;
    let veces = 0;
    let embed;
    let msgid;
    let filtro;
    let collector;
    var timer;
    function resultados() {
      deviantnode.getPopularDeviations(process.env.daclid, process.env.daclisecret, { q: query, offset: minim, limit: nivel })
      .then(response => {
        res = response;
        let imagenart = '';
        let tituloart = ''; 
        let authorname = '';
        let authorpic = '';
        let arturl;
        function EmbedArt (i) {
          try { imagenart = res.results[i].content.src; } catch(e) { console.log(e); }
          try { arturl = res.results[i].url; } catch(e) { console.log(e); }
          try { tituloart = res.results[i].title; } catch(e) { console.log(e); }
          try { authorname = res.results[i].author.username; authorpic = res.results[i].author.usericon; } catch(e) { console.log(e); }
          embed = new Discord.RichEmbed()
          .setColor("#40f230")
          .setTitle(tituloart)
          .setURL(arturl)
          .setAuthor(message.author.username, message.author.avatarURL)
          .setThumbnail('https://raw.githubusercontent.com/eduardobarra352/el-famoso-ricardo/master/img/deviantart.png')
          .setImage(imagenart)
          .addField("Resultados:", (minim+1) + "-100")
          .setFooter(authorname+" | escribe un numero para ver los otros resultados o.o", authorpic);
          if (veces == 0) { message.channel.send(embed).then(msg => msgid = msg).then(setTimeout(()=>{ if (veces == 0) { embed.setFooter(authorname+' | se termino los resultados,,', authorpic); msgid.edit(embed); } },31000)); }
          try { request(res.results[i].content.src).pipe(fs.createWriteStream('da.png')); setTimeout(()=>{ AttachImagen('da.png', message.channel.id) },2000); } catch(e) { console.log(e); }
        }
        EmbedArt(minim);
        filtro = m => !isNaN(m.content) && m.author.id == responsable && m.content < 10+1 && m.content > 0;
        collector = message.channel.createMessageCollector(filtro, { time: 30000 });
        collector.res = res;
        collector.on('collect', m => {
          clearTimeout(timer);
          if (m > 0 || m < 11) {
              minim = m-1;
              veces = veces+1;
              resultados();
              setTimeout(()=>{ msgid.edit(embed); m.delete(); },1000);
              timer = setTimeout(()=>{
                collector.on('end', v => {
                  setTimeout(()=>{ embed.setFooter('se termino los resultados,,'); msgid.edit(embed); },2000);
                });
              },30000);
          }
        });
      });
    }
    resultados();
    message.channel.stopTyping();
  }
  if (args[0].includes("undiscovered")) {
    let responsable = message.author.id;
    let res;
    let nivel = 1;
    let minim = 0;
    let veces = 0;
    let embed;
    let msgid;
    let filtro;
    let collector;
    var timer;
    function resultados() {
      deviantnode.getUndiscoveredDeviations(process.env.daclid, process.env.daclisecret, { offset: minim, limit: nivel })
      .then(response => {
        res = response;
        let imagenart = '';
        let tituloart = ''; 
        let authorname = '';
        let authorpic = '';
        function EmbedArt (i) {
          try { imagenart = res.results[i].content.src; } catch(e) { console.log(e); }
          try { tituloart = res.results[i].title; } catch(e) { console.log(e); }
          try { authorname = res.results[i].author.username; authorpic = res.results[i].author.usericon; } catch(e) { console.log(e); }
          embed = new Discord.RichEmbed()
          .setColor("#40f230")
          .setTitle(tituloart)
          .setURL(res.results[i].url)
          .setAuthor(message.author.username, message.author.avatarURL)
          .setThumbnail('https://raw.githubusercontent.com/eduardobarra352/el-famoso-ricardo/master/img/deviantart.png')
          .setImage(imagenart)
          .addField("Resultados:", (minim+1) + "-10")
          .setFooter(authorname+" | escribe un numero para ver los otros resultados o.o", authorpic);
          if (veces == 0) { message.channel.send(embed).then(msg => msgid = msg).then(setTimeout(()=>{ if (veces == 0) { embed.setFooter(authorname+' | se termino los resultados,,', authorpic); msgid.edit(embed); } },31000)); }
          try { request(res.results[i].content.src).pipe(fs.createWriteStream('da.png')); setTimeout(()=>{ AttachImagen('da.png', message.channel.id) },2000); } catch(e) { console.log(e); }
        }
        EmbedArt(minim);
        filtro = m => !isNaN(m.content) && m.author.id == responsable && m.content < 10+1 && m.content > 0;
        collector = message.channel.createMessageCollector(filtro, { time: 30000 });
        collector.res = res;
        collector.on('collect', m => {
          clearTimeout(timer);
          if (m > 0 || m < 11) {
            minim = m-1;
            veces = veces+1;
            resultados();
            setTimeout(()=>{ msgid.edit(embed); m.delete(); },1000);
            timer = setTimeout(()=>{
              collector.on('end', v => {
                setTimeout(()=>{ embed.setFooter('se termino los resultados,,'); msgid.edit(embed); },2000);
              });
            },30000);
          }
        });
      });
    }
    resultados();
    message.channel.stopTyping();
  }
  if (args[0].includes("newest")) {
    let query = args[1];
    let responsable = message.author.id;
    let res;
    let nivel = 1;
    let minim = 0;
    let veces = 0;
    let embed;
    let msgid;
    let filtro;
    let collector;
    var timer;
    function resultados() {
      deviantnode.getNewestDeviations(process.env.daclid, process.env.daclisecret, { q: query, offset: minim, limit: nivel })
      .then(response => {
        res = response;
        let imagenart = '';
        let tituloart = ''; 
        let authorname = '';
        let authorpic = '';
        let arturl;
        function EmbedArt (i) {
          try { imagenart = res.results[i].content.src; } catch(e) { console.log(e); }
          try { arturl = res.results[i].url; } catch(e) { console.log(e); }
          try { tituloart = res.results[i].title; } catch(e) { console.log(e); }
          try { authorname = res.results[i].author.username; authorpic = res.results[i].author.usericon; } catch(e) { console.log(e); }
          embed = new Discord.RichEmbed()
          .setColor("#40f230")
          .setTitle(tituloart)
          .setURL(arturl)
          .setAuthor(message.author.username, message.author.avatarURL)
          .setThumbnail('https://raw.githubusercontent.com/eduardobarra352/el-famoso-ricardo/master/img/deviantart.png')
          .setImage(imagenart)
          .addField("Resultados:", (minim+1) + "-10")
          .setFooter(authorname+" | escribe un numero para ver los otros resultados o.o", authorpic);
          if (veces == 0) { message.channel.send(embed).then(msg => msgid = msg).then(setTimeout(()=>{ if (veces == 0) { embed.setFooter(authorname+' | se termino los resultados,,', authorpic); msgid.edit(embed); } },31000)); }
          try { request(res.results[i].content.src).pipe(fs.createWriteStream('da.png')); setTimeout(()=>{ AttachImagen('da.png', message.channel.id) },2000); } catch(e) { console.log(e); }
        }
        EmbedArt(minim);
        filtro = m => !isNaN(m.content) && m.author.id == responsable && m.content < 10+1 && m.content > 0;
        collector = message.channel.createMessageCollector(filtro, { time: 30000 });
        collector.res = res;
        collector.on('collect', m => {
          clearTimeout(timer);
          if (m > 0 || m < 11) {
              minim = m-1;
              veces = veces+1;
              resultados();
              setTimeout(()=>{ msgid.edit(embed); m.delete(); },1000);
              timer = setTimeout(()=>{
                collector.on('end', v => {
                  setTimeout(()=>{ embed.setFooter('se termino los resultados,,'); msgid.edit(embed); },2000);
                });
              },30000);
          }
        });
      });
    }
    resultados();
    message.channel.stopTyping();
  }
  if (args[0].includes("gallery")) {
    if (!args[1]) return message.reply("```>deviantart gallery [nombre de usuario]```");
    let usuario = args[1];
    let responsable = message.author.id;
    let res;
    let nivel = 1;
    let minim = 0;
    let veces = 0;
    let limite;
    let embed;
    let msgid;
    let filtro;
    let collector;
    var timer;
    deviantnode.getUserInfo(process.env.daclid, process.env.daclisecret, { username: usuario })
    .then(r => {
      limite = r.stats.user_deviations;
      message.channel.startTyping();
      function resultados() {
        deviantnode.getGalleryAllDeviations(process.env.daclid, process.env.daclisecret, { username: usuario, offset: minim, limit: nivel })
        .then(response => {
          res = response;
          if (res.has_more == false && res.next_offset == null && veces == 0) { message.channel.send(":warning: arte delusuario vacio, siga buscando,,,"); message.channel.stopTyping(); return; }
          let imagenart = '';
          let tituloart = ''; 
          let authorname = '';
          let authorpic = '';
          let arturl = '';
          if (limite > 70) limite = 70;
          function EmbedArt (i) {
            try { imagenart = res.results[i].content.src; } catch(e) { console.log(e); }
            try { arturl = res.results[i].url; } catch(e) { console.log(e); }
            try { tituloart = res.results[i].title; } catch(e) { console.log(e); }
            try { authorname = res.results[i].author.username; authorpic = res.results[i].author.usericon; } catch(e) { console.log(e); }
            embed = new Discord.RichEmbed()
            .setColor("#40f230")
            .setTitle(tituloart)
            .setURL(arturl)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setThumbnail('https://raw.githubusercontent.com/eduardobarra352/el-famoso-ricardo/master/img/deviantart.png')
            .setImage(imagenart)
            .addField("Resultados:", (minim+1) + "-" + limite)
            .setFooter(authorname+" | escribe un numero para ver los otros resultados o.o", authorpic);
            if (veces == 0) { message.channel.send(embed).then(msg => msgid = msg).then(setTimeout(()=>{ if (veces == 0) { embed.setFooter(authorname+' | se termino los resultados,,', authorpic); msgid.edit(embed); } },31000)); }
            try { request(res.results[i].content.src).pipe(fs.createWriteStream('da.png')); setTimeout(()=>{ AttachImagen('da.png', message.channel.id) },2000); } catch(e) { console.log(e); }
            if (res.has_more == false && res.next_offset == null && veces > 0) { embed.setColor("#ff2e2e").setTitle('Uh-oh, posts del usuario').setDescription('si deseas pasarte por su deviantart es: https://www.deviantart.com/'+usuario); msgid.edit(embed); message.channel.stopTyping(); }
          }
          EmbedArt(minim);
          filtro = m => !isNaN(m.content) && m.author.id == responsable && m.content < limite+1 && m.content > 0;
          collector = message.channel.createMessageCollector(filtro, { time: 30000 });
          collector.res = res;
          collector.on('collect', m => {
            clearTimeout(timer);
            if (m > 0 || m < (limite+1)) {
              minim = m-1;
              veces = veces+1;
              resultados();
              setTimeout(()=>{ msgid.edit(embed); m.delete(); },1000);
              timer = setTimeout(()=>{
                collector.on('end', v => {
                  setTimeout(()=>{ embed.setFooter(authorname+' | se termino los resultados,,', authorpic); msgid.edit(embed); },2000);
                });
              },30000);
            }
          });
        });
      }
      resultados();
      message.channel.stopTyping();
    });
  }
}
