const TelegramAPI = require('node-telegram-bot-api');
const commands = require('./commands');
const env = require('.env');

const bot = new TelegramAPI(env.token, {
    polling: true
});

bot.setMyCommands(commands);

bot.on('message', (msg) => {
    if (!new RegExp('/').test(msg.text)) return;

    const chatID = msg.chat.id;
    const command = commands.find(command => command.command === msg.text);

    if (!command) return bot.sendMessage(chatID, "Соре бро, но я пока не знаю эту команду");
    if (!(command.access.length && command.access.includes(chatID))) return bot.sendMessage(chatID, "Оу, похоже у тебя нет доступа");
    command.fn(bot, msg);
});
