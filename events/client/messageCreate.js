const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const ms = require('ms')
const client = require('../..');
const settings = require('../../configs/settings.json')
const config = require('../../configs/config.json')
const prefix = config.prefix
const cooldown = new Collection();

client.on('messageCreate', async message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));

    if(command) {
        if(command.cooldown) {
            
            if(cooldown.has(`${command.name}${message.author.id}`)) return message.channel.send({ content: settings.cooldowns.message.replace('<duration>', ms(cooldown.get(`${command.name}${message.author.id}`) - Date.now()) ) });

            if(command.userPerms || command.botPerms) {
                if(!message.member.permissions.has(command.userPerms || [])) {
                    const userPerms = new EmbedBuilder()
                    .setTitle(settings.titulo)
                    .setDescription(`${message.author} Você não possui a permissão de **__${command.userPerms}__** para executar este comando!`)
                    .setColor(settings.color)
                    .setFooter({ text: settings.footer})
                    .setTimestamp()
                    return message.reply({ embeds: [userPerms]})
                }
                if(!message.guild.members.cache.get(client.user.id).permissions.has(command.botPerms || [])) {
                    const botPerms = new EmbedBuilder()
                    .setTitle(settings.titulo)
                    .setDescription(`${message.author} Eu não possuo a permissão de **__${command.botPerms}__** para executar este comando!`)
                    .setColor(`${settings.color}`)
                    .setFooter({ text: settings.footer})
                    .setTimestamp()
                    return message.reply({ embeds: [botPerms]})
                }
            }

            command.run(client, message, args)
            cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
            setTimeout(() => {
                cooldown.delete(`${command.name}${message.author.id}`)
            }, command.cooldown);
        } else {
            if(command.userPerms || command.botPerms) {
                if(!message.member.permissions.has(command.userPerms || [])) {
                    const userPerms = new EmbedBuilder()
                    .setTitle(settings.titulo)
                    .setDescription(`${message.author} Você não possui a permissão de **__${command.userPerms}__** para executar este comando!`)
                    .setColor(settings.color)
                    .setFooter({ text: settings.footer})
                    .setTimestamp()
                    return message.reply({ embeds: [userPerms]})
                }
                if(!message.guild.members.cache.get(client.user.id).permissions.has(command.botPerms || [])) {
                    const botPerms = new EmbedBuilder()
                    .setTitle(settings.titulo)
                    .setDescription(`${message.author} Eu não possuo a permissão de **__${command.botPerms}__** para executar este comando!`)
                    .setColor(`${settings.color}`)
                    .setFooter({ text: settings.footer})
                    .setTimestamp()
                    return message.reply({ embeds: [botPerms]})
                }
            }
            command.run(client, message, args)
        }
    }
})