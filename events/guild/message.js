const queue2 = new Map();
const queue3 = new Map();
const queue = new Map();
const Discord = require(`discord.js`)
const cooldowns = new Map()

module.exports = async (bot, message) => {

    if (message.channel.type == 'dm') return

    if(message.author.bot) return
const prefix = '!'




    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (!message.guild.me.hasPermission("SEND_MESSAGES")) return

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();



    const command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))

    if (!command) return







    if (!cooldowns.has(command.config.name)) {
        cooldowns.set(command.config.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.config.name);
    const cooldown_amount = (command.config.cooldown) * 1000;

    if (time_stamps.has(message.author.id)) {
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if (current_time < expiration_time) {
            const time_left = (expiration_time - current_time) / 1000;

            function msToTime(ms) {
                days = Math.floor(ms / 86400000);
                daysms = ms % 86400000;
                hours = Math.floor(daysms / 3600000);
                hoursms = ms % 3600000;
                minutes = Math.floor(hoursms / 60000);
                minutesms = ms % 60000;
                sec = Math.floor(minutesms / 1000);
    
                let str = "";
                if (days) str = str + days + " days, ";
                if (hours) str = str + hours + " hours, ";
                if (minutes) str = str + minutes + " minutes, ";
                if (sec) str = str + sec + " seconds";
    
                return str;
            }

            const embed = new Discord.MessageEmbed()
                .setTitle(`please wait \`${time_left.toFixed(1)}\` more seconds before using this again`)
                .setColor('#ff0000')

            return message.channel.send(embed);
        }
    }

    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    let ops = {
        queue: queue,
        queue2: queue2,
        queue3: queue3,
    }
    let color = '#ff0000'
    
    try {
   

        if (command) command.run(bot, message, args, ops, color);


    

    } catch (err) {

        const embed2 = new Discord.MessageEmbed()
            .setTitle(`there was an error trying to execute that command`)
            .setDescription(`\n\`\`\`javascript\n${err.message}\n\`\`\``)
            .setColor(0x0189ff)

        message.channel.send(embed2);

        console.log(err);
    
    }

}