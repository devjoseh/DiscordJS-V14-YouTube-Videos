const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ss = require('../../configs/settings.json')

module.exports = {
	name: 'nickname',
	description: "[MODERAÇÃO] Altere o nick de alguém do servidor",
	type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'ManageNicknames',
	cooldown: 5000,
    
    options: [
        {
            name: 'usuario',
            description: 'Informe quem terá o nick alterado',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'nick',
            description: 'Informe qual será o novo nick',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
	run: async (client, interaction) => {
        const usuario = interaction.options.getMember('usuario')
        const member = await interaction.guild.members.fetch(usuario.id)
        const novonick = interaction.options.getString('nick')
        
        try {
  
            if (member.id == interaction.user.id) {
              throw new Error('Você não pode alterar seu próprio nickname!')
            }
      
            if (novonick.length > 31) {
              throw new Error(`O Nick do usuário não pode ter mais de 32 Letras!`)
            }
    
            if (novonick.length < 3) {
                throw new Error(`O Nick do usuário deve ter pelo menos 3 Letras!`)
            }
    
            interaction.reply(`O Nick de **${member}** Foi Alterado para **${novonick}**`)

            member.setNickname(novonick)
            .catch(error => {
                return interaction.reply(`Não foi possivel alterar o nick deste usuário, erro: \n\n \`\`\`${error}\`\`\``)
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