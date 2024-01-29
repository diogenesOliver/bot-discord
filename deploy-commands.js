require("dotenv").config()
const { REST, Routes } = require("discord.js")
const fs = require('node:fs')
const path = require('node:path')


const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const commands = []

for (const file of commandFiles){
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

const res = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try{
        console.log(`Reseting ${commands.length} commands...`)
        const data = await res.put(
            Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )
    
        console.log("Succes to register commands...")
    }catch(error){
        console.error(error)
    }
})()