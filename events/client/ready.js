const client = require('../..')
const chalk = require('chalk')

/*
Types:
0 = Jogando
2 = Ouvindo
3 = Assistindo
*/

client.on("ready", () => {

const activities = [
	{ name: ``, type: 0 }, 
	{ name: ``, type: 2 },
	{ name: ``, type: 3 },
];

const status = [
	'online',
	'dnd',
	'idle'
];

let i = 0;
setInterval(() => {
	if(i >= activities.length) i = 0
	client.user.setActivity(activities[i])
	i++;
}, 15 * 1000); // 30 Segundos

let s = 0;


setInterval(() => {
	if(s >= activities.length) s = 0
	client.user.setStatus(status[s])
	s++;
}, 30 * 1000); //30 Segundos
console.log(chalk.green(`${client.user.tag} ESTÁ ONLINE!`))
});
