const { EmbedBuilder } = require('discord.js')
const ss = require('../../configs/settings.json')

// Valores fixos
const MAX_MESSAGES = 100
const MIN_MESSAGES = 1

module.exports = {
  name: "clear",
  aliases: ["clean", "limpar"],
  userPerms: ['ManageMessages'],
  botPerms: ['ManageMessages'],
  cooldown: 5000,

  async run(client, message, args) {
    const mensagens = args.join(" ");

    try {
      const numMensagens = parseInt(mensagens)

      if (!mensagens) {
        throw new Error('Informe a quantia de mensagens a serem deletadas!')
      }

      if (isNaN(numMensagens)) {
        throw new Error('Você deve informar um número válido!')
      }

      if (numMensagens > MAX_MESSAGES) {
        throw new Error(`Eu só consigo limpar de ${MIN_MESSAGES} até ${MAX_MESSAGES} mensagens passadas!`)
      }

      if (numMensagens < MIN_MESSAGES) {
        throw new Error(`Eu só consigo limpar de ${MIN_MESSAGES} até ${MAX_MESSAGES} mensagens passadas!`)
      }

      await message.channel.messages.fetch({ limit: numMensagens })
        .then(messages => {
          message.channel.bulkDelete(messages, true)
          message.channel.send(`Chat limpo por ${message.author}!`).then(m => {
            setTimeout(() => {
              m.delete()
            }, 5000)
          })
        })
        .catch(error => {
          message.channel.send(`Não foi possível apagar algumas mensagens pois elas foram enviadas a mais de 14 Dias! (2 Semanas)`)
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