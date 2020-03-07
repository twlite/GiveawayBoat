const Command = require("../../Base/Command");
const moment = require('moment');
require('moment-duration-format');

class Uptime extends Command {
    constructor(client) {
        super(client, {
            name: "uptime",
            description: "Shows bot uptime.",
            aliases: [],
            usage: ["uptime"]
        });
    }

    async run(message, args, Discord) {
        const duration = moment.duration(this.client.uptime).format(' D [Days], H [Hours], m [Minutes], s [Seconds]');
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor('BOT UPTIME')
            .setThumbnail(`${this.client.user.displayAvatarURL(({ dynamic: true }))}`)
            .addField("Uptime:", `${duration}`)
            .setFooter(`${this.client.user.username}`, `${this.client.user.displayAvatarURL({ dynamic: true })}`)
            .setTimestamp()
        return message.channel.send(embed);
    }
}

module.exports = Uptime;
