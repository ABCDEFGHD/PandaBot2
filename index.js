/** Dependencies. */
const Discord = require("discord.js");
const Client  = new Discord.Client();

const Ytdl = require("ytdl-core");

const Audio = require("./audio.js");

/** Constants. */
const PREFIX = "&";
const TOKEN  = process.env.TOKEN;

/** Emojis used to stylize the bot. */
const Emojis = {
	"SUCCESS": ":white_check_mark:",
	"FAILURE": ":x:",
	"WARNING": ":warning:",

	"MUSIC_BACKWARD": ":rewind:",
	"MUSIC_FORWARD": ":fast_forward:",
	"MUSIC_LOOP": ":repeat:",
	"MUSIC_LOOP_ONCE": ":repeat_one:",
	"MUSIC_PAUSE": ":pause:",
	"MUSIC_PLAY": ":arrow_forward:",
	"MUSIC_PREV": ":track_previous:",
	"MUSIC_SHUFFLE": ":twisted_rightwards_arrows:",
	"MUSIC_SKIP": ":track_next:",
	"MUSIC_STOP": ":stop_button:",

	"SEARCH": ":mag_right:",
	"LOADING": ":hourglass:",

	"ACCESS_DENIED": ":no_entry:",
	"SETTINGS": ":gear:"
}

/** Some stats about the bot. */
const Stats = {
	"guilds": Client.guilds.size,
	"users": Client.users.size
};

/** Pointers. */
AudioPlayer = null;

/**
 * @event ready
 *  Emitted when the bot is connected.
 */
Client.on("ready", () => {
	console.log("[STATUS] Logged in !");
	Client.user.setActivity(`&help | ${Stats.guilds} serveurs | ${Stats.users} utilisateurs`, { type: 0 })
		.then(presence => console.log(`[INFOS] Activity set to ${presence.game ? presence.game.name : 'none'}`))
		.catch(console.error);
	Client.user.setStatus("online")
		.then(() => {
			console.log(`[INFOS] Status set to online.`);
		}).catch(console.error);
});

/**
 * @event message
 *  Emitted whenever a user sends a message.
 */
Client.on("message", Message => {
	const Content = Message.content;

	/** Make sure to only listen to commands. */
	if (Content.startsWith(PREFIX)) {
		if (!Message.guild || Message.author.username == Client.user.username) return;

		/** Decompose the command. */
		var CommandParts = Content.substring(PREFIX.length).split(" ");
		var CommandName = CommandParts[0];
		var CommandArgs = CommandParts.shift() && CommandParts;

		switch(CommandName) {
			/**
			 * @name play
			 *  Play music from YouTube.
			 */
			case "play":
				v = Message.member.voiceChannel;
				if (v) {
					v.join().then(Connection => {
						console.log(`[CHANNEL] Connected to ${v.name} !`);
						Message.channel.send(`${Emojis.SUCCESS} Connected to channel **${v.name}**.`);

						if (CommandArgs[0]) {
							if (!Ytdl.validateURL(CommandArgs[0])) {
								Message.channel.send(`${Emojis.WARNING} **play** requires a valid YouTube URL !`);
							} else {
								Message.channel.send(`${Emojis.SEARCH} Searching for **${CommandArgs[0]}**.`).then(m => {
									Ytdl.getInfo(CommandArgs[0], {}, (err, info) => {
										if (err || !info) {
											m.edit(`${Emojis.FAILURE} Unable to retrieve song info.`);
											throw err;
										}

										var thumbnail = info.player_response.videoDetails.thumbnail.thumbnails.pop();

										console.log(thumbnail[thumbnail.length - 1]);
										const infos = {
											"author": info.author.name,
											"duration": info.length_seconds,
											"title": info.title,
											"thumbnail": thumbnail.url,
											"url": info.video_url,
											"formats": info.formats
										};

										m.edit({
											embed: {
												color: 0x000000,
												author: {
													name: "Song added !",
													icon_url: "https://yt3.ggpht.com/OgVV66t5vou1LkAbPh7yHbJA73Z2kKHs6-mFaeVFjnlU-pWESAPXFi-5pMASF7Mp1YLfoMdeI38v68U=s288-mo-c-c0xffffffff-rj-k-no"
												},
												title: infos.title,
												url: infos.url,
												thumbnail: { url: infos.thumbnail },
												fields: [
													{
														name: "Uploaded by",
														value: infos.author,
														inline: true
													},
													{
														name: "Requested by",
														value: Message.author.username + "\u000d",
														inline: true
													},
													{
														name: "Duration",
														value: new Date(infos.duration * 1000).toISOString().substr(11, 8),
														inline: true
													},
													{
														name: "Position in queue",
														value: "**Now playing**",
														inline: true
													}
												]
											}
										});

										const Stream = Ytdl.downloadFromInfo(info, {"format": "audioonly"});
										const dispatcher = Connection.playStream(Stream);
										AudioPlayer = new Audio(Connection, Message.channel);
									});
								});
							}
						} else {
							Message.channel.send(`${Emojis.WARNING} **play** needs one argument : a correct YouTube URL or a query !`);
						}
					}).catch(err => {
						Message.channel.send(`${Emojis.FAILURE} Could not connect to channel : **${err}**.`);
						console.error(err);
					});
				} else {
					Message.channel.send(`${Emojis.WARNING} You must be in a voice channel first !`);
				}
				break;

			/**
			 * @name stop
			 *  Stop current music and leave the voice channel.
			 */
			case "stop":
				if (AudioPlayer) {
					AudioPlayer.stop();
					console.log(`[CHANNEL] Left channel ${AudioPlayer.VOICE_CHANNEL.name}.`);
					Message.channel.send(`${Emojis.SUCCESS} Left channel **${AudioPlayer.VOICE_CHANNEL.name}**.`);
					AudioPlayer = null;
				} else {
					Message.channel.send(`${Emojis.WARNING} The bot is not in a voice channel !`);
				}
				break;

			default:
				Message.channel.send(`${Emojis.FAILURE} Invalid command **${CommandName}**`);
				break;
		}
	}
});


/** Login when all events are binded. */
Client.login(TOKEN);
