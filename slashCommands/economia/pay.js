const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ss = require('../../configs/settings.json')
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
	name: 'pay',
	description: "[ECONOMIA] Envie uma quantia em dinheiro para alguém",
	type: ApplicationCommandType.ChatInput,
	cooldown: 5000,
    
    options: [
        {
            name: 'usuario',
            description: 'Quem irá receber o dinheiro',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'quantia',
            description: 'A quantia que será enviada para a pessoa',
            type: ApplicationCommandOptionType.Number,
            required: true,
        }
    ],
	run: async (client, interaction) => {
        const usuario = interaction.options.getMember('usuario')
        const quantia = interaction.options.getNumber('quantia')
        let carteira = await db.get(`${interaction.user.id}.money`) || 0
        
        try {
            if (usuario.id === interaction.user.id) {
                throw new Error(`Você não pode enviar dinheiro a você mesmo!`)
            }

            if (carteira < quantia) {
                throw new Error(`Você não possui essa quantia!`)
            }

            if (quantia <= 99) {
                throw new Error(`O Valor deve ser igual ou maior que 100!`)
            }

            let embed = new EmbedBuilder()
            .setTitle(`Pagamento Efetuado`)
            .setColor(ss.color)
            .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
            .setDescription(`💵 **${interaction.user}** Enviou **__$${quantia}__** **${usuario}**`)
            interaction.reply({ embeds: [embed]})
            await db.add(`${usuario.id}.money`, quantia)
            await db.sub(`${interaction.user.id}.money`, quantia)
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