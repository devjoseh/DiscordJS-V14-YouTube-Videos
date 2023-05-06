const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ss = require('../../configs/settings.json')
const conf = require('../../configs/config.json')

module.exports = {
	name: 'ban',
	description: "[MODERAÇÃO] Banir um membro do servidor",
	type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'BanMembers',
	cooldown: 5000,
    
    options: [
        {
            name: 'usuario',
            description: 'Informe quem será banido',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'motivo',
            description: 'Informe qual será o motivo do banimento',
            type: ApplicationCommandOptionType.String,
            required: true,  
        },
    ],
	run: async (client, interaction) => {
        const member = interaction.options.getMember('usuario')
        const motivo = interaction.options.getString('motivo')

        try {
            if(!member) {
                throw new Error('Não foi possivel encotrar essa pessoa no servidor!')
            }
    
            if (member.id == interaction.user.id) {
                throw new Error('Você não pode banir você mesmo!')
            }
    
            if (member.id == conf.client_id) {
                throw new Error('Você não pode me banir do servidor!')
            }
    
            if (motivo.length < 3) {
                throw new Error(`Você deve informar um motivo que contenha mais que 3 letras!`)
            }
    
            let embed = new EmbedBuilder()
            .setTitle(ss.titulo)
            .setColor(ss.color)
            .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
            .addFields({ name: `Usuário banido:`, value: `Nick: ${member}`, inline: false})
            .addFields({ name: `Usuário banido:`, value: `ID: \`${member.id}\``, inline: false})
            .addFields({ name: `Banido por:`, value: `Nick: \`${interaction.user.tag}\``})
            .addFields({ name: `Motivo:`, value: `**${motivo}**`})
            interaction.reply({ embeds: [embed]})
    
            interaction.guild.members.ban(member)

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