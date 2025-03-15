class UltraGameExtension {
    constructor() {
        this.id = 'ultra_game_extension';
        this.name = 'Ultra Game Extension';
    }

    getInfo() {
        return {
            id: this.id,
            name: this.name,
            blocks: [
                {
                    opcode: 'startGame',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'start ultra game',
                    arguments: {}
                },
                {
                    opcode: 'stopGame',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'stop ultra game',
                    arguments: {}
                }
            ]
        };
    }

    startGame() {
        console.log('Starting the ultra game...');
    }

    stopGame() {
        console.log('Stopping the ultra game...');
    }
}

Scratch.extensions.register(new UltraGameExtension());
