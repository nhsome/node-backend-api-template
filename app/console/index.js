const argv = require('minimist')(process.argv.slice(2));
const commandsMap = require('./commandsMap');

if (argv.h || argv.help) {
    console.log(`
        Usage: node app/console/index.js [arguments]
        Options:
            -h --help       Print help
            -e --execute    Execute commands
            --list          Show all commands
    `);
    process.exit();
}

if (argv.list) {
    let message = '';
    for (let key in commandsMap) {
        message += `${key}: ${commandsMap[key].description}\n`;
    }
    console.log(message.substring(0, message.length - 1));
    process.exit();
}

if (!argv.e && !argv.execute) {
    console.error('Provide command to -e or --execute');
    process.exit(1);
}

const carg = argv.e || argv.execute;
const Command = (commandsMap[carg]) ? commandsMap[carg].module : undefined;
if (!Command) {
    console.error(`Command ${carg} not found`);
    process.exit(2);
}

const command = new Command();

(async function () {
    try {
        await command.execute();
    }
    catch(err) {
        console.error(err);
        process.exit(3);
    }
    console.log('Whoa!');
    process.exit();
})();