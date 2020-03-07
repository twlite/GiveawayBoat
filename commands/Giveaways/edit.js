const Command = require("../../Base/Command");
const ms = require("ms");
const num = require("num-parse");

class GEdit extends Command {
    constructor(client) {
        super(client, {
            name: "edit",
            description: "Edit giveaway.",
            usage: ["edit <giveaway_id> <time> <winners> <prize>"],
            aliases: ["g-edit", "edit-giveaway", "giveaway-edit", "gedit"]
        });
    }

    async run(message, args, Discord) {
        if (!message.member.hasPermission("MANAGE_GUILD") && !message.member.roles.cache.some(r => r.name.toLowerCase() === "giveaway")) return message.channel.send("❌ | You don't have `MANAGE_GUILD` permission or `Giveaway` role to create giveaways!");
        let id = args[0];
        if (!id) return message.channel.send("❌ | Please provide a giveaway id!");
        let hasGiveaway = this.client.GiveawayManager.giveaways.find((g) => g.messageID === id);
        if (!hasGiveaway) {
            return message.channel('Unable to find a giveaway with id `' + id + '`');
        }
        let time = args[1];
        if (!time) return message.channel.send("❌ | Please provide valid time. Eg: `1h`, `1d` etc.");
        if (ms(time) > ms("10d")) {
            return message.channel.send("❌ | Giveaway duration should be less than 10d.");
        }
        let winners = args[2];
        if (!winners) return message.channel.send("❌ | Please provide valid winner count. Eg: `1w`, `2w`");
        num(winners, 1);
        if (winners > 15) return message.channel.send("❌ | Giveaway winners should be less than 15.");
        let prize = args.slice(3).join(" ");
        if (!prize) return message.channel.send("❌ | Please provide the prize for giveaway. Eg: `g?edit <giveaway_id> 1d 2w Discord Nitro`.");

        this.client.GiveawayManager.edit(hasGiveaway.messageID, {
            addTime: ms(time),
            newWinnerCount: parseInt(winners),
            newPrize: prize,
        })
        .then(() => {
            if (message.deletable) message.delete();
            return;
        }).catch((err) => {
            message.channel.send("No giveaway found for " + id + "!");
        });
    }
}

module.exports = GEdit;
