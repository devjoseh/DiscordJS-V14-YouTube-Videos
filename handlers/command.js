const chalk = require('chalk')
const fs = require('fs');
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('Pasta', 'Comando', 'Status')

module.exports = (client) => {
    fs.readdirSync('./commands/').forEach(dir => {
        const files = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));

        if(!files || files.legnth <= 0) console.log(chalk.redBright("0 Comandos Encontrados"))

        files.forEach((file) => {
            let command = require(`../commands/${dir}/${file}`)

            if(command) {
                client.commands.set(command.name, command)

                if(command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.forEach(alias => {
                        client.aliases.set(alias, command.name)
                    })
                }
                table.addRow(`${dir}`, command.name, '✅')
            } else {
                table.addRow(file, '❌  -> erro')
            }
        })
    })
    console.log(chalk.blueBright(table.toString()))
}