const translate = require('node-google-translate-skidz');

exports.run = async (bot, message, args) => {
  if (!args[0]) {
    let responsable = message.author.id;
    let idiomas = [{ "lang": "afar", "iso": "aa" }, { "lang": "abjasio", "iso": "ab" }, { "lang": "avéstico", "iso": "ae" }, 
                   { "lang": "afrikáans", "iso": "af" }, { "lang": "akano", "iso": "ak" }, { "lang": "amhárico", "iso": "am" }, { "lang": "aragonés", "iso": "an" }, 
                   { "lang": "árabe", "iso": "ar" }, { "lang": "asamés", "iso": "as" }, { "lang": "ávaro", "iso": "av" }, { "lang": "aymara", "iso": "ay" }, { "lang": "azerí", "iso": "az" }, 
                   { "lang": "baskir", "iso": "ba" }, { "lang": "bielorruso", "iso": "be" }, { "lang": "búlgaro", "iso": "bg" }, { "lang": "bhoyapurí", "iso": "bh" }, { "lang": "bislama", "iso": "bi" }, 
                   { "lang": "bambara", "iso": "bm" }, { "lang": "bengalí", "iso": "bn" }, { "lang": "tibetano", "iso": "bo" }, { "lang": "bretón", "iso": "br" }, { "lang": "bosnio", "iso": "bs" }, 
                   { "lang": "catalán", "iso": "ca" }, { "lang": "checheno", "iso": "ce" }, { "lang": "chamorro", "iso": "ch" }, { "lang": "corso", "iso": "co" }, { "lang": "cree", "iso": "cr" }, 
                   { "lang": "checo", "iso": "cs" }, { "lang": "eslavo", "iso": "cu" }, { "lang": "chuvasio", "iso": "cv" }, { "lang": "galés", "iso": "cy" }, { "lang": "danés", "iso": "da" }, 
                   { "lang": "alemán", "iso": "de" }, { "lang": "maldivo", "iso": "dv" }, { "lang": "dzongkha", "iso": "dz" }, { "lang": "ewé", "iso": "ee" }, { "lang": "griego", "iso": "el" }, 
                   { "lang": "inglés", "iso": "en" }, { "lang": "esperanto", "iso": "eo" }, { "lang": "español", "iso": "es" }, { "lang": "estonio", "iso": "et" }, { "lang": "euskera", "iso": "eu" },
                   { "lang": "persa", "iso": "fa" }, { "lang": "fula", "iso": "ff" }, { "lang": "finés", "iso": "fi" }, { "lang": "fiyiano", "iso": "fj" }, { "lang": "feroés", "iso": "fo" },
                   { "lang": "francés", "iso": "fr" }, { "lang": "frisón", "iso": "fy" }, { "lang": "irlandés", "iso": "ga" }, { "lang": "escocés", "iso": "gd" }, { "lang": "gallego", "iso": "gl" },
                   { "lang": "guaraní", "iso": "gn" }, { "lang": "guyaratí", "iso": "gu" }, { "lang": "manés", "iso": "gv" }, { "lang": "hausa", "iso": "ha" }, { "lang": "hebreo", "iso": "he" },
                   { "lang": "hindú", "iso": "hi" }, { "lang": "hiri motu", "iso": "ho" }, { "lang": "croata", "iso": "hr" }, { "lang": "haitiano", "iso": "ht" }, { "lang": "húngaro", "iso": "hu" },
                   { "lang": "armenio", "iso": "hy" }, { "lang": "herero", "iso": "hz" }, { "lang": "interlingua", "iso": "ia" }, { "lang": "indonesio", "iso": "id" }, { "lang": "occidental", "iso": "ie" },
                   { "lang": "igbo", "iso": "ig" }, { "lang": "yi", "iso": "ii" }, { "lang": "iñupiaq", "iso": "ik" }, { "lang": "ido", "iso": "io" }, { "lang": "islandés", "iso": "is" },
                   { "lang": "italiano", "iso": "it" }, { "lang": "inuit", "iso": "iu" }, { "lang": "japonés", "iso": "ja" }, { "lang": "javanés", "iso": "jv" }, { "lang": "georgiano", "iso": "ka" },
                   { "lang": "kongo", "iso": "kg" }, { "lang": "kikuyu", "iso": "ki" }, { "lang": "kuanyama", "iso": "kj" }, { "lang": "kazajo", "iso": "kk" }, { "lang": "groenlandés", "iso": "kl" },
                   { "lang": "camboyano", "iso": "km" }, { "lang": "canarés", "iso": "kn" }, { "lang": "coreano", "iso": "ko" }, { "lang": "kanuri", "iso": "kr" }, { "lang": "cachemiro", "iso": "ks" },
                   { "lang": "kurdo", "iso": "ku" }, { "lang": "komi", "iso": "kv" }, { "lang": "córnico", "iso": "kw" }, { "lang": "kirguís", "iso": "ky" }, { "lang": "latín", "iso": "la" },
                   { "lang": "luxemburgués", "iso": "lb" }, { "lang": "luganda", "iso": "lg" }, { "lang": "limburgués", "iso": "li" }, { "lang": "lingala", "iso": "ln" }, { "lang": "lao", "iso": "lo" }, 
                   { "lang": "lituano", "iso": "lt" }, { "lang": "chiluba", "iso": "lu" }, { "lang": "letón", "iso": "lv" }, { "lang": "malgache", "iso": "mg" }, { "lang": "marshalés", "iso": "mh" }, 
                   { "lang": "maorí", "iso": "mi" }, { "lang": "macedonio", "iso": "mk" }, { "lang": "malayalam", "iso": "ml" }, { "lang": "mongol", "iso": "mn" }, { "lang": "maratí", "iso": "mr" }, 
                   { "lang": "malayo", "iso": "ms" }, { "lang": "maltés", "iso": "mt" }, { "lang": "birmano", "iso": "my" }, { "lang": "nauruano", "iso": "na" }, { "lang": "noruego bokmål", "iso": "nb" }, 
                   { "lang": "ndebele del norte", "iso": "nd" }, { "lang": "nepalí", "iso": "ne" }, { "lang": "ndonga", "iso": "ng" }, { "lang": "holandés", "iso": "nl" }, { "lang": "nynorsk", "iso": "nn" }, 
                   { "lang": "noruego", "iso": "no" }, { "lang": "ndebele del sur", "iso": "nr" }, { "lang": "navajo", "iso": "nv" }, { "lang": "chichewa", "iso": "ny" }, { "lang": "occitano", "iso": "oc" }, 
                   { "lang": "ojibwa", "iso": "oj" }, { "lang": "oromo", "iso": "om" }, { "lang": "oriya", "iso": "or" }, { "lang": "osético", "iso": "os" }, { "lang": "panyabí", "iso": "pa" }, 
                   { "lang": "pali", "iso": "pi" }, { "lang": "polaco", "iso": "pl" }, { "lang": "pastú", "iso": "ps" }, { "lang": "portugués", "iso": "pt" }, { "lang": "quechua", "iso": "qu" }, 
                   { "lang": "romanche", "iso": "rm" }, { "lang": "kirundi", "iso": "rn" }, { "lang": "rumano", "iso": "ro" }, { "lang": "ruso", "iso": "ru" }, { "lang": "ruandés", "iso": "rw" }, 
                   { "lang": "sánscrito", "iso": "sa" }, { "lang": "sardo", "iso": "sc" }, { "lang": "sindhi", "iso": "sd" }, { "lang": "sami", "iso": "se" }, { "lang": "sango", "iso": "sg" }, 
                   { "lang": "cingalés", "iso": "si" }, { "lang": "eslovaco", "iso": "sk" }, { "lang": "esloveno", "iso": "sl" }, { "lang": "samoano", "iso": "sm" }, { "lang": "shona", "iso": "sn" }, 
                   { "lang": "somalí", "iso": "so" }, { "lang": "albanés", "iso": "sq" }, { "lang": "serbio", "iso": "sr" }, { "lang": "suazi", "iso": "ss" }, { "lang": "sesotho", "iso": "st" }, 
                   { "lang": "sundanés", "iso": "su" }, { "lang": "sueco", "iso": "sv" }, { "lang": "suajili", "iso": "sw" }, { "lang": "tamil", "iso": "ta" }, { "lang": "télugu", "iso": "te" }, 
                   { "lang": "tayiko", "iso": "tg" }, { "lang": "tailandés", "iso": "th" }, { "lang": "tigriña", "iso": "ti" }, { "lang": "turcomano", "iso": "tk" }, { "lang": "tagalo", "iso": "tl" }, 
                   { "lang": "setsuana", "iso": "tn" }, { "lang": "tongano", "iso": "to" }, { "lang": "turco", "iso": "tr" }, { "lang": "tsonga", "iso": "ts" }, { "lang": "tártaro", "iso": "tt" }, 
                   { "lang": "twi", "iso": "tw" }, { "lang": "tahitiano", "iso": "ty" }, { "lang": "uigur", "iso": "ug" }, { "lang": "ucraniano", "iso": "uk" }, { "lang": "urdu", "iso": "ur" }, 
                   { "lang": "uzbeko", "iso": "uz" }, { "lang": "venda", "iso": "ve" }, { "lang": "vietnamita", "iso": "vi" }, { "lang": "volapük", "iso": "vo" }, { "lang": "valón", "iso": "wa" }, 
                   { "lang": "wolof", "iso": "wo" }, { "lang": "xhosa", "iso": "xh" }, { "lang": "yídish", "iso": "yi" }, { "lang": "yoruba", "iso": "yo" }, { "lang": "chuang", "iso": "za" }, 
                   { "lang": "chino", "iso": "zh" }, { "lang": "zulú", "iso": "zu" }];
    let nivel = 22;
    let minim = 0;
    let veces = 0;
    let limite = 8;
    let indx;
    let filtro;
    let collector;
    let msgid;
    var timer;
    let resp = '';
    let fin = '';
    message.channel.startTyping();
    function Idiomas() {
      indx = 1;
      let lan = idiomas.slice(minim, nivel);
      resp += '```>translate [idioma original] [idioma para traduccir] [Texto ._.]```';
      resp += `\nlista de idiomas (a-z): \n`;
      for(var i in lan) {
        resp += `-**${lan[i].iso}** (${lan[i].lang})\n`;
      }
      resp += `\neliga un numero para ver losdemas j: **${indx}-${limite}**`;
      console.log(resp);
      if (veces == 0) { message.reply(resp).then(msg => msgid = msg).then(setTimeout(()=>{ if (veces == 0) { fin = `se termino losresultados,,`; message.channel.send(fin).then(msg => msg.delete(4000)); } },16000)); }
      message.channel.stopTyping();
      filtro = m => !isNaN(m.content) && m.author.id == responsable && m.content < limite+1 && m.content > 0;
      collector = message.channel.createMessageCollector(filtro, { time: 15000 });
      collector.lan = lan;
      collector.on('collect', m => {
        clearTimeout(timer);
        if (indx > 0 || indx < (limite+1)) {
	  indx = m;
	  if (m == 1) { minim = 0; nivel = 22; } if (m == 2) { minim = 22; nivel = 44; } if (m == 3) { minim = 44; nivel = 66; } if (m == 4) { minim = 66; nivel = 88; }
          if (m == 5) { minim = 88; nivel = 110; } if (m == 6) { minim = 110; nivel = 132; } if (m == 7) { minim = 132; nivel = 154; } if (m == 8) { minim = 154; nivel = 176; }
	  veces = veces+1;
	  Idiomas();
	  setTimeout(()=>{ msgid.edit(resp); m.delete(); },1000);
	  timer = setTimeout(()=>{
            collector.on('end', m => {
		setTimeout(()=>{ fin = `se termino losresultados,,`; message.channel.send(fin).then(msg => msg.delete(4000)); },2000);
	    });
	  },15000);
	}
      });
    }
    Idiomas();
    message.channel.stopTyping();
  }
}
