const Discord = require(`discord.js`);
const bot = new Discord.Client({disableEveryone: true});

//bot en conexión
bot.on("ready", () => {
    console.log(`${bot.user.username} is online! `);
    bot.user.setStatus(`dnd`);
    bot.user.setPresence({game: {name: ' >help', type: 3}});
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
    if (cmd === '<' && args){
        message.channel.send("es para el otro lado XDSJ");
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
    if (cmd === `${prefix}playing`){
        bot.user.setPresence({game: {name: ' >help', type: 3}});
        let play = args.join(' ');
        if (cmd === `${prefix}playing` && play){
            bot.user.setPresence({game: {name: play , type: 3}});
            message.channel.send("uy jaja me cambiastes mi _estado_ (algunas veces puede tardar,,,tm)");
        }
    }
    if (cmd === `${prefix}paz`){
        message.channel.send("amemonos");
    }
    if (cmd === `${prefix}purge`){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No.");
        if(!args[0]) return message.channel.send("no");
        message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Clear ${args[0]} messages.`).then(msg => msg.delete(2000));
    )};
    if (cmd === `${prefix}sans`){
        message.channel.send("gaming");
    }
    if (cmd === `${prefix}gaming`){
        message.channel.send("sans");
    }
    if (cmd === `${prefix}barrato`){
        message.channel.send("https://media.discordapp.net/attachments/360843373889847298/394934845505011713/emote.png **mi contraparte pero a la ves _loqieromucho_ __ATM__**");
    }
    if (cmd === `${prefix}help`){
        message.channel.send("ola mis __niños__ hoy lespuedo ayudarle acojer digodigo a usarme como tu qieras u.uXD O TOA VIOLARA: comandos: **>famoso** ; **>ricardo** ; **>tm** ; **>paz** ; **>barrato** ; **>sans** ; **>gaming** ; **>say (decir algoXD :famosoricardo:)** ; **>playing (cambia mi estado de juego omg)**.");
    }
});

bot.login(process.env.token);
