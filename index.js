// Load environment variables from .env
require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');

// Create the bot client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Log when the bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Listen for messages
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!song')) return;

  const args = message.content.split(' ');

  if (args.length < 4) {
    return message.reply(
      'Usage: `!song <song name> <download link> <cover art url>`'
    );
  }

  const songName = args.slice(1, -2).join(' ');
  const link = args[args.length - 2];
  const coverArtUrl = args[args.length - 1];

  // Optional: skip image validation
// Discord will try to load the image, no need to block links


  // Delete the user's command for cleanliness
  await message.delete().catch(() => {});

  // Create the embed
  const embed = new EmbedBuilder()
    .setTitle(songName)
    .setDescription('Click the button below to download')
    .setColor(0x2f3136)
    .setThumbnail(coverArtUrl);

  // Create the button
  const button = new ButtonBuilder()
    .setLabel('Songy')
    .setEmoji('🎵')
    .setStyle(ButtonStyle.Link)
    .setURL(link);

  const row = new ActionRowBuilder().addComponents(button);

  // Send the embed with the button
  await message.channel.send({
    embeds: [embed],
    components: [row],
  });
});

// ✅ Check if token is loaded correctly
console.log("Token loaded:", process.env.TOKEN ? "Yes" : "No");

// Login using the token from .env
client.login(process.env.TOKEN);
