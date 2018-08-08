const Discord = require(`discord.js`);
const bot = new Discord.Client({disableEveryone: true});

//bot en conexión
bot.on("ready", () => {
    console.log(`${bot.user.username} is online! `);
    bot.user.setStatus(`dnd`);
    bot.user.setPresence({game: {name: 'testeando | >help', type: 3}});
});

bot.on("message", message => {
    
    if (message.author.bot) return undefined;
    if (message.channel.type === "dm") return;
    
    //variantes
    const prefix = '>';
    let msg = message.content.toLowerCase();
    let args = message.content.slice(prefix.lenght).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    
    if (message.content === '>'){
        message.channel.send("Si");
    }
    if (message.content === '<'){
        message.channel.send("No");
    }
    //comandos de prefix
    if (cmd === `${prefix}famoso`){
        message.channel.send("ricardo");
    }
    if (cmd === `${prefix}ricardo`){
        message.channel.send("famoso");
    }
    if (cmd === `${prefix}say`){
           let say = args.join(' ');
           message.delete();
           message.channel.send(say);
    }
    if (cmd === `${prefix}tm`){
        message.channel.send("https://media.discordapp.net/attachments/394205840804151308/398998022920470530/sketch-1515197879765.png");
    }
    if (cmd === `${prefix}paz`){
        message.channel.send("amemonos");
    }
    if (cmd === `${prefix}help`){
        message.channel.send("ola mis __niños__ hoy lespuedo ayudarle acojer digodigo a usarme como tu qieras u.uXD O TOA VIOLARA: comandos: **>famoso** ; **>ricardo** ; **>tm** ; **>paz** ; **>say**.");
    }
});

bot.login(process.env.token);
