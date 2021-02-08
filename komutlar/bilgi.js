const Discord = require('discord.js');

exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('#3aa5e7')
.setTitle(`FlexinRP | Bilgilendirme`)
.setDescription('**Sunucumuzun 12.02.2021 (Cuma) tarihinde aktif olacaktır. Hepinizi bekliyoruz**')
.addField('Sunucuya nasıl girebilirim?', '-Sunucuya giriş yapmak için Başvuru Formumuzu doldurman gerekiyor, başvurun eğer onaylanırsa, Mülakata Odasına giriş yapıp Yetkililerimizi beklemen yeterli olacaktır.')
.addField('Sunucuda yaş sınırı olacak mı?', '-Evet olacak, minimum 17 yaş alacağız.')
.addField('Sunucuda saat sınırı olacak mı?', '-Evet olacak, 150 saat aşağısını almayacağız.')
.addField('Sunucunun konsepti nedir?', '- Global konsept olacak.')
.addField('Başvuru form linki?', '- https://docs.google.com/forms/d/18_ao_aY17u4yTzmFuzpOIkOcaXEpnQESP8rI5EGWCLM/viewform')
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
  name: 'bilgi',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};