const request = require('request');
const Discord = require('discord.js');

exports.run = async (bot, message, args, AttachImagen) => {
  if (!args[0]) return message.reply("lista de comandos relacionados a\nDeviantart\nDeviantart: ```\n\n>deviantart undiscovered \n>deviantart newest \n>deviantart gallery [nombre de usuario]```");
  if (args[0].includes("undiscovered")) {
    let res;
    let nivel = 1;
    let minim = 0;
    let veces = 0;
    let embed;
    let msgid;
    let filtro;
    let collector;
    var timer;
    request('http://barrarchiverio.7m.pl/a/access?client_id='+process.env.daclid+'&client_secret='+process.env.daclisecret, function (err, response, body) {
      body = JSON.parse(body);
      let url;
      message.channel.startTyping();
      function resultados() {
        url = 'https://www.deviantart.com/api/v1/oauth2/browse/undiscovered?offset='+minim+'&limit='+nivel+'&access_token='+body.access_token;
        request({ url: url, json: true }, function (err, response, body) { if (!err && response.statusCode === 200) {
          if (err) return message.channel.send(":x: Uy, un erroralgo feo, mmmm siga intentando");
          res = JSON.stringify(body, null, '  ');
          res = JSON.parse(res);
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
              .addField("Resultados:", (minim+1) + "-100")
              .setFooter(authorname+" | escribe un numero para ver los otros resultados o.o", authorpic);
              if (veces == 0) { message.channel.send(embed).then(msg => msgid = msg).then(setTimeout(()=>{ if (veces == 0) { embed.setFooter(authorname+' | se termino los resultados,,', authorpic); msgid.edit(embed); } },31000)); }
              try { AttachImagen(res.results[i].content.src, message.channel.id); } catch(e) { console.log(e); }
          }
          EmbedArt(0);
          filtro = m => !isNaN(m.content) && m.content < 100+1 && m.content > 0;
          collector = message.channel.createMessageCollector(filtro, { time: 30000 });
          collector.res = res;
          collector.on('collect', m => {
              clearTimeout(timer);
              if (m > 0 || m < 101) {
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
        }
        });
      }
      resultados();
      message.channel.stopTyping();
    });
  }
  if (args[0].includes("newest")) {
    let res;
    let nivel = 1;
    let minim = 0;
    let veces = 0;
    let embed;
    let msgid;
    let filtro;
    let collector;
    var timer;
    request('http://barrarchiverio.7m.pl/a/access?client_id='+process.env.daclid+'&client_secret='+process.env.daclisecret, function (err, response, body) {
      body = JSON.parse(body);
      let url;
      message.channel.startTyping();
      function resultados() {
        url = 'https://www.deviantart.com/api/v1/oauth2/browse/newest?offset='+minim+'&limit='+nivel+'&access_token='+body.access_token;
        request({ url: url, json: true }, function (err, response, body) { if (!err && response.statusCode === 200) {
          if (err) return message.channel.send(":x: Uy, un erroralgo feo, mmmm siga intentando");
          res = JSON.stringify(body, null, '  ');
          res = JSON.parse(res);
          let imagenart = '';
          let tituloart = ''; 
          let authorname = '';
          let authorpic = '';
          let arturl;
          function EmbedArt (i) {
              try { imagenart = res.results[i].content.src; } catch(e) { console.log(e); }
              try { tituloart = res.results[i].title; } catch(e) { console.log(e); }
              try { arturl = res.results[i].url; } catch(e) { console.log(e); }
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
              try { AttachImagen(res.results[i].content.src, message.channel.id); } catch(e) { console.log(e); }
          }
          EmbedArt(0);
          filtro = m => !isNaN(m.content) && m.content < 100+1 && m.content > 0;
          collector = message.channel.createMessageCollector(filtro, { time: 30000 });
          collector.res = res;
          collector.on('collect', m => {
              clearTimeout(timer);
              if (m > 0 || m < 101) {
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
        }
        });
      }
      resultados();
      message.channel.stopTyping();
    });
  }
  if (args[0].includes("gallery")) {
    if (!args[1]) return message.reply("```>deviantart gallery [nombre de usuario]```");
    let usuario = args[1];
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
    request('http://barrarchiverio.7m.pl/a/access?client_id='+process.env.daclid+'&client_secret='+process.env.daclisecret, function (err, response, body) {
      body = JSON.parse(body);
      let url;
      let urlStats = 'https://www.deviantart.com/api/v1/oauth2/user/profile/'+usuario+'?access_token='+body.access_token;
      request({ url: urlStats, json: true }, function (e, r, b) { if (!e && response.statusCode === 200) {
        if (e) { message.channel.send(":x: Uy, un erroralgo feo, mmmm siga intentando"); message.channel.stopTyping(); return; }
        r = JSON.stringify(b, null, '  ');
        r = JSON.parse(r);
        console.log(r.stats);
        limite = r.stats.user_deviations;
      }});
      message.channel.startTyping();
      function resultados() {
        url = 'https://www.deviantart.com/api/v1/oauth2/gallery/all?username='+usuario+'&offset='+minim+'&limit='+nivel+'&access_token='+body.access_token;
        request({ url: url, json: true }, function (err, response, body) { if (!err && response.statusCode === 200) {
          if (err) { message.channel.send(":x: Uy, un erroralgo feo, mmmm siga intentando"); message.channel.stopTyping(); return; }
          res = JSON.stringify(body, null, '  ');
          res = JSON.parse(res);
          if (res.has_more == false && res.next_offset == null) { message.channel.send(":x: usuario no existente, opuede ser q no tenga arte subido,,"); message.channel.stopTyping(); return; }
          let imagenart = '';
          let tituloart = ''; 
          let authorname = '';
          let authorpic = '';
          if (limite > 70) limite = 70;
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
              .addField("Resultados:", (minim+1) + "-" + limite)
              .setFooter(authorname+" | escribe un numero para ver los otros resultados o.o", authorpic);
              if (veces == 0) { message.channel.send(embed).then(msg => msgid = msg).then(setTimeout(()=>{ if (veces == 0) { embed.setFooter(authorname+' | se termino los resultados,,', authorpic); msgid.edit(embed); } },31000)); }
              try { AttachImagen(res.results[i].content.src, message.channel.id); } catch(e) { console.log(e); }
          }
          EmbedArt(0);
          filtro = m => !isNaN(m.content) && m.content < limite+1 && m.content > 0;
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
        }
        });
      }
      resultados();
      message.channel.stopTyping();
    });
  }
}
