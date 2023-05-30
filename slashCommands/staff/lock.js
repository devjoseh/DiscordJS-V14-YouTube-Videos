const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ss = require('../../configs/settings.json')

module.exports = {
	name: 'lock',
	description: "[MODERAÇÃO] Tranca um canal do servidor",
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

        canal.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false });

        if(interaction.channel.id === canal.id) {
            let embed = new EmbedBuilder()
            .setTitle(ss.titulo)
            .setDescription(`Esse chat foi trancado para todos os membros`)
            .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
            .setColor(ss.color)
            interaction.reply({ embeds: [embed]})
        } else {
            interaction.reply({ content: 'O Canal selecionado foi trancado com sucesso!', ephemeral: true });

            let embed = new EmbedBuilder()
            .setTitle(ss.titulo)
            .setDescription(`Esse chat foi trancado para todos os membros`)
            .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
            .setColor(ss.color)
            canal.send({ embeds: [embed]})
        }
	}
};