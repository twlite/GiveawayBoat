const { Client, Collection } = require("discord.js");
const { GiveawaysManager } = require("discord-giveaways");

class GiveawayBoat extends Client {
    constructor(options) {
        super(options);
        this.commands = new Collection();
        this.aliases = new Collection();
        this.GiveawayManager = new GiveawaysManager(this, {
            storage: "./database.json",
            updateCountdownEvery: 5000,
            default: {
                botsCanWin: false,
                exemptPermissions: [],
                embedColor: "#FF0000",
                embedColorEnd: "#7289DA",
                reaction: "🎉"
            }
        });
        this.config = require("../config.js");
    }

    fetchCommand(name) {
        return this.commands.get(name) || this.commands.get(this.aliases.get(name));
    }

    cleanText(text) {
        if (typeof text !== "string")
            text = require("util").inspect(text, { depth: 1 });

        text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(
                this.token,
                "TOKEN"
            );

        return text;
    }

    connect() {
        return this.login(this.config.token);
    }
}

module.exports = GiveawayBoat;
