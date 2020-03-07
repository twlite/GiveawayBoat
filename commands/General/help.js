const Command = require("../../Base/Command");

class Help extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            description: "Displays bot commands.",
            aliases: ["h", "commands"],
            usage: ["help"]
        });
    }

    async run(message, args, Discord) {
        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`Total Commands: ${this.client.commands.size}`)
                .setTitle(`Commands`)
                .setThumbnail(this.client.user.displayAvatarURL({ format: "png" }))
                .setDescription(
                    `Use **${this.client.prefix}help <command>** for more info.`
                )
                .addField(
                    `General [${
                    this.client.commands.filter(c => c.help.category === "General").size
                    }]`,
                    this.client.commands
                        .filter(c => c.help.category === "General")
                        .map(m => `\`${m.help.name}\``)
                        .join(", ")
                )
                .addField(
                    `Giveaways [${
                    this.client.commands.filter(c => c.help.category === "Giveaways").size
                    }]`,
                    this.client.commands
                        .filter(c => c.help.category === "Giveaways")
                        .map(m => `\`${m.help.name}\``)
                        .join(", ")
                )
                .setColor("#7289DA");
            return message.channel.send(embed);
        } else {
            let cmd = this.client.fetchCommand(args[0]);
            if (!cmd) return message.channel.send("❌ | Invalid Command.");
            const embed = new Discord.MessageEmbed()
                .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setTitle(cmd.help.name)
                .setThumbnail(this.client.user.displayAvatarURL({ format: "png" }))
                .setDescription(cmd.help.description)
                .addField("Category", cmd.help.category)
                .addField(
                    "Aliases",
                    cmd.help.aliases.join(", ")
                )
                .addField(
                    "Usage",
                    `${
                    cmd.help.usage[0].startsWith("No")
                        ? cmd.help.usage[0]
                        : cmd.help.usage.map(m => `${this.client.prefix}${m}`).join("\n")
                    }`
                )
                .setColor("#7289DA")
                .setFooter(
                    `${this.client.user.username} - Commands`,
                    this.client.user.displayAvatarURL({ dynamic: true })
                )
                .setTimestamp();
            return message.channel.send(embed);
        }
    }
}

module.exports = Help;
