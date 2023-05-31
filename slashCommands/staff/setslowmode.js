const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ss = require('../../configs/settings.json')

const MAX_SLOWMODE_DURATION = 21600;
const MIN_SLOWMODE_DURATION = 0;

module.exports = {
	name: 'setslowmode',
	description: "[MODERAÇÃO] Altere o tempo mínimo para enviar uma mensagem em um canal",
	type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'ManageChannels',
	cooldown: 5000,
    
    options: [
        {
            name: 'tempo',
            description: 'Digite o tempo que será setado no canal, em segundos',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: 'canal',
            description: 'Digite um canal para setar o slowmode',
            type: ApplicationCommandOptionType.Channel,
            required: false,
        }
    ],
	run: async (client, interaction) => {
        const tempo = interaction.options.getNumber('tempo')
        const canal = interaction.options.getChannel('canal') || interaction.channel

        try {

            if (tempo > MAX_SLOWMODE_DURATION) {
                throw new Error(`insira um número de 0 a ${MAX_SLOWMODE_DURATION} para setar o modo lento.`)
            }
    
            if (tempo < MIN_SLOWMODE_DURATION) {
                throw new Error(`insira um número de 0 a ${MAX_SLOWMODE_DURATION} para setar o modo lento.`)
            }
    
            canal.setRateLimitPerUser(tempo);
            const replyMessage = `Modo lento definido para \`${tempo}\` segundos!`;
            interaction.reply(replyMessage);
              
        } catch (error) {
            const embedError = new EmbedBuilder()
            .setTitle(ss.titulo)
            .setDescription(`${interaction.user} ${error.message}`)
            .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
            .setColor(ss.color)
            return interaction.reply({ embeds: [embedError] });
        }
	}
};