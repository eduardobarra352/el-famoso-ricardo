const Discord = require(`discord.js`);
const bot = new Discord.Client({disableEveryone: true});

//bot en conexión
bot.on("ready", () => {
    var play = '>help';
    console.log(`${bot.user.username} is online! `);
    bot.user.setStatus(`dnd`);
    bot.user.setPresence({game: {name: play, type: 1}});
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
        let otrolado = args.join(' ');
        if (cmd === '<' && otrolado){
            message.channel.send("es para el otro lado XDSJ");
        }
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
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: No tienes los permisos o el mismisimo famoso ricardo no los tendrá para acceder a algo así");
        if(!args[0]) return message.channel.send(":x: No puedes eliminar algo que sea nada q grasioso no¿");
        message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`se ha borrado ${args[0]} mensajes, omg soi un **destructor** _ricardo_.`).then(msg => msg.delete(4000));
    });
    }
    if (cmd === `${prefix}sans`){
        message.channel.send("gaming");
    }
    
    if (cmd === `famoso`){
        let famosoemoji = message.guild.emojis.find('name', "famosoricardo");
        message.react(famosoemoji);
    }
    if (cmd === `barrato`){
        let barratoemoji = message.guild.emojis.find('name', "barrato");
        message.react(barratoemoji);
    }
    if (cmd === `phineas`){
        let phineasemoji = message.guild.emojis.find('name', "phineas");
        message.react(phineasemoji);
    }
    
    if (cmd === `${prefix}gaming`){
        message.channel.send("sans");
    }
    if (cmd === `${prefix}gato`){
        message.channel.send("https://www.youtube.com/channel/UCmUk4tyuIw1AZBzYqXmxsbw");
    }
    if (cmd === `${prefix}gatogaymermaluma`){
        message.channel.send("https://www.youtube.com/channel/UCmUk4tyuIw1AZBzYqXmxsbw");
    }
    if (cmd === `${prefix}barrato`){
        message.channel.send("https://media.discordapp.net/attachments/360843373889847298/394934845505011713/emote.png **mi contraparte pero a la ves _loqieromucho_ __ATM__**");
    }
    if (cmd === `${prefix}help`){
        message.channel.send("ola mis __niños__ hoy lespuedo ayudarle acojer digodigo a usarme como tu qieras u.uXD O TOA VIOLARA: comandos:```>tm                                                                                >paz                                                                                >gatogaymermaluma                                                                                >say (decir algoXD :famosoricardo:)                                                            >purge (el destructor ricardo)                                                            >playing (cambia mi estado de juego omg)```");
    }
    
    //comandos especiales y administracion
    if (cmd === `${prefix}352421`){
        let status = args.join(' ');
        message.delete();
        if (cmd === `${prefix}352421` && status === 'online'){
            bot.user.setStatus(`Online`);
            message.delete();
            message.channel.send(`:white_check_mark: Status cambiado correctamente.`).then(msg => msg.delete(2000));
        }
        if (cmd === `${prefix}352421` && status === 'idle'){
            bot.user.setStatus(`idle`);
            message.delete();
            message.channel.send(`:white_check_mark: Status cambiado correctamente.`).then(msg => msg.delete(2000));
        }
        if (cmd === `${prefix}352421` && status === 'dnd'){
            bot.user.setStatus(`dnd`);
            message.delete();
            message.channel.send(`:white_check_mark: Status cambiado correctamente.`).then(msg => msg.delete(2000));
        }
    }
});

bot.login(process.env.token);
