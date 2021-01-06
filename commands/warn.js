const Discord = require('discord.js');

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('You can\'t use that! because you must have \*\*MANAGE_MESSAGES\*\* Permission');

    var user = msg.mentions.users.first();
    if(!user) return msg.reply('You didn\'t mention anyone!');

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(!member) return msg.reply('They aren\'t in the server!');

    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('You must to give a reason!');
     //لااازم يكون في روم باسم (warns-log)  
    var channel = msg.guild.channels.cache.find(c => c.name === 'warns-log');
    if (!channel) return msg.reply('you must make a channel with name (warns-log)');

    var log = new Discord.MessageEmbed()
    .setTitle('User Warned')
    .addField('User:', user, true)
    .addField('By:', msg.author, true)
    .addField('Reason:', reason)
    channel.send(log);

    var embed = new Discord.MessageEmbed()
    .setTitle(' :warning: You were warned!')
    .setDescription(reason);
    

    try {
        user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    msg.channel.send(`**${user}** has been warned by **${msg.author}**!`);
}