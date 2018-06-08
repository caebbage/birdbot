const Discord = require('discord.js'),
  tinycolor = require("tinycolor2")
require('dotenv').config()

const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', msg => {
  if (msg.content === '~ping') {
    msg.reply('pong!')
  }
  if (msg.channel == msg.guild.channels.find('name', 'check-in') && msg.content == '~done') {
    msg.member.addRole(msg.guild.roles.find('name','friends'));
    msg.delete();
  }
  if (msg.content.startsWith('~color')) {
    let content = msg.content.split(' ')[1],
    id = msg.member.id

    if (tinycolor(content).isValid()) {
      content = tinycolor(content).toHex()
    } else if (tinycolor('#' + content).isValid()) {
      content = '#' + content
    } else {
      msg.reply("This doesn't look like a valid color.")
      return
    }

    console.log(content)
    
    if (!msg.guild.roles.find('name', '' + id)) {
      msg.guild.createRole().then(role => {
        role.setName('' + id).then(
          () => {
            msg.member.addRole(role.id)
            color(msg, role, content)
          }
        )
      }).catch(
        err => {msg.reply("Something went wrong!")}
      )
    } else {
      let role = msg.guild.roles.find('name', '' + id);
      color(msg, role, content)
    }
  }
  if (msg.content.startsWith('~help')) {
    msg.reply("Hello! I'm the helper bird! cae coded me. I gate the server and let you set your own color! Try `~color #HEXCODE`!")
  }
});

let color = (msg, role, color) => {
  role.setColor(color).then(() => {
    msg.reply("Applied!")
  })
}


client.login(process.env.token)
