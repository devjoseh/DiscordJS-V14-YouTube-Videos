const {EmbedBuilder} = require('discord.js')
const ss = require("../../configs/settings.json")

module.exports = {
    name: "unlock",
    aliases: ["destrancar", "abrir", "destrancarcanal"],
    userPerms: ['ManageChannels'],
    botPerms: ['ManageChannels'],
    cooldown: 5000,

    async run (client, message, args) {
        let canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel 

        message.delete()
        canal.permissionOverwrites.edit(message.guild.id, { SendMessages: true });

        let embed = new EmbedBuilder()
        .setTitle(ss.titulo)
        .setDescription(`Esse chat foi destrancado para todos os membros`)
        .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
        .setColor(ss.color)
        canal.send({ embeds: [embed]})
    }
}