const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const ms = require('ms')
const client = require('../..');
const settings = require('../../configs/settings.json')
const config = require('../../configs/config.json')
const prefix = config.prefix

const cooldown = new Collection();

client.on('interactionCreate', async interaction => {
	const slashCommand = client.slashCommands.get(interaction.commandName);
		if (interaction.type == 4) {
			if(slashCommand.autocomplete) {
				const choices = [];
				await slashCommand.autocomplete(interaction, choices)
			}
		}
		if (!interaction.type == 2) return;
	
		if(!slashCommand) return client.slashCommands.delete(interaction.commandName);
		try {
			if(slashCommand.cooldown) {
				if(cooldown.has(`slash-${slashCommand.name}${interaction.user.id}`)) return interaction.reply({ content: settings.cooldowns.message.replace('<duration>', ms(cooldown.get(`slash-${slashCommand.name}${interaction.user.id}`) - Date.now()) ) })
				if(slashCommand.userPerms || slashCommand.botPerms) {
					if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setTitle(settings.titulo)
						.setDescription(`${interaction.user} Você não possui a permissão de **__${slashCommand.userPerms}__** para executar este comando!`)
						.setColor(settings.color)
						.setFooter({ text: settings.footer})
						.setTimestamp()
						return interaction.reply({ embeds: [userPerms] })
					}
					if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setTitle(settings.titulo)
						.setDescription(`${interaction.user} Eu não possuo a permissão de **__${slashCommand.botPerms}__** para executar este comando!`)
						.setColor(`${settings.color}`)
						.setFooter({ text: settings.footer})
						.setTimestamp()
						return interaction.reply({ embeds: [botPerms] })
					}

				}

					await slashCommand.run(client, interaction);
					cooldown.set(`slash-${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown)
					setTimeout(() => {
							cooldown.delete(`slash-${slashCommand.name}${interaction.user.id}`)
					}, slashCommand.cooldown)
			} else {
				if(slashCommand.userPerms || slashCommand.botPerms) {
					if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setTitle(settings.titulo)
						.setDescription(`${interaction.user} Você não possui a permissão de **__${slashCommand.userPerms}__** para executar este comando!`)
						.setColor(settings.color)
						.setFooter({ text: settings.footer})
						.setTimestamp()
						return interaction.reply({ embeds: [userPerms] })
					}
					if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setTitle(settings.titulo)
						.setDescription(`${interaction.user} Eu não possuo a permissão de **__${slashCommand.botPerms}__** para executar este comando!`)
						.setColor(`${settings.color}`)
						.setFooter({ text: settings.footer})
						.setTimestamp()
						return interaction.reply({ embeds: [botPerms] })
					}

				}
					await slashCommand.run(client, interaction);
			}
		} catch (error) {
				console.log(error);
		}
});