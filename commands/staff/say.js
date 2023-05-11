const { EmbedBuilder } = require('discord.js');
const ss = require('../../configs/settings.json');

module.exports = {
    name: "say",
    aliases: ["falar"],
    userPerms: ['ManageMessages'],
    botPerms: ['ManageMessages'],
    cooldown: 5000,

    async run(client, message, args) {
    const mensagem = args.join(" ");

    try {
		
		if (!mensagem) {
			throw new Error('Informe um texto')
		}
  
        if (mensagem.length > 1500) {
            throw new Error('Seu texto não pode ter mais de 1.500 Letras!')
        }

        try {
            await message.delete();
            await message.channel.send(mensagem);
        } catch (error) {
            console.error(error);
            return message.reply(`Ocorreu um erro ao enviar a mensagem. \n\n\`\`\`${error}\`\`\``);
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