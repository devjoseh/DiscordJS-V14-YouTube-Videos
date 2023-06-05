const {EmbedBuilder} = require('discord.js')
const ss = require("../../configs/settings.json")
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "pay",
    aliases: ["pagar"],
    cooldown: 5000,

    async run (client, message, args) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let carteira = await db.get(`${message.author.id}.money`) || 0
        
        try {
            if (!member) {
                throw new Error(`Informe a pessoa que você deseja enviar o dinheiro!`)
            }

            if (!args[1]) {
                throw new Error(`Informe o valor do pagamento!`)
            }

            if (member.id === message.author.id) {
                throw new Error(`Você não pode enviar dinheiro a você mesmo!`)
            }

            if (carteira < args[1]) {
                throw new Error(`Você não possui essa quantia!`)
            }

            if (args[1] <= 99) {
                throw new Error(`O Valor deve ser igual ou maior que 100!`)
            }

            if (isNaN(args[1])) {
                throw new Error(`Você deve informar um valor numérico!`)
            }

            let embed = new EmbedBuilder()
            .setTitle(`Pagamento Efetuado`)
            .setColor(ss.color)
            .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
            .setDescription(`💵 **${message.author}** Enviou **__$${args[1]}__** **${member}**`)
            message.reply({ embeds: [embed]})

            await db.add(`${member.id}.money`, args[1])
            await db.sub(`${message.author.id}.money`, args[1])
            
        } catch (error) {
            const embedError = new EmbedBuilder()
            .setTitle(ss.titulo)
            .setDescription(`${message.author} ${error.message}`)
            .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
            .setColor(ss.color)
            return message.reply({ embeds: [embedError] });
        }
    }
}