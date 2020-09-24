const { MessageEmbed } = require("discord.js");
const { COLOR } = require("../../config.json");

module.exports = {
  name: "jump",
  description: "Jᴜᴍᴘ Tᴏ Aɴʏ Sᴏɴɢ Iɴ Tʜᴇ Qᴜᴇᴜᴇ.",
  category: "Music",
  execute(client, message, args) {
    let embed = new MessageEmbed().setColor(COLOR);

    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("YOU NEED TO BE IN VOICE CHANNEL");
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Tʜᴇʀᴇ Is Cᴜʀʀᴇɴᴛʟʏ Nᴏᴛʜɪɴɢ Pʟᴀʏɪɴɢ.");
      return message.channel.send(embed);
    }
    if (!args[0]) {
      embed.setAuthor(`Please Give The Song Number`);
      return message.channel.send(embed);
    }

    if (isNaN(args[0])) {
      embed.setAuthor("Pʟᴇᴀsᴇ Usᴇ Nᴜᴍᴇʀɪᴄ Vᴀʟᴜᴇ Oɴʟʏ.");
      return message.channel.send(embed);
    }

    //LETS FIX JUMP COMMAND :D
    if (serverQueue.songs.length < args[0]) {
      embed.setAuthor("Uɴᴀʙʟᴇ Tᴏ Fɪɴᴅ Tʜᴇ Sᴏɴɢ Iɴ Qᴜᴇᴜᴇ.");
      return message.channel.send(embed);
    }
    serverQueue.songs.splice(0, Math.floor(parseInt(args[0]) - 1));
    serverQueue.connection.dispatcher.end();

    embed.setDescription(`Jumped To Song - ${args[0]}`);
    message.channel.send(embed);
  }
};