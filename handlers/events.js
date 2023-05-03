const fs = require('fs');
const chalk = require('chalk')
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('Pasta', 'Evento', 'Status')

const todosEventos = []

module.exports = async (client) => {
    try {
        let quantiaEventos = 0

        const carregarDir = (dir) => {
            const files = fs.readdirSync(`./events/${dir}`).filter((file) => file.endsWith('.js'))

            for (const file of files) {
                try {
                    const eventos = require(`../events/${dir}/${file}`)
                    let eventName = file.split('.')[0]
                    todosEventos.push(eventName)
                    table.addRow(`${dir}`, `${eventName}`, `✅`)
                    quantiaEventos++
                } catch (error) {
                    console.log(chalk.redBright(error))
                }
            }
        }

        ["client", "guild", "ticket"].forEach(e => {
            carregarDir(e)
        })

        console.log(chalk.greenBright(table.toString()))
        console.log(chalk.greenBright(`${quantiaEventos} Eventos Carregados!`))

    } catch (error) {
        console.log(chalk.redBright(error))
    }
}