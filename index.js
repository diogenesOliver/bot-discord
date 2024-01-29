require('dotenv').config()
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

const fs = require('node:fs')
const path = require('node:path')
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)

	if ("data" in command && "execute" in command) {
		client.commands.set(command.data.name, command)
	} else {
		console.log(`This command in ${path} don't have "data" or "execute"`)
	}
}

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, (interaction) => {
	if (!interaction.isChatInputCommand()){
		return	
	}

	console.log(interaction)
})