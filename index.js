const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const config = require('./configs/config.json')
const fs = require('fs')

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});

client.commands = new Collection()
client.slashCommands = new Collection();
client.aliases = new Collection()
client.prefix = config.prefix
module.exports = client;
client.setMaxListeners(0)
client.categories = fs.readdirSync("./commands/");

["command", "events", "slashCommand"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.login(config.token)