const Discord = require('discord.js');
const moment = require('moment');
const data = require('quick.db');
const ayarlar = require('/app/ayarlar.json');

moment.locale('tr')

exports.run = (client, message, args) => {

 let yetkili = ayarlar.yetkili
 let mulakat = ayarlar.mulakat
 let onay = client.channels.get(ayarlar.onay_channel)
 let log = client.channels.get(ayarlar.log_channel)

 let üye = message.mentions.members.first() || message.guild.members.get(args[0])

let yetkin_yok = new Discord.RichEmbed()
.setTitle('Yeterli Yetkin Bulunmuyor.')
.setDescription(`Bu komutu kullanabilmek için <@&${yetkili}> rolüne sahip olmanız gerekiyor.`)
.setColor('RED')
.setFooter(message.guild.name)
.setTimestamp()

let üye_belirtmedin = new Discord.RichEmbed()
.setTitle('Üye Belirtmeyi Unuttun.')
.setDescription(`Onaylacacağın kişiyi belirtmeyi unuttunuz.`)
.setColor('RED')
.setFooter(message.guild.name)
.setTimestamp()

if(!message.member.roles.has(yetkili)) return message.channel.send(yetkin_yok)

if(!üye) return message.channel.send(üye_belirtmedin)


data.add(`${message.author.id}.kayıt_sayısı_erkek`, 1)
data.add(`${message.author.id}.kayıt_sayısı`, 1)
let kayıt_sayısı = data.get(`${message.author.id}.kayıt_sayısı`)

let mentionedUser = message.mentions.users.first() || message.author;

message.channel.send(
new Discord.RichEmbed()
.setThumbnail(mentionedUser.displayAvatarURL)
.setTitle('<a:okee:803708104805843001> İşte Bu Kadar!')
.setDescription(`${üye} adlı kullanıcıyı onayladın.`)
.setColor('GREEN')
.setTimestamp())
  
üye.addRole(mulakat)

onay.send(
new Discord.RichEmbed()
.setTitle('Bir Kullanıcı Onaylandı Edildi!')
.setDescription(`${üye} Adlı Kişinin Başvurusu Onaylandı. ✅`)
.setColor('GREEN')
.setTimestamp()
  )
};
 
exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["onay",],
permLevel: 0
};
 
exports.help = {
name: 'onay'
};
