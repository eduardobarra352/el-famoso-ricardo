exports.run = async (bot, message, cmd, prefix, args, webshot, Log) => {
  let barra = ' | ';
  let urlimagen = args[0];
  //let imagen = message.attachments.first().url;
  let args2 = message.content.slice(cmd.lenght).trim().split(urlimagen);
  let args3 = message.content.slice(args2.lenght).trim().split(barra);
  let toptext = args2[1];
  let bottomtext = args3[2];
  let verifyurl = ['http://', 'https://', '.png', '.jpg', '.gif', '.bmp'];
  let foundurl = false;
  for (var i in verifyurl) {
    if (message.content.toLowerCase().includes(verifyurl[i].toLowerCase())) foundurl = true;
  }
  if (!args[0]) return message.reply("```1- >desmotivacion [url] [toptext] \n2- >desmotivacion [url] [toptext] | [bottomtext] \n3- >desmotivacion [toptext] | [bottomtext] \n <imagen>```");
  if (!toptext) return message.reply(":x: es importante el texto, yno esta ppresente; siga intentando");
  if (cmd === `${prefix}desmotivacion` && urlimagen && toptext) {
    bottomtext = '';
    if(foundurl) {
      message.channel.startTyping();
      console.log(`${prefix}desmotivacion usado por: ${message.author.tag} en el server ${message.guild.name} con su uso "${args}"`);
      Log(bot, message, args);
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
    }
    else {
      message.reply(":x: noexiste la imagen/url, reintente.,.,.,");
    }
  }
  //message.channel.send({ file: ("./img/desmotivacion.png") });
  //\n https://raw.githubusercontent.com/eduardobarra352/el-famoso-ricardo/master/img/desmotivacion.png
}
