const Command = require('./Command');
const spawn = require('child_process').execFile;
const fs = require('fs');
const os = require('os-utils');
const commands = [];

//add some bush files to commands
fs.readdirSync('./bush').forEach(file => {
    const command = '/' + file.replace('.sh', '');
    commands.push(new Command(command, `Запустить ${file}`, (bot, msg) => {
        spawn('./bush/' + file, (e) => {
            if (e) {
                return bot.sendMessage(msg.chat.id, `При исполнении файла произошла ошибка:\n${e.message}`);
            }
            return bot.sendMessage(msg.chat.id, `Файл: ${file} успешно выполнен`);
        });
    }, [1200252178, 525442208]));
});

const id = new Command('/id',
    'Получить свой чат-id',
    (bot, msg) => {
        return bot.sendMessage(msg.chat.id, `Ваш чат-id: ${msg.chat.id}`)
    }, [1200252178, 525442208]);

const system = new Command('/system',
    'Процент загрузки процессора на текущий момент', (bot, msg) => {
        os.cpuUsage((cpu) => {
            return bot.sendMessage(msg.chat.id, `Процессор загружен на ${(cpu * 100).toFixed(1)}%`)
        })
    }, [1200252178, 525442208]);

commands.push(id);
commands.push(system);
module.exports = commands;
