const Discord = require("discord.js");
const db = require('quick.db');

const embed = new Discord.MessageEmbed()
    .setTitle('**invalid usage**')
    .setColor(0x0189ff)
    .setDescription(`\`\`\`welcome <channel> <message>\`\`\``)

const embed3 = new Discord.MessageEmbed()
    .setTitle('you are missing the `BAN_MEMBERS` permission')
    .setColor(0x0189ff)

module.exports = {
    config:{
    name: 'welcome',
    aliases: ['setwelcomechannel', 'setwelcome'],
    description: "setwelcome <channel> <message>",
    },
   async run(bot, message, args) {
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send(embed3)
        const channel = message.mentions.channels.first();
        const msg = args.slice(1).join(' ');

        if (!args[0]) return message.channel.send(embed)

        if (!args[1]) return message.channel.send(embed)

        if (channel) {
            db.set(`welcome_${message.guild.id}`, channel.id)
            db.set(`welcomemsg_${message.guild.id}`, msg)

            const embed2 = new Discord.MessageEmbed()
                .setDescription(`**CHANNEL:** <#${channel.id}>\n**MESSAGE:** @member, ${msg}`)
                .setFooter(`Channel set by: ${message.author.username}`)
                .setTimestamp()
                .setColor(0x0189ff)

            message.channel.send(embed2)
        } else if (args[0] === 'off') {

            db.delete(`welcome_${message.guild.id}`)
            db.delete(`welcomemsg_${message.guild.id}`)

            message.reply(`welcome messages are \`off\` for this guild 👍`)
        }
    }
}
