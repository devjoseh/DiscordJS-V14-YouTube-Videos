const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ss = require('../../configs/settings.json')
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
	name: 'atm',
	description: "[ECONOMIA] Veja a quantia de dinheiro que você tem na sua carteira e banco",
	type: ApplicationCommandType.ChatInput,
	cooldown: 5000,
    
    options: [
        {
            name: 'usuario',
            description: 'Veja a conta bancaria de outra pessoa',
            type: ApplicationCommandOptionType.User,
            required: false,
        },
    ],
	run: async (client, interaction) => {
        const member = interaction.options.getMember('usuario') || interaction.user
        let carteira = await db.get(`${member.id}.money`) || 0
        let banco = await db.get(`${member.id}.bank`) || 0

        try {
            if (member.bot) {
                throw new Error(`Um BOT não pode ter uma carteira`)
            }

            if(member.id === interaction.user.id) {
                let embed = new EmbedBuilder()
                .setTitle(`Conta Bancaria`)
                .setColor(ss.color)
                .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
                .setDescription(`**Carteira:** ${carteira}$ \n**🏦 Banco:** ${banco}$`)
                return interaction.reply({ embeds: [embed]})
            } else {
                let embed = new EmbedBuilder()
                .setTitle(`Conta Bancaria`)
                .setColor(ss.color)
                .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
                .setDescription(`**${member}** Possui: \n\n**Carteira:** ${carteira}$ \n**🏦 Banco:** ${banco}$`)
                return interaction.reply({ embeds: [embed]})
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