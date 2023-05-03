const { EmbedBuilder } = require('discord.js')
const ss = require('../../configs/settings.json')

module.exports = {
    name: "ping",
    aliases: ['ms', "latencia"],
    cooldown: 5000,

    run: async (client, message, args) => {
        let embed = new EmbedBuilder()
        .setTitle(ss.titulo)
        .setColor(ss.color)
        .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
        .setDescription(`<a:ping:771053015892754452> **Aguarde...**`)
        message.reply({ embeds: [embed]}).then(msg => {
            setTimeout(() => {
                let embed = new EmbedBuilder()
                .setTitle(ss.titulo)
                .setColor(ss.color)
                .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
                .setDescription(`⚡ A Latência do BOT é de: \`${msg.createdTimestamp - message.createdTimestamp}ms\``)
                msg.edit({ embeds: [embed]})
            }, 3000);
        })
    }
}