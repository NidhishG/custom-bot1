module.exports = async bot => {
    
    console.log(`${bot.user.username} is available now with the id of ${bot.user.id}!`)
    bot.user.setActivity(`Junior`, {type: "LISTENING"})
    
};