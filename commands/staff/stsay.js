const { EmbedBuilder } = require('discord.js');
const ss = require('../../configs/settings.json');

module.exports = {
    name: "stsay",
    aliases: ["falarembed", "embedmsg", "staffsay", "embedsay"],
    userPerms: ['ManageMessages'],
    botPerms: ['ManageMessages'],
    cooldown: 5000,

    async run(client, message, args) {
        const mensagem = args.join(" ");

        try {
			
		if (args.length === 0 || !mensagem) {
			throw new Error('Você deve informar um texto')
		}
  
        if (mensagem.length > 1500) {
            throw new Error('Seu texto não pode ter mais de 1.500 Letras!')
        }
    
        message.delete().catch(O_o => {});
        let embed = new EmbedBuilder()
        .setColor(ss.color)
        .setDescription(`${mensagem}`);
        message.channel.send({ embeds: [embed] });
              
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