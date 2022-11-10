import * as dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits, ActivityType, EmbedBuilder } from "discord.js";

const CLIENT = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageTyping
	]
});

CLIENT.once("ready", () => {
	console.log(`Logged in as ${CLIENT.user.tag}`);
	CLIENT.user.setActivity("I am a bot", { type: ActivityType.Playing });
});

CLIENT.on("messageCreate", async (message) => {
	if (message.author.bot) {
		return;
	}

	let messageContent = message.content.toLowerCase();

	// TEST
	if (messageContent === "!test") {
		const messageEmbed = new EmbedBuilder();
		messageEmbed.setColor("#DC143C");
		messageEmbed.setTitle("Title");
		messageEmbed.setDescription("This is an example response");
		message.channel.send({ embeds: [messageEmbed] });
	}
});

CLIENT.login(process.env.DISCORD_BOT_TOKEN)
	.then((value) => {
		console.log("Connected");
	})
	.catch((error) => {
		console.log(error);
	});
