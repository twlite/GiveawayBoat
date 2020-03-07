const Command = require("../../Base/Command");

class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Get bot latency.",
            usage: ["ping"],
            aliases: ["pong", "latency"]
        });
    }

    async run(message, args, Discord) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Pong!")
            .setDescription(
                `Websocket Latency: ${
                this.client.ws.ping ? Math.floor(this.client.ws.ping) : 0
                }ms\nBot Latency: ${Math.round(
                    Date.now() - message.createdTimestamp
                )}ms`
            )
            .setColor("#7289DA");
        return message.channel.send(embed);
    }
}

module.exports = Ping;
