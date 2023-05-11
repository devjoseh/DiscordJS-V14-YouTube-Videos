const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ss = require('../../configs/settings.json')

module.exports = {
	name: 'say',
	description: "[MODERAÇÃO] Faça o bot enviar uma mensagem",
	type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'ManageMessages',
	cooldown: 5000,
    
    options: [
        {
            name: 'texto',
            description: 'Digite o texto da mensagem',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'canal',
            description: 'Informe um canal para a mensagem ser enviada',
            type: ApplicationCommandOptionType.Channel,
            required: false,
        }
    ],
	run: async (client, interaction) => {
        const mensagem = interaction.options.getString('texto')
        const canal = interaction.options.getChannel('canal') || interaction.channel

        try {
  
            if (mensagem.length > 1500) {
                throw new Error('Seu texto não pode ter mais de 1.500 Letras!')
            }
    
            try {
                interaction.reply({ content: 'Mensagem enviada com sucesso!', ephemeral: true });
                await canal.send(mensagem);
            } catch (error) {
                console.error(error);
                return interaction.reply(`Ocorreu um erro ao enviar a mensagem. \n\n\`\`\`${error}\`\`\``);
            }
              
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