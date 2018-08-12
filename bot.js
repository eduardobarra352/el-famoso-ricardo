const Discord = require(`discord.js`);
const bot = new Discord.Client({ disableEveryone: true });

//bot en conexión
bot.on("ready", () => {
    var play = '>help';
    console.log(`${bot.user.username} is online! `);
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
        message.channel.send("https://discordapp.com/oauth2/authorize?client_id=476139360870334464&scope=bot&permissions=0");
    }
    if (cmd === `${prefix}server`) {
        message.channel.send("https://discord.gg/NGV4RNS");
    }
    if (message.content === '>') {
        message.channel.send("Si");
    }
    if (message.content === '<') {
        message.channel.send("No");
        let otrolado = args.join(' ');
        if (cmd === '<' && otrolado) {
            message.channel.send("es para el otro lado XDSJ");
        }
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
        message.delete();
        message.channel.send(say);
    }
    if (cmd === `${prefix}tm`) {
        message.channel.send({ file: ("./img/tm.png")});
    }
    if (cmd === `${prefix}playing`) {
        bot.user.setPresence({ game: { name: ' >help', type: 1 } });
        let play = args.join(' ');
        if (cmd === `${prefix}playing` && play) {
            bot.user.setPresence({ game: { name: play, type: 1 } });
            message.channel.send("uy jaja me cambiastes mi _estado_ (algunas veces puede tardar,,,tm)");
        }
    }
    if (cmd === `${prefix}paz`) {
        message.channel.send("amemonos");
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

    if (cmd === `famoso`) {
        let famosoemoji = message.guild.emojis.find('name', "famosoricardo");
        message.react(famosoemoji);
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
        message.channel.send({ file: ("./img/tus.png") });
    }
    if (cmd === `${prefix}XD`) {
        number = 25;
        var random = Math.floor (Math.random() * (number - 1 + 1)) + 1;
        switch (random) {
            case 1: message.channel.send("https://cdn.discordapp.com/attachments/423962809274204172/464623154254577671/comic.png"); break;
            case 2: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/463134274975956992/36517369_2081966238727483_1493106274777169920_n.jpg"); break;
            case 3: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/462344327654277153/Screenshot_2018-06-26_174328.png"); break;
            case 4: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/461350368434192404/meme-3.png"); break;
            case 5: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/455137968294723584/15_sin_titulo.png"); break;
            case 6: message.channel.send("Busco al grasosito culiado. Etiqu_E_talo_**grasa es un término genérico para designar varias clases de lípidos, aunque generalmente se refiere a los acilglicéridos, ésteres en los que uno, dos o tres ácidos gr**_ ```-SrSander 06/27/2018```"); break;
            case 7: message.channel.send("https://cdn.discordapp.com/attachments/426917497988448256/469269683015778304/comic.png"); break;
            case 8: message.channel.send("https://pbs.twimg.com/media/DaW5kmEWsAE4si8.jpg"); break;
            case 9: message.channel.send("https://www.youtube.com/watch?v=8CppDPqwni0"); break;
            case 10: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/450788982700376066/unknown.png"); break;
            case 11: message.channel.send("https://cdn.discordapp.com/attachments/426917497988448256/449761429986213889/IMG-20180523-WA0008.jpg"); break;
            case 12: message.channel.send("https://cdn.discordapp.com/attachments/426917497988448256/447616737576484865/meme.png"); break;
            case 13: message.channel.send("https://cdn.discordapp.com/attachments/426917497988448256/447488954489503764/345346547.gif"); break;
            case 14: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/442809067140808706/20180505_163213.png"); break;
            case 15: message.channel.send("https://cdn.discordapp.com/attachments/426917497988448256/440626083394486282/29683303_1080725295401045_4974137900581864235_n.png"); break;
            case 16: message.channel.send("https://cdn.discordapp.com/attachments/394255759539437568/460913375522717696/magik.gif"); break;
            case 17: message.channel.send("https://cdn.discordapp.com/attachments/394255759539437568/450785384067235840/gmagik.gif"); break;
            case 18: message.channel.send("https://cdn.discordapp.com/attachments/394255759539437568/450119687741636609/unknown.png"); break;
            case 19: message.channel.send("FAMOSŒA SHREKAKA ```-shopedo 03/30/2018"); break;
            case 20: message.channel.send("https://cdn.discordapp.com/attachments/394255759539437568/424735161809240065/gmagik.gif"); break;
            case 21: message.channel.send("https://cdn.discordapp.com/attachments/394255759539437568/450128821820063745/gmagik.gif omg un clip de el esqueleto la pelicula en 3d pongan sen sus lentes 3d parabberlo"); break;
            case 22: message.channel.send("https://cdn.discordapp.com/attachments/426917497988448256/439271994978992129/unknown.png"); break;
            case 23: message.channel.send("https://cdn.discordapp.com/attachments/426917497988448256/427194530102771733/comic.png"); break;
            case 24: message.channel.send("https://cdn.discordapp.com/attachments/426917497988448256/426925235258916876/51_sin_titulo.png"); break;
            case 25: message.channel.send("https://cdn.discordapp.com/attachments/423962809274204172/467488838986760194/unknown.png"); break;
        }
    }
    if (cmd === `${prefix}help`) {
        message.channel.send("ola mis __niños__ hoy lespuedo ayudarle acojer digodigo a usarme como tu qieras u.uXD O TOA VIOLARA: comandos:```>tm                                                                                >invite                                                                                >server                                                                                >paz                                                                                >gatogaymermaluma                                                                                >say (decir algoXD :famosoricardo:)                                                            >purge (el destructor ricardo)                                                            >playing (cambia mi estado de juego omg)```");
    }

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
    }
});

bot.login(process.env.token);
