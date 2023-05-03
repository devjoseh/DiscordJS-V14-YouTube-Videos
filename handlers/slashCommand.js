const fs = require('fs');
const chalk = require('chalk');
const config = require('../configs/config.json')

const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v10');
const { REST } = require('@discordjs/rest')

const AsciiTable = require('ascii-table');
var table = new AsciiTable()
table.setHeading('Pasta', 'Comando', 'Status')

const rest = new REST({ version: '10' }).setToken(config.token);

module.exports = (client) => {
	const slashCommands = []; 

	fs.readdirSync('./slashCommands/').forEach(async dir => {
		const files = fs.readdirSync(`./slashCommands/${dir}/`).filter(file => file.endsWith('.js'));

		for(const file of files) {
				const slashCommand = require(`../slashCommands/${dir}/${file}`);
				slashCommands.push({
					name: slashCommand.name,
					description: slashCommand.description,
					type: slashCommand.type,
					options: slashCommand.options ? slashCommand.options : null,
					default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
					default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
				});
			
				if(slashCommand.name) {
						client.slashCommands.set(slashCommand.name, slashCommand)
						table.addRow(`${dir}`, file.split('.js')[0], '✅')
				} else {
						table.addRow(`${dir}`, file.split('.js')[0], '❌')
				}
		}
		
	});
	console.log(chalk.yellowBright(table.toString()));

	(async () => {
			try {
				await rest.put(
					Routes.applicationGuildCommands(config.client_id, config.guild_id), {body: slashCommands}
				);
			} catch (error) {
				console.log(error);
			}
	})();
};
