const Discord = require(`discord.js`);
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", () => {
    console.log(`${bot.user.username} is online! `);
});

bot.on("message", message => {
    
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    
    let prefix = '>';
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    
    if (cmd === `${prefix}famoso`){
        message.channel.send("ricardo");
    }
    if (cmd === `${prefix}say " "`){
        message.channel.send(args);
    }
    else if (cmd === `${prefix}tm`){
        message.channel.send("https://media.discordapp.net/attachments/394205840804151308/398998022920470530/sketch-1515197879765.png");
    }
    if (cmd === `${prefix}paz`){
        message.channel.send("amemonos");
    }
    if (cmd === `${prefix}help`){
        message.channel.send("ola mis __niños__ hoy lespuedo ayudarle acojer digodigo a usarme como tu qieras u.uXD O TOA VIOLARA: comandos: **>famoso** ; **>tm** ; **>paz**.");
    }
});

bot.login(process.env.token);
