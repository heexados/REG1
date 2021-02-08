const Discord = require('discord.js');
const moment = require('moment');
const data = require('quick.db');
const ayarlar = require('/app/ayarlar.json');

moment.locale('tr')

exports.run = (client, message, args) => {

 let yetkili = ayarlar.yetkili
 let whitelist = ayarlar.whitelist
 let flexin = ayarlar.flexin
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
.setDescription(`Kayıt edeceğim kişiyi belirtmeyi unuttunuz.`)
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
.setDescription(`${üye} adlı kullanıcı kayıt edildi.`)
.setColor('GREEN')
.setTimestamp())
  
üye.addRole(flexin)

log.send(
new Discord.RichEmbed()
.setTitle('Bir Kullanıcı Kayıt Edildi!')
.setDescription(`Bir kullanıcı <@&${whitelist}> olarak kayıt edildi. Kayıt eden yetkili toplam **${kayıt_sayısı}** kişiyi kayıt etmiş.`)
.addField('» Kayıt Eden Yetkili:', `\`Kullanıcı İsmi   :\` _${message.author.tag}_\n\`Kimlik Numarası  :\` _${message.author.id}_`)
.addField('» Kayıt Edilen Üye:', `\`Kullanıcı İsmi   :\` _${üye.user.tag}_\n\`Kimlik Numarası  :\` _${üye.id}_`)
.addField('» Kayıt Tarihi:', `\`${moment().format('Do MMMM YYYY - HH:mm:ss')}\``)
.setColor('GREEN')
.setFooter(message.guild.name)
.setTimestamp()
  )
};
 
exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["wh",],
permLevel: 0
};
 
exports.help = {
name: 'wh'
};
