const Discord = require('discord.js');

exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('#3aa5e7')
.setTitle('**Sunucumuz Aktif Herkes Giriş Yapabilir İyi Roller Dileriz**')
.addField('Sunucu İP:', '- 0.0.0.0:1934.')
.addField('TeamSpeak 3 İP:', '- FlexinRP')
.setImage('https://cdn.discordapp.com/attachments/803730025740107786/805023718836273192/banner.png')
.setFooter('© 2021 Flexin Roleplay',)
message.channel.send(embed)

};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [], 
  permLevel: 0 
};

exports.help = {
  name: '',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};