const {EmbedBuilder} = require('discord.js')
const ss = require("../../configs/settings.json")
const conf = require('../../configs/config.json')

module.exports = {
    name: "unban",
    aliases: ["desbanir"],
    userPerms: ['BanMembers'],
    botPerms: ['BanMembers'],
    cooldown: 5000,

    async run (client, message, args) {
        let member = args[0]

        if (!args[0]) {
            let embed = new EmbedBuilder()
            .setTitle(ss.titulo)
            .setDescription(`Digite um ID de uma pessoa banida!`)
            .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
            .setColor(ss.color)
            return message.reply({ embeds: [embed] });
        }

        message.guild.bans.fetch().then(bans => {
            var encontrar = bans.find(m => m.user.id === member)

            if(!encontrar) {
                let embed = new EmbedBuilder()
                .setTitle(ss.titulo)
                .setDescription(`${message.author} Não encontrei o ID: \`${member}\` na lista de banidos!`)
                .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
                .setColor(ss.color)
                return message.reply({ embeds: [embed] });
            }

            message.guild.members.unban(member)

            let embed = new EmbedBuilder()
            .setTitle(ss.titulo)
            .setColor(ss.color)
            .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
            .addFields({ name: `Usuário desbanido:`, value: `Nick: \`${member}\``, inline: false})
            .addFields({ name: `Desbanido por:`, value: `Nick: \`${message.author.tag}\``})
            message.reply({ embeds: [embed]})
        })
    }
}