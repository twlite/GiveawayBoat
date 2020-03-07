const Command = require("../../Base/Command");
const ms = require("ms");

class GDel extends Command {
    constructor(client) {
        super(client, {
            name: "delete",
            description: "Deletes the giveaway.",
            usage: ["delete <giveaway_id>"],
            aliases: ["g-delete", "delete-giveaway", "giveaway-delete", "gdelete"]
        });
    }

    async run(message, args, Discord) {
        if (!message.member.hasPermission("MANAGE_GUILD") && !message.member.roles.cache.some(r => r.name.toLowerCase() === "giveaway")) return message.channel.send("❌ | You don't have `MANAGE_GUILD` permission or `Giveaway` role to manage giveaways!");
        let id = args[0];
        if (!id) return message.channel.send("❌ | Please provide a giveaway id.");
        let hasGiveaway = this.client.GiveawayManager.giveaways.find((g) => g.messageID === id);
        if (!hasGiveaway) {
            return message.channel('Unable to find a giveaway with id `' + id + '`');
        }
        this.client.GiveawayManager.delete(hasGiveaway.messageID)
        .then(() => {
            if (message.deletable) message.delete();
            return;
        })
        .catch((e) => {
            message.channel.send("No giveaway found for `"+id+"`!");
        });
    }
}

module.exports = GDel;
