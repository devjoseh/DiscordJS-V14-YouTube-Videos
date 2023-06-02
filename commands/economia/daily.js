const {EmbedBuilder} = require('discord.js')
const ss = require("../../configs/settings.json")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const ms = require("parse-ms")

module.exports = {
    name: "daily",
    aliases: ["diario"],
    cooldown: 5000,

    async run (client, message, args) {
        let cooldown = 86400000
        let quantia = Math.floor(Math.random() * 1000)
        let diario = await db.get(`${message.author.id}.daily`)

        if(diario !== null && cooldown - (Date.now() - diario) > 0) {
            let tempo = ms(cooldown - (Date.now() - diario))

            message.reply(`${message.author} Aguarde **__${tempo.hours} horas, ${tempo.minutes} minutos e ${tempo.seconds} segundos__** para pegar seu daily novamente!`)
        } else {
            let embed = new EmbedBuilder()
            .setTitle(`**Money diario**`)
            .setColor(ss.color)
            .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
            .setDescription(`**${message.author}** você recebeu **__${quantia}$__** Volte daqui a 24 Horas.`)
            message.reply({ embeds: [embed]})

            await db.set(`${message.author.id}`, { daily: `${Date.now()}` });
            await db.add(`${message.author.id}.money`, quantia)
        }
    }
}