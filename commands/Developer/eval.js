const Command = require("../../Base/Command");

class Eval extends Command {
    constructor(client) {
        super(client, {
            name: "eval",
            aliases: ["ev"],
            usage: ["eval <code>"],
            description: "Evaluates arbitrary JavaScript."
        });
    }

    async run(message, args, Discord) {
        let checkAdmin = this.client.config.botAdmins.includes(message.author.id);
        if (!checkAdmin) return;
        const code = args.join(" ");
        if (!code) return message.channel.send("❌ | Please provide code to eval.");
        try {
            const evalCode = eval(code);
            const evaled = await this.client.cleanText(evalCode);
            const embed = new Discord.MessageEmbed()
                .setAuthor("EVALUATION", message.author.displayAvatarURL({ dynamic: true }))
                .setColor(123456)
                .setTitle(`📥INPUT📥`)
                .setDescription(`\`\`\`js\n${code}\`\`\``)
                .addField(
                    `📤OUTPUT📤`,
                    `\`\`\`js\n${this.client.cleanText(evaled)}\`\`\``,
                    false
                )
                .addField(`📄TYPE📄`, `\`\`\`js\n${typeof evalCode}\`\`\``, false)
                .setFooter("OUTCOME: SUCCESS!", this.client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp();
            return message.channel.send(embed);
        } catch (err) {
            const embed = new Discord.MessageEmbed()
                .setAuthor("EVALUATION", message.author.displayAvatarURL({ dynamic: true }))
                .setColor("#FF0000")
                .setTitle(`📥INPUT📥`)
                .setDescription(`\`\`\`js\n${code}\`\`\``)
                .addField(`📤OUTPUT📤`, `\`\`\`js\n${this.client.cleanText(err.message)}\`\`\``)
                .setFooter("OUTCOME: ERROR!", this.client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp();
            return message.channel.send(embed);
        }
    }
}

module.exports = Eval;
