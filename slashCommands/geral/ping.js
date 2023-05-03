const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const ss = require('../../configs/settings.json')

module.exports = {
	name: 'ping',
	description: "[GERAL] Vê o ping do bot",
	type: ApplicationCommandType.ChatInput,
	cooldown: 5000,
	run: async (client, interaction) => {
		let embed = new EmbedBuilder()
		.setTitle(ss.titulo)
		.setColor(ss.color)
		.setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
		.setDescription(`⚡ A Latência do BOT é de: \`${Math.round(client.ws.ping)}ms\``)
		interaction.reply({ embeds: [embed]})
	}
}