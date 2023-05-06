const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ss = require('../../configs/settings.json')

module.exports = {
	name: 'unban',
	description: "[MODERAÇÃO] Tire o banimento de alguém do servidor",
	type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'BanMembers',
	cooldown: 5000,
    
    options: [
        {
            name: 'id',
            description: 'digite o ID da pessoa a ser desbanida',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
	run: async (client, interaction) => {
        const member = interaction.options.getString('id')

        interaction.guild.bans.fetch().then(bans => {
            var encontrar = bans.find(m => m.user.id === member)

            if(isNaN(member)) {
                let embed = new EmbedBuilder()
                .setTitle(ss.titulo)
                .setDescription(`${interaction.user} Informe um id numérico`)
                .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
                .setColor(ss.color)
                return interaction.reply({ embeds: [embed] });
            }

            if(!encontrar) {
                let embed = new EmbedBuilder()
                .setTitle(ss.titulo)
                .setDescription(`${interaction.user} Não encontrei o ID: \`${member}\` na lista de banidos!`)
                .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
                .setColor(ss.color)
                return interaction.reply({ embeds: [embed] });
            }

            interaction.guild.members.unban(member)

            let embed = new EmbedBuilder()
            .setTitle(ss.titulo)
            .setColor(ss.color)
            .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
            .addFields({ name: `Usuário desbanido:`, value: `Nick: \`${member}\``, inline: false})
            .addFields({ name: `Desbanido por:`, value: `Nick: \`${interaction.user.tag}\``})
            interaction.reply({ embeds: [embed]})
        })
	}
};