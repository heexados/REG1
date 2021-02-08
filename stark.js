  //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Modüller Ve Benzeri ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
const Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const kanal = ayarlar.register_chat;
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const prefix = ayarlar.prefix;
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Modüller Ve Benzeri ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\



//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Değişken - 0 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
let sunucu_id = ayarlar.sunucu_id
let whitelist = ayarlar.whitelist

let register_chat = client.channels.get(ayarlar.register_chat)
let log_channel = client.channels.get(ayarlar.log_channel)

let yetkili = ayarlar.yetkili
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Değişken - 0 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Hoşgeldin Mesajı/Fake Hesap Koruması - 2 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\


//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Hoşgeldin Mesajı/Fake Hesap Koruması - 2 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Command ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Command ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\



//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Perm ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.owner) permlvl = 4;
  
    return permlvl;
};
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Perm ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\



//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Other ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Other ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

client.on("ready", () => {
  client.channels.get("807705204107247666").join();
})