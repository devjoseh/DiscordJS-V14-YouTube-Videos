const { EmbedBuilder } = require('discord.js')
const ss = require('../../configs/settings.json')

module.exports = {
    name: "nickname",
    aliases: ["nick", "changenick", "mudarnick", "alterarnick"],
    userPerms: ['ManageNicknames'],
    botPerms: ['ManageNicknames'],
    cooldown: 5000,

    run: async (client, message, args) => {

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let novonick = args.slice(1).join(" ");

    try {
      
      if(!member) {
        throw new Error('Informe quem terá o nickname alterado!')
      }
  
      if (member.id == message.author.id) {
        throw new Error('Você não pode alterar seu próprio nickname!')
      }

      if (!novonick) {
        throw new Error(`Informe para qual nick você deseja alterar o nome do usuário!`)
      }

      if (novonick.length > 31) {
        throw new Error(`O Nick do usuário não pode ter mais de 32 Letras!`)
      }

      if (novonick.length < 3) {
        throw new Error(`O Nick do usuário deve ter pelo menos 3 Letras!`)
      }

      message.reply(`O Nick de **${member}** Foi Alterado para **${novonick}**`)
      member.setNickname(novonick)
      .catch(error => {
          return message.reply(`Não foi possivel alterar o nick deste usuário, erro: \n\n \`\`\`${error}\`\`\``)
      })
          
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