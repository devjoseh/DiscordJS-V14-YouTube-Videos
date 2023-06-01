const {EmbedBuilder} = require('discord.js')
const ss = require("../../configs/settings.json")

const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "atm",
    aliases: ["bal", "banco", "money"],
    cooldown: 5000,

    async run (client, message, args) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;

        let carteira = await db.get(`${member.id}.money`) || 0
        let banco = await db.get(`${member.id}.bank`) || 0
        
        try {
            if (member.bot) {
                throw new Error(`Um BOT não pode ter uma carteira`)
            }

            if(member.id === message.author.id) {
                let embed = new EmbedBuilder()
                .setTitle(`Conta Bancaria`)
                .setColor(ss.color)
                .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
                .setDescription(`**Carteira:** ${carteira}$ \n**🏦 Banco:** ${banco}$`)
                return message.reply({ embeds: [embed]})
            } else {
                let embed = new EmbedBuilder()
                .setTitle(`Conta Bancaria`)
                .setColor(ss.color)
                .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
                .setDescription(`**${member}** Possui: \n\n**<:Carteiras:833372720115875880> Carteira:** ${carteira}$ \n**🏦 Banco:** ${banco}$`)
                return message.reply({ embeds: [embed]})
            }
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