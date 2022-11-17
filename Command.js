class Command {
    constructor(command = '', description = '', fn = () => {
    }, access = []) {
        return {
            command,
            description,
            fn,
            access
        }
    }
}

module.exports = Command;
