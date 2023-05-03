const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const ss = require('../../configs/settings.json')

module.exports = {
	name: '',
	description: "",
	type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'ManageMessages',
	cooldown: 5000,
	run: async (client, interaction) => {
        //código
	}
};

const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const ss = require('../../configs/settings.json')

module.exports = {
	name: '',
	description: "",
	type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'ManageMessages',
	cooldown: 5000,
    
    options: [
        {
            name: '',
            description: '',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
	run: async (client, interaction) => {
        const quantia = interaction.options.getNumber('quantia')
	}
};
