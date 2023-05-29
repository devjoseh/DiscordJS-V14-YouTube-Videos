const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ss = require('../../configs/settings.json')

const MAX_MESSAGES = 100
const MIN_MESSAGES = 1

module.exports = {
	name: 'clear',
	description: "[MODERAÇÃO] Limpa o chat",
	type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'ManageMessages',
	cooldown: 5000,
    
    options: [
        {
            name: 'quantia',
            description: 'Quantidade de mensagens',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
    ],
	run: async (client, interaction) => {
        const quantia = interaction.options.getNumber('quantia')

        try {
            if (quantia > MAX_MESSAGES) {
                throw new Error(`Eu só consigo limpar de ${MIN_MESSAGES} até ${MAX_MESSAGES} mensagens passadas!`)
            }
        
            if (quantia < MIN_MESSAGES) {
                throw new Error(`Eu só consigo limpar de ${MIN_MESSAGES} até ${MAX_MESSAGES} mensagens passadas!`)
            }

            await interaction.channel.messages.fetch({ limit: quantia }).then(messages => {
                interaction.channel.bulkDelete(messages, true)
                interaction.channel.send(`Chat limpo por ${interaction.user}`)
                interaction.reply({ content: 'Você limpou o chat!', ephemeral: true });
            }).catch(error => {
                interaction.channel.send(`Não foi possível apagar algumas mensagens pois elas foram enviadas a mais de 14 Dias! (2 Semanas)`)
            })
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