const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('te voy a violarATM');
});

client.on('message', message => {
    if (message.content === '>help') {
      message.reply('codigos para violara todomio mis mijitos:
      >tula
      >famoso
      >help
      esoson todos SOI MUY XD jaja');
    }
});

client.on('message', message => {
    if (message.content === '>tula') {
      message.reply('comes jajaj');
    }
});

client.on('message', message => {
    if (message.content === '>famoso') {
      message.reply('ricardo :famosoricardo:');
    }
});

client.login(process.env.BOT_TOKEN);
