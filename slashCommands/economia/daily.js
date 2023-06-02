const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const ss = require('../../configs/settings.json')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const ms = require("parse-ms")

module.exports = {
	name: 'daily',
	description: "[ECONOMIA] Pegue seu money diario",
	type: ApplicationCommandType.ChatInput,
	cooldown: 5000,
	run: async (client, interaction) => {
        let cooldown = 86400000
        let quantia = Math.floor(Math.random() * 5000)
        let diario = await db.get(`${interaction.user.id}.daily`)

        if(diario !== null && cooldown - (Date.now() - diario) > 0) {
            let tempo = ms(cooldown - (Date.now() - diario))

            interaction.reply(`${interaction.user} Aguarde **__${tempo.hours} horas, ${tempo.minutes} minutos e ${tempo.seconds} segundos__** para pegar seu daily novamente!`)
        } else {
            let embed = new EmbedBuilder()
            .setTitle(`**Money diario**`)
            .setColor(ss.color)
            .setFooter({ text: ss.footer, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
            .setDescription(`**${interaction.user}** você recebeu **__${quantia}$__** Volte daqui a 24 Horas.`)
            interaction.reply({ embeds: [embed]})

            await db.set(`${interaction.user.id}`, { daily: `${Date.now()}` });
            await db.add(`${interaction.user.id}.money`, quantia)
        }
	}
};