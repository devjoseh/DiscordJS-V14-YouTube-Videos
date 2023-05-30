const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ss = require('../../configs/settings.json')

module.exports = {
	name: 'unlock',
	description: "[MODERAÇÃO] Destranca um canal do servidor",
	type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'ManageChannels',
	cooldown: 5000,
    
    options: [
        {
            name: 'canal',
            description: 'Selecione um canal',
            type: ApplicationCommandOptionType.Channel,
            required: false,
        },
    ],
	run: async (client, interaction) => {
        const canal = interaction.options.getChannel('canal') || interaction.channel

        canal.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true });

        if(interaction.channel.id === canal.id) {
            let embed = new EmbedBuilder()
            .setTitle(ss.titulo)
            .setDescription(`Esse chat foi destrancado para todos os membros`)
            .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
            .setColor(ss.color)
            interaction.reply({ embeds: [embed]})
        } else {
            interaction.reply(`O Canal selecionado foi destrancado com sucesso!`)

            let embed = new EmbedBuilder()
            .setTitle(ss.titulo)
            .setDescription(`Esse chat foi destrancado para todos os membros`)
            .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
            .setColor(ss.color)
            canal.send({ embeds: [embed]})
        }
	}
};