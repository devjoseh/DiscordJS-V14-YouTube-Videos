const { EmbedBuilder } = require('discord.js');
const ss = require('../../configs/settings.json');

const MAX_SLOWMODE_DURATION = 21600;
const MIN_SLOWMODE_DURATION = 0;

module.exports = {
  name: 'setslowmode',
  aliases: ['slowmode', 'slow', 'channelslowmode', 'channelslowmodeset', 'ssm'],
  userPerms: ['ManageChannels'],
  botPerms: ['ManageChannels'],
  cooldown: 5000,

  run: async (client, message, args) => {
    const tempo = args[0];
    
    try {

        if (!tempo) {
            throw new Error('Digite o tempo do slowmode, em segundos!')
        }
  
        if (isNaN(tempo)) {
            throw new Error('você deve informar um número válido!')
        }

        if (tempo > MAX_SLOWMODE_DURATION) {
            throw new Error(`insira um número de 0 a ${MAX_SLOWMODE_DURATION} para setar o modo lento.`)
        }

        if (tempo < MIN_SLOWMODE_DURATION) {
            throw new Error(`insira um número de 0 a ${MAX_SLOWMODE_DURATION} para setar o modo lento.`)
        }

        message.channel.setRateLimitPerUser(tempo);
        const replyMessage = `Modo lento definido para \`${tempo}\` segundos!`;
        message.reply(replyMessage);
          
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