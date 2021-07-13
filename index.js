const { Client, Intents, Collection } = require('discord.js');
const Discord = require('discord.js')
const myIntents = new Intents();
myIntents.add('GUILD_PRESENCES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILDS');
const db = require('quick.db')
const bot = new Client({ ws: { intents: myIntents } });
const fetch = require('node-fetch')
const ultrax = require('ultrax')
ultrax.inviteLogger(bot) 

const PREFIX = '!'
const fs = require("fs");
bot.commands = new Collection();
bot.aliases = new Collection();

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handler/${x}`)(bot));

bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

bot.on('guildMemberAdd', async member =>{
    const r = member.guild.roles.cache.find(role => role.name === "WHITELISTED CIVILLIAN");
    if(r) console.log('role is good')

    let backgrounds = db.fetch(`background_${member.guild.id}`)
    if(backgrounds == null) {
        background = 'https://cdn.discordapp.com/attachments/819284150791176232/825290048659914782/abstract-dotted-banner-background_1035-18160.png'
    } else {
        background = backgrounds
    }
    const avatar = member.user.displayAvatarURL({dynamic: false})
    const title = member.user.username
    const Member12 = member.guild.memberCount
    const sub = `Member ${Member12}`
    const color = 'ff0000'
    const res = await fetch(`https://frenchnoodles.xyz/api/endpoints/welcomebanner?background=${background}&avatar=${avatar}&title=${title}&subtitle=${sub}&textcolor=${color}`, {
        headers: {
            'APIKEY': 'f8xftlruivhjdRn85zYJoSxBrDcDj2Pxu0Loa8'
        }
    })

    const channel = member.guild.channels.cache.get('855149282779856907');
    let Image = await res.buffer()
    const WImage = new Discord.MessageAttachment(Image)

    channel.send(`Hey ${member}, welcome to **RGV RP**!`, WImage)
//member.roles.add(r)
})

bot.login("ODY0MzQ3MDM2NDQxNjQxMDAw.YO0H6A.32zTtieZgUdYwzv1QVQSMV1yLzU");

