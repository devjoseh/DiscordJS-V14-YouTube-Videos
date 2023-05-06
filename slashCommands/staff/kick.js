const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ss = require('../../configs/settings.json')
const conf = require('../../configs/config.json')

module.exports = {
	name: 'kick',
	description: "[MODERAÇÃO] Expulse alguém do servidor",
	type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'KickMembers',
	cooldown: 5000,
    
    options: [
        {
            name: 'usuario',
            description: 'Informe quem será a pessoa a ser expulsa',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'motivo',
            description: 'Digite qual será o motivo da punição',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
	run: async (client, interaction) => {
        const member = interaction.options.getMember('usuario')
        const motivo = interaction.options.getString('motivo')

        try {
            if (member.id == interaction.user.id) {
              throw new Error('Você não pode expulsar a si mesmo')
            }
      
            if (member.id == conf.client_id) {
              throw new Error(`Você não pode me expulsar do servidor!`)
            }
      
            if (motivo.length < 3) {
              throw new Error(`Você deve informar um motivo que contenha mais que 3 letras!`)
            }
       
            const embed = new EmbedBuilder()
            .setTitle(ss.titulo)
            .setColor(ss.color)
            .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
            .addFields({ name: `Usuário expulso:`, value: `Nick: ${member}`, inline: false})
            .addFields({ name: `Usuário expulso:`, value: `ID: \`${member.id}\``, inline: false})
            .addFields({ name: `Expulso por:`, value: `Nick: \`${interaction.user.tag}\``})
            .addFields({ name: `Motivo:`, value: `**${motivo}**`})
            interaction.reply({ embeds: [embed]})
    
            member.kick(motivo)
              
          } catch (error) {
            const embedError = new EmbedBuilder()
              .setTitle(ss.titulo)
              .setDescription(`${interaction.user} ${error.message}`)
              .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
              .setColor(ss.color)
            return interaction.reply({ embeds: [embedError] });
          }
	}
}