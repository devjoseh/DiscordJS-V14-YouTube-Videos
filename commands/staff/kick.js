const {EmbedBuilder} = require('discord.js')
const ss = require("../../configs/settings.json")
const conf = require('../../configs/config.json')

module.exports = {
    name: "kick",
    aliases: ["expulsar"],
    userPerms: ['KickMembers'],
    botPerms: ['KickMembers'],
    cooldown: 5000,

    async run(client, message, args) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let motivo = args.slice(1).join(" ")

        try {
            if (!args[0]) {
              throw new Error('Você deve informar uma pessoa para ser punida')
            }
        
            if(!member) {
              throw new Error('Não foi possivel encotrar essa pessoa no servidor!')
            }

            if (member.id == message.author.id) {
              throw new Error('Você não pode expulsar a si mesmo')
            }
      
            if (member.id == conf.client_id) {
              throw new Error(`Você não pode me expulsar do servidor!`)
            }
      
            if (motivo.length < 3) {
              throw new Error(`Você deve informar um motivo que contenha mais que 3 letras!`)
            }

            if (member.roles.highest.comparePositionTo(message.member.roles.highest) >= 0) {
                throw new Error(`Não é possível expulsar ${member} pois essa pessoa possui um cargo igual ou maior que o seu.`)
            }
       
            const embed = new EmbedBuilder()
            .setTitle(ss.titulo)
            .setColor(ss.color)
            .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
            .addFields({ name: `Usuário expulso:`, value: `Nick: \`${member.user.tag}\``, inline: false})
            .addFields({ name: `Usuário expulso:`, value: `ID: \`${member.id}\``, inline: false})
            .addFields({ name: `Expulso por:`, value: `Nick: \`${message.author.tag}\``})
            .addFields({ name: `Motivo:`, value: `**${motivo}**`})
            message.reply({ embeds: [embed]})
    
            member.kick(motivo)
              
          } catch (error) {
            const embedError = new EmbedBuilder()
              .setTitle(ss.titulo)
              .setDescription(`${message.author} ${error.message}`)
              .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
              .setColor(ss.color)
            return message.reply({ embeds: [embedError] });
          }
    }
}