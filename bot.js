const Discord = require(`discord.js`);
const bot = new Discord.Client({ disableEveryone: true });

//bot en conexión
bot.on("ready", () => {
    var play = `>help`;
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
        let otrolado = args.join(' ').slice(msg.lenght);
        if (message.channel === '<' && otrolado === ' ') {
            message.reply("es para el otro lado XDSJ");
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
        bot.user.setPresence({ game: { name:  `>help`, type: 1 } });
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
    //if (cmd === `${prefix}tu`) {
      //  message.reply("complemente el Tu para q dea un mensaje de la siguiente forma:```>tu [textXD]```");
        //let image = { file: ("./img/tus.png") };
        //let tus = args.join(' ');
        //if (cmd === `${prefix}tu` && tus) {
          //    var converter
            //    {
             //           image.length = 507, 431;
              //};
           // var pngBytes = converter.GenerateImage(image + tus);
           // message.channel.SendFileAsync("tus.png");
            //message.channel.send(tus, { file: ("./img/tus.png") });
     //   }
    //}
    if (cmd === `${prefix}detectorql`) {
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
    }
    if (cmd === `${prefix}famosisimo`) {
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
    }
    if (cmd === `${prefix}tumor`) {
        var number = 100;
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
            case 19: message.channel.send("FAMOSŒA SHREKAKA ```-shopedo 03/30/2018```"); break;
            case 20: message.channel.send("https://cdn.discordapp.com/attachments/394255759539437568/424735161809240065/gmagik.gif"); break;
            case 21: message.channel.send("https://cdn.discordapp.com/attachments/394255759539437568/450128821820063745/gmagik.gif omg un clip de el esqueleto la pelicula en 3d pongan sen sus lentes 3d parabberlo"); break;
            case 22: message.channel.send("https://cdn.discordapp.com/attachments/426917497988448256/439271994978992129/unknown.png"); break;
            case 23: message.channel.send("https://cdn.discordapp.com/attachments/426917497988448256/427194530102771733/comic.png"); break;
            case 24: message.channel.send("https://cdn.discordapp.com/attachments/426917497988448256/426925235258916876/51_sin_titulo.png"); break;
            case 25: message.channel.send("https://cdn.discordapp.com/attachments/423962809274204172/467488838986760194/unknown.png"); break;
            case 26: message.channel.send("la amala mader a de  hcaer  las cosas e s haciendolo de la manaera correcta de Manuelito Zambrano Industrias Inc.manofactoría de seleccjin automatica y sus ```-SrSander 03/15/2018```"); break;
            case 27: message.channel.send("https://cdn.discordapp.com/attachments/394232819066601483/428683990627647488/pornhub.png"); break;
            case 28: message.channel.send("https://cdn.discordapp.com/attachments/402456889675481089/452320016507863050/images.png"); break;
            case 29: message.channel.send("https://cdn.discordapp.com/attachments/402456889675481089/437421241486409748/gmagik.gif"); break;
            case 30: message.channel.send("Se juega. al principio debes crear tu personaje a tu gusto,d después te va a mostrar 3 pokemon tu debes clicear al que más te guste después debes hacer con el dedo tirar la pokebola hacia el pokemon cuando ya se atrapó debes esperar a que se atrape bien y listo, despues debes salir de tu casa y caminar ata que en el mapa te aparezca uno y listo lo atrapas igual que en el principio y no puedes tener más de 50 pokemon haci se juega y tengo 8 años adios"); break;
            case 31: message.channel.send("_**momentos epicos de ayer y hoy**_ https://cdn.discordapp.com/attachments/402456889675481089/437086464459931650/IMG_20180221_142051.jpg"); break;
            case 32: message.channel.send("https://cdn.discordapp.com/attachments/402456889675481089/437085877664219137/unknown-2.png"); break;
            case 33: message.channel.send("https://cdn.discordapp.com/attachments/402456889675481089/413207093794045954/meme.png"); break;
            case 34: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/450130439026376734/unknown.png"); break;
            case 35: message.channel.send("https://media.discordapp.net/attachments/426920972772180009/444169554826887178/unknown.png?width=405&height=473"); break;
            case 36: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/456579947696226308/unknown.png"); break;
            case 37: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/440629187104079872/estatua.png"); break;
            case 38: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/438901162633199618/image-2.jpg"); break;
            case 39: message.channel.send("https://pbs.twimg.com/media/DaXIZh0W4AA8uGr.jpg"); break;
            case 40: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/430941289568141322/20180404_010623.jpg"); break; //has soñado con el¿
            case 41: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/427126386520621056/violameeee.png"); break;
            case 42: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/427126386520621057/toxicos.png"); break;
            case 43: message.channel.send("https://images-ext-1.discordapp.net/external/S4LwYedccJiI_Flj9EMwrUtVf1UkNG8C5f-e7KGCUHM/https/i.ytimg.com/vi/Q4sqlEAqYPY/hqdefault.jpg"); break;
            case 44: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/427485550296170516/b.png"); break;
            case 45: message.channel.send("https://youtu.be/B1sU4eTcZAc"); break;
            case 46: message.channel.send("https://cdn.discordapp.com/attachments/423962809274204172/464887184617373696/comic.png"); break;
            case 47: message.channel.send("https://cdn.discordapp.com/attachments/426917497988448256/461737420161810433/received_644648532554886.png"); break;
            case 48: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/456888279422205954/unknown.png"); break;
            case 49: message.channel.send("https://www.youtube.com/watch?v=8CppDPqwni0"); break;
            case 50: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/448684146408030210/26552683_1586961988065720_144618130_n.png"); break;
            case 51: message.channel.send("https://cdn.discordapp.com/attachments/344697221133893633/436274539257790466/30711856_238955550180798_7331586049891631104_n.png"); break;
            case 52: message.channel.send("https://cdn.discordapp.com/attachments/426917497988448256/436301919074385920/unknown.png"); break;
            case 53: message.channel.send("https://cdn.discordapp.com/attachments/426917497988448256/433351792093298688/Capture_2018-04-10-04-39-09.png"); break;
            case 54: message.channel.send("https://cdn.discordapp.com/attachments/394255759539437568/432724913552359434/IMG-20180408-WA0023.jpg"); break;
            case 55: message.channel.send("https://cdn.discordapp.com/attachments/394255759539437568/432655207370063882/Screenshot_2018-04-08-16-36-30-1.png"); break;
            case 56: message.channel.send("VOI A BAILAR EN TU TUMBA GRASOSO QL https://cdn.discordapp.com/attachments/394205840804151308/426904554911694855/esqueleto_bailando.gif ```-eduardobarra 03/23/2018```"); break;
            case 57: message.channel.send("https://cdn.discordapp.com/attachments/394205840804151308/426490232217665539/gmagik.gif"); break;
            case 58: message.channel.send("acaso a los arabes les duele su pillin XD```-shopedo 03/22/2018```"); break;
            case 59: message.channel.send("https://www.youtube.com/watch?v=yfefsPDYVyg"); break;
            case 60: message.channel.send("no odias cuando la polisia de los s de la ©™  teroban tu estatua del famoso ricardO?!?!??!!??! like site pasa ```-shopedo 03/13/2018```"); break;
            case 61: message.channel.send("https://cdn.discordapp.com/attachments/394207644723970049/421416239043444766/IMG-20180301-WA0004.jpg"); break;
            case 62: message.channel.send("https://cdn.discordapp.com/attachments/394205840804151308/417459111186137089/gmagik.gif"); break;
            case 63: message.channel.send("a mi me gustaria algun dia ver un niño/a decirle a sus padres: soy furra y dibujo porno de mi y otras personas a y tengo un novio virtual de 54 años que se pone un disfraz de garfield ```-sercox 02/25/2018```"); break;
            case 64: message.channel.send("en estos días he rezado para que lluviera shreks pero la calor hizo que los fumara, hasta llame al rumpestenkiki a tener un trato para que los días sean lluvio pero el viejo barry enso me atrapó y dijo que si me gustaba el jazz, le dije que no pero me lleno de agujas en el an a unas horas después el pajaro loco se burló de mi al pasar el parque, le dije que soy virgen y se rió de Janeiro mas, así que me corrí por una escopeta para asesinarlo y me tope con ferbnanflow que también es callado y hizo un rap de vegeta 777 y me teletransporte al mundo de disney y terminé estando en el viejo oeste donde me tope por fin con shrek para que me haga e unos segundos después destruyó mi casa y lo convirtió en un pantano lleno de bolas de cangrejo y pejerreque voladores parlantes y me decía jelp y me asuste ```-eduardobarra 02/16/2018```"); break;
            case 65: message.channel.send("alamadrees el famoso ricardiño de las nieves cordero de la santisima trinidad perteneciente a la religion feminista de dioses pasteros ```-SrSander 02/06/2018```"); break;
            case 66: message.channel.send("https://www.youtube.com/watch?v=OaVAJ4jHZTc"); break;
            case 67: message.channel.send("https://cdn.discordapp.com/attachments/394207644723970049/408796235244503051/unknown.png"); break;
            case 68: message.channel.send("https://cdn.discordapp.com/attachments/394205840804151308/408380371642744843/magik.png"); break;
            case 69: message.channel.send("https://cdn.discordapp.com/attachments/398989021490970624/399025475785064468/20180105_214702.jpg"); break;
            case 70: message.channel.send("https://vignette.wikia.nocookie.net/polandball/images/9/93/Cursed-images-part-5_v2AQRfO.jpg/revision/latest?cb%5Cu003d20180504221747"); break;
            case 71: message.channel.send("https://cdn.discordapp.com/attachments/394211282947145728/444239425648590858/PicsArt_05-08-12.15.07.png"); break;
            case 72: message.channel.send("https://cdn.discordapp.com/attachments/394211262923276290/430527048860172290/unknown-2.png"); break;
            case 73: message.channel.send("https://cdn.discordapp.com/attachments/447489362276384769/466701792483213312/smile.png"); break;
            case 74: message.channel.send("https://youtu.be/nqtuOd_Lh2Y"); break;
            case 75: message.channel.send("https://c.slashgear.com/wp-content/uploads/2014/01/lg_webos_smart_tv_hands-on_sg_6-820x420.jpg"); break;
            case 76: message.channel.send("https://media.discordapp.net/attachments/361290434057732096/473817432365203464/DjUWBTDXgAAcUEa.png?width=577&height=638"); break;
            case 77: message.channel.send("https://media.discordapp.net/attachments/468940425143517194/471006384109125632/FB_IMG_1532367061180.jpg"); break;
            case 78: message.channel.send("https://cdn.discordapp.com/attachments/458037874017828866/464247105528135681/ifunny.png"); break;
            case 79: message.channel.send("veibi lah bida e um siklo :arrows_counterclockwise: wu                                                                                 i loh q no sirbe io nolo resiklo :wastebasket:                                                                                 azy q d mi bida muebet :punch: :door:                                                                                 q sy t lometo ez pa rekordar un :regional_indicator_t: :b:  :regional_indicator_t:  ie ```-mierdosita 07/26/2018```"); break;
            case 80: message.channel.send("https://cdn.discordapp.com/attachments/438168310928900097/439269884828844033/maxresdefault.png"); break;
            case 81: message.channel.send("he soñado con ese hombre... \n¡Quiero ese hombre! \n¡Ese hombre es mi sueño, la razón por la que vivo, la razón por la que fuí traido,la razón por la que respiro! \n¡Como desearia que el FAMOSORICARDO estuviera a mi lado como en estos momentos....! ```-Kanjii 07/05/2018```"); break;
            case 82: message.channel.send("https://cdn.discordapp.com/attachments/411706318685077515/455409168199712788/unknown.png"); break;
            case 83: message.channel.send("https://cdn.discordapp.com/attachments/411706318685077515/440680276138393601/el_ql.png"); break;
            case 84: message.channel.send("https://www.youtube.com/watch?v=nFWM8H0nNJc"); break;
            case 85: message.channel.send("https://cdn.discordapp.com/attachments/426917497988448256/436303467238391808/IMG_20180418_201359.jpg"); break;
            case 86: message.channel.send("https://cdn.discordapp.com/attachments/394255759539437568/461348253477109770/meme.png"); break;
            case 87: message.channel.send("https://cdn.discordapp.com/attachments/394255759539437568/461348612547411982/sharpen.png"); break;
            case 88: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/473921378282766337/2jK-Z57-_400x400.png"); break;
            case 89: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/472627179105288192/37e9dfb18517e8803da0e69a645245d4.png"); break;
            case 90: message.channel.send("https://i.redd.it/hqx7okmi64c11.gif"); break;
            case 91: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/469348096921567233/Dd__4F4V4AEPPBu.png"); break;
            case 92: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/469206290435145738/DiQ_OEdUYAAgAR5.jpg"); break;
            case 93: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/467519354867548178/36717303_434075423726408_2915417620066861056_n.png"); break;
            case 94: message.channel.send("https://media.discordapp.net/attachments/336934898126290945/466746277233819649/FB_IMG_1531349474084.jpg?width=358&height=637"); break;
            case 95: message.channel.send("https://cdn.discordapp.com/attachments/426920972772180009/464236622863400970/image-3.jpg"); break;
            case 96: message.channel.send("https://media.discordapp.net/attachments/361290434057732096/389114951257817088/20479559_1984029815203905_8911822415046625280_n.png"); break;
            case 97: message.channel.send("https://media.discordapp.net/attachments/357620482805334018/461745112154767370/30727159_740307209692151_1719898875923380986_n.jpg"); break;
            case 98: message.channel.send("https://media.discordapp.net/attachments/383042592553697287/460694607806726168/Df8uZUDUYAEawmP.png"); break;
            case 99: message.channel.send("https://cdn.discordapp.com/attachments/360843075968565248/389891160258248704/gmagik.gif"); break;
            case 100: message.channel.send("https://cdn.discordapp.com/attachments/415365025121697792/478268594074157063/unknown.png"); break;
        }
    }
    
//  if (cmd === `${prefix}breakingnews`) {
//      message.reply("confusion, la forma en la q sehace es la sig:```>breakingnews [headline] [ticker] [imageurl]```");
//      let imageurl = args.join(' ');
//      function eventWindowLoaded() {
//          canvasApp();
//      }
//
//      function drawImageProp(context, img, x, y, w, h, offsetX, offsetY) {
//
//          if (arguments.length === 2) {
//              x = y = 0;
//              w = 1280;
//              h = 720;
//          }
//
//          /// default offset is center
//          offsetX = offsetX ? offsetX : 0.5;
//          offsetY = offsetY ? offsetY : 0.5;
//
//          /// keep bounds [0.0, 1.0]
//          if (offsetX < 0) offsetX = 0;
//          if (offsetY < 0) offsetY = 0;
//          if (offsetX > 1) offsetX = 1;
//          if (offsetY > 1) offsetY = 1;
//
//          var iw = img.width,
//              ih = img.height,
//              r = Math.min(w / iw, h / ih),
//              nw = iw * r,   /// new prop. width
//              nh = ih * r,   /// new prop. height
//              cx, cy, cw, ch, ar = 1;
//
//          /// decide which gap to fill    
//          if (nw < w) ar = w / nw;
//          if (nh < h) ar = h / nh;
//          nw *= ar;
//          nh *= ar;
//
//          /// calc source rectangle
//          cw = iw / (nw / w);
//          ch = ih / (nh / h);
//
//          cx = (iw - cw) * offsetX;
//          cy = (ih - ch) * offsetY;
//
//          /// make sure source rectangle is valid
//          if (cx < 0) cx = 0;
//          if (cy < 0) cy = 0;
//          if (cw > iw) cw = iw;
//          if (ch > ih) ch = ih;
//
//          /// fill image in dest. rectangle
//          context.drawImage(img, cx, cy, cw, ch, x, y, w, h);
//      }
//
//      function canvasApp() {
//
//          var headline = "Something went viral online";
//          var ticker = "\"Is this really news?\" asks commenter  |  5 million retweets in 1 hour already";
//          var img = new Image();
//
//          var theCanvas = document.getElementById("canvasOne");
//          var context = theCanvas.getContext("2d");
//
//          var formElement = document.getElementById("textBox");
//          formElement.addEventListener("keyup", textBoxChanged, false);
//
//          var formElement2 = document.getElementById("tickerBox");
//          formElement2.addEventListener("keyup", textBox2Changed, false);
//
//          var imageLoader = document.getElementById('imageLoader');
//          imageLoader.addEventListener('change', handleImage, false);
//
//
//          var imageObj = new Image();
//          imageObj.src = 'overlay.png';
//
//
//          drawScreen();
//
//          function drawScreen() {
//
//              //Background
//              context.fillStyle = "#222222";
//              context.fillRect(0, 0, theCanvas.width, theCanvas.height);
//
//
//              //Image
//              if (img.src) {
//                  drawImageProp(context, img);
//              }
//
//              //Live
//              context.fillStyle = "rgba(194, 21, 15, 1.000)";
//              context.fillRect(80, 40, 104, 60);
//
//              context.font = "700 36px Signika";
//              context.fillStyle = "#FFFFFF";
//              context.fillText('LIVE', 96, 84);
//
//              //Box
//              context.fillStyle = "rgba(255,255,255,0.85)";
//              context.fillRect(80, 510, 1200, 110);
//
//              //Clock
//
//              context.fillStyle = "#000";
//              context.fillRect(80, 620, 100, 60);
//
//              today = new Date();
//              var m = today.getMinutes();
//              var h = today.getHours();
//
//              if (m < 10) {
//                  m = "0" + m
//              };
//
//              context.font = "700 28px Signika";
//              context.fillStyle = "#FFFFFF";
//              context.fillText((h + ":" + m), 96, 660);
//
//              //Breaking News Strap
//              // Create gradient
//              redgrd = context.createLinearGradient(0, 430, 0, 510);
//
//              // Add colors
//              redgrd.addColorStop(0.000, 'rgba(109, 36, 39, 1.000)');
//              redgrd.addColorStop(0.015, 'rgba(224, 54, 44, 1.000)');
//              redgrd.addColorStop(0.455, 'rgba(194, 21, 15, 1.000)');
//              redgrd.addColorStop(0.488, 'rgba(165, 10, 1, 1.000)');
//              redgrd.addColorStop(1.000, 'rgba(109, 36, 39, 1.000)');
//
//              context.fillStyle = redgrd;
//              context.fillRect(80, 430, 420, 80);
//
//              context.font = "700 48px Signika";
//              context.fillStyle = "#FFFFFF";
//              context.fillText('BREAKING NEWS', 100, 488);
//
//              //Text
//              context.font = "700 72px Signika";
//              context.fillStyle = "#000000";
//              context.fillText(message.toUpperCase(), 100, 590);
//
//              //Ticker
//              context.fillStyle = "#feeb1a";
//              context.fillRect(180, 620, 1100, 60);
//
//              context.font = "700 28px Signika";
//              context.fillStyle = "#000";
//              context.fillText(ticker.toUpperCase(), 200, 660);
//
//              //Logo
//              context.shadowColor = "rgba(0,0,0,0.7)";
//              context.shadowOffsetX = 0;
//              context.shadowOffsetY = 0;
//              context.shadowBlur = 6;
//              context.globalAlpha = 0.6;
//              //context.drawImage(imageObj, 560, 20);
//              context.font = "400 36px Signika";
//              context.fillStyle = "#fff";
//              context.fillText('breakyourownnews.com', 860, 80);
//              context.globalAlpha = 1;
//              context.shadowBlur = 0;
//          }
//          function handleImage(e) {
//              var reader = new FileReader();
//              reader.onload = function (event) {
//                  img.onload = function () {
//                      drawScreen();
//                  }
//                  img.src = event.target.result;
//              }
//              reader.readAsDataURL(e.target.files[0]);
//          }
//          if (cmd === `${prefix}breakingnews` && headline === (' ') && ticker === (' ') && imageurl === 'https://') {
//              eventWindowLoaded();
//              var converter = new HtmlToImageConverter
//              {
//                  Width = 1280,
//                      Height = 720
//              };
//              var pngBytes = converter.GenerateImage(headline + ticker + imageurl, drawScreen);
//              message.channel.SendFileAsync(new MemoryStream(pngBytes), "breakingnews.png");
//          }
//      }
//  }

    if (cmd === `${prefix}help`) {
        message.channel.send("ola mis __niños__ hoy lespuedo ayudarle acojer digodigo a usarme como tu qieras u.uXD O TOA VIOLARA \ncomandos:```>tm \n>invite \n>server \n>famosisimo \n>detectorql \n>paz \n>tumor (100 variaciones distintas omg) \n>gatogaymermaluma \n>say (decir algoXD) \n>purge (el destructor ricardo) \n>playing (cambia mi estado de juego omg)```");
    }
//ESPACIO:                                                                                
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
        if (cmd === `${prefix}352421` && status === 'servers') {
            message.delete();
            message.channel.send(`estoi actualmente por ${bot.guilds.size} servidores o`);
        }
    }
});

bot.login(process.env.token);
