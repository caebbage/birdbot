const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', msg => {
  if (msg.content === '~ping') {
    msg.reply('pong!')
  }
  if (msg.channel === msg.guild.channels.find('name', 'check-in') && msg.content == '~done') {
    msg.author.setRoles([msg.guild.roles.find('name','friends').id])
  }
  if (msg.content.startsWith('~color')) {
    let content = msg.content.split(' ')[1];
    let id = msg.author.id
    if (content.charAt(0) != "#") content = '#' + content
    if (!msg.guild.roles.find('name', id)) {
      msg.guild.createRole({name: id})
      msg.author.addRole(msg.guild.roles.find('name', id))
    }
    msg.guild.roles.find('name', id).setColor(content).catch(
      msg.reply("Invalid color:" + content)
    );
  }
  if (mg.content.startsWith('~help')) {
    msg.reply("Hello! I'm the helper bird! cae coded me. I gate the server and let you set your own color! Try `~color #HEXCODE`!")
  }
});

client.login(process.env.token)
