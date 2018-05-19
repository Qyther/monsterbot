// Initializing the discord.js API
const Discord = require("discord.js");
// Initializing a client for the discord.js API
const client = new Discord.Client();

// Test if the bot is ready to launch
client.on("ready", () => {
  console.log("Yee-aah, Less go!");
  client.user.setGame("m.help for help");
});

listenin = 0;

// Test for a message
client.on("message", msg => {
  try {
  // If message owner is a bot cut off
  if (msg.author.bot) return;
  // If message is in the dms of someone cut off
  if (msg.channel.guild == null) return;
  //Test
  if (msg.author.id === "294926892321210374" && listenin === 1) {
    msg.delete();
    //Set false
    listenin = 0;
    //Eval
    eval(msg.content).catch(() => { msg.channel.send("ERROR!"); });
    //Cut off
    return;
  }
  // Test if command is called and otherwise cut off
  if (!msg.content.toLowerCase().startsWith("m.")) return;
  // Getting the cmd tolowercase
  var cmd = msg.contentoLowerCase();
  // Deleting user's message
  msg.delete();


  // Eval command
  if (cmd.startsWith("m.eval") && msg.author.id === "294926892321210374") {
    //Set true
    listenin = 1;
    //Cut off
    return;
  }

  // Calc command
  if (cmd.startsWith("m.calc")) {
    //Get sum
    var sum = msg.content.toLowerCase().split("m.calc ")[1];
    //Calculate
    if (sum.match(/[a-z]/)) return msg.reply("Please enter a valid sum!");
    try {
    msg.reply(sum + " is " + eval(sum));
  } catch(e) {
    msg.reply("Please enter a valid sum!");
  }
    //Cut off
    return;
  }

  // Say command
  if (cmd.startsWith("m.say")) {
    //Fetch message
    var message = msg.content.split(" ");
    var msgs = [];
    for (i=0;i<message.length;i++) {
      if (i>=1) {
        msgs.push(message[i]);
      }
    }
    //Send
    msg.channel.send(msgs.join(" "));
    //Cut off
    return;
  }

  // Message command
  if (cmd.startsWith("m.message")) {
    //Get user
    var user = msg.mentions.members.first();

    //Fetch message
    var message = msg.content.split(" ");
    var msgs = [];
    for (i=0;i<message.length;i++) {
      if (i>=2) {
        msgs.push(message[i]);
      }
    }
    //Send
    user.send(msg.author.username + " Says-> " + msgs.join(" "));
    //Cut off
    return;
  }

  // Help command
  if (cmd.startsWith("m.help")) {
    //Make an embed
    const embed = new Discord.RichEmbed()
  .setTitle("")
  .setAuthor("-MonsterCave Help-", msg.author.avatarURL)
  .setColor(0x00AE86)
  .setDescription("Check down here for help!")
  .setFooter("-MonsterCave Help-")
  .setThumbnail(msg.author.avatarURL)
  .setTimestamp()
  .addField("Administrative commands:",
    "m.purge [amount] - Deletes [amount] messages.\nm.mute [user] - Makes [user] unable to send a message.\nm.unmute [user] - Makes [user] able to send a message.\nm.ban [user] [days] [reason] - Bans [user] for [days] days for [reason]\nm.unban [id] - Unbans user by id\nm.kick [user] [reason] - Kicks [user] for [reason]\nm.eval - Executes next message(Only owner of bot!)")
  .addField("Social commands:", "m.calc [sum] - Calculates [sum]\nm.say [message] - Makes the bot say [message]\nm.message [user] [message] - Messages [user] [message] privately", true);
  //Send it
  msg.channel.send({embed});
  //Cut off
    return;
  }
  // Purge command
  if (cmd.startsWith("m.purge ") && msg.member.permissions.has("MANAGE_MESSAGES")) {
    //Get amount of messages to be deleted
    var cm = parseInt(cmd.split(" ")[1]);
    //Testing if amount is valid
    if (cm <= 0 || cm > 100 || !cm) {
      msg.reply("That is an invalid amount of messages! Maximum is 100 and minimum is 1!");
    }
    //Purging
    msg.channel.bulkDelete(cm).catch(() => { return msg.reply("Could not delete messages! Do i have permissions to do so?") });
    //Cut off
    return;
  }
  // Mute command
  if (cmd.startsWith("m.mute") && msg.member.permissions.has("MANAGE_MESSAGES")) {
    //Get user

    var user = msg.mentions.members.first();
    //Test if user exists
    if (!user) return msg.reply("Please mention a user!");
    //Test if user is admin
    if (user.permissions.has("ADMINISTRATOR")) return msg.reply("I can't mute that user! This user is an admin!");
    //Add mute
    user.addRole(msg.guild.roles.find("name", "muted")).then(() => {
      msg.reply("Successfully muted " + user);
    }).catch(() => { return msg.reply("Could not mute " + user); });
    //Cut off
    return;
  }

  // Unmute command
  if (cmd.startsWith("m.unmute") && msg.member.permissions.has("MANAGE_MESSAGES")) {
    //Get user

    var user = msg.mentions.members.first();
    //Test if user exists
    if (!user) return msg.reply("Please mention a user!");
    //Remove mute
    user.removeRole(msg.guild.roles.find("name", "muted")).then(() => {
      msg.reply("Successfully unmuted " + user);
    }).catch(() => { return msg.reply("Could not unmute " + user); });
    //Cut off
    return;
  }

  // Ban command
  if (cmd.startsWith("m.ban") && msg.member.permissions.has("BAN_MEMBERS")) {
    //Get user

    var user = msg.mentions.members.first();

    //Get reason
    var reasons = msg.content.split(" ");
    if (!reasons) return msg.reply("Please add a reason!");
    var reason = "";
    for (i=0;i<reasons.length;i++) {
      if (i>=3) reason+=reasons[i] + " ";
    }

    var days = parseInt(msg.content.split(" ")[2]);

    if (!days) return msg.reply("Please specify the amount of days!");
    //Test if user exists
    if (!user) return msg.reply("Please mention a user!");
    //Test if user is admin
    if (user.permissions.has("ADMINISTRATOR")) return msg.reply("I can't ban that user! This user is an admin!");
    //Add ban
    user.ban(reason, days).then(() => {
      msg.reply("Successfully banned " + user + " for " + days + " days for " + reason);
    }).catch(() => { return msg.reply("Could not ban " + user); });
    //Cut off
    return;
  }

  // Unban command
  if (cmd.startsWith("m.unban") && msg.member.permissions.has("BAN_MEMBERS")) {
    //Get id
    var id = msg.content.split(" ")[1];

    //Test if id exists
    if (!id) return msg.reply("Please enter an id!");
    //Remove ban
    msg.guild.unban(id).then(() => {
      msg.reply("Successfully unbanned " + id);
    }).catch(() => { return msg.reply("Could not unban " + id); });
    //Cut off
    return;
  }

  // Kick command
  if (cmd.startsWith("m.kick") && msg.member.permissions.has("KICK_MEMBERS")) {
    var user = msg.mentions.members.first();
    //Test if user exists
    if (!user) return msg.reply("Please mention a user!");
    //Add kick

    //Get reason
    var reasons = msg.content.split(" ");
    if (!reasons) return msg.reply("Please add a reason!");
    var reason = "";
    for (i=0;i<reasons.length;i++) {
      if (i>=2) reason+=reasons[i] + " ";
    }
    user.kick(reason).then(() => {
      msg.reply("Successfully kicked " + user);
    }).catch(() => { return msg.reply("Could not kick " + user); });
    //Cut off
    return;
  }
} catch (e) {
  console.log(e);
}
});

client.login("NDM1ODMzMzQ0OTQ5NzQ3NzEy.DbetfQ.pX-gFAdRrmcaDuzRdyV0cYNpjio");
