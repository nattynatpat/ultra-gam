
    var ext = {}
    const ArgumentType = Scratch.ArgumentType;
    const BlockType = Scratch.BlockType;

    // Define the extension metadata
    window.getInfo = function() {
        return {
            id: 'ultragame',
            name: 'Ultra Game',
            color1: '#000000',
            color2: '#000000',
            blockIconURI: 'https://ultra-game.fun/favicon.ico',
            menuIconURI: 'https://ultra-game.fun/favicon.ico',
            blocks: [
                {
                    opcode: 'ug_userexists',
                    blockType: BlockType.BOOLEAN,
                    text: 'User exists [USERNAME]',
                    arguments: {
                        USERNAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'UltraGame'
                        }
                    }
                },
                {
                    opcode: 'ug_getbio',
                    blockType: BlockType.REPORTER,
                    text: 'Get bio [USERNAME]',
                    arguments: {
                        USERNAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'UltraGame'
                        }
                    }
                },
                {
                    opcode: 'ug_getbadges',
                    blockType: BlockType.REPORTER,
                    text: 'Get badges [USERNAME]',
                    arguments: {
                        USERNAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'UltraGame'
                        }
                    }
                },
                {
                    opcode: 'ug_signup',
                    blockType: BlockType.COMMAND,
                    text: 'Create account! Username: [USERNAME] Password: [PASSWORD]',
                    arguments: {
                        USERNAME: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        PASSWORD: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'ug_chat',
                    blockType: BlockType.COMMAND,
                    text: 'Chat in the chat! Username: [USERNAME] Password: [PASSWORD] Content: [CONTENT]',
                    arguments: {
                        USERNAME: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        PASSWORD: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        CONTENT: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                }
            ]
        };
    };

    // Block implementations

    window.ug_userexists = function(args, util) {
        return fetch("https://ultra-game.fun/api/find?username=" + args.USERNAME)
            .then(response => response.json())
            .then(data => data.response);
    };

    window.ug_getbio = function(args, util) {
        return fetch("https://ultra-game.fun/api/getbio?username=" + args.USERNAME)
            .then(response => response.json())
            .then(data => data.response ? data.data : "404 Not found");
    };

    window.ug_getbadges = function(args, util) {
        return fetch("https://ultra-game.fun/api/find?username=" + args.USERNAME)
            .then(response => response.json())
            .then(data => {
                if (data.response) {
                    return fetch("https://ultra-game.fun/api/getbadges?username=" + args.USERNAME)
                        .then(response => response.json())
                        .then(badges => badges.join(" "));
                } else {
                    return "404 Not found";
                }
            });
    };

    window.ug_signup = function(args, util) {
        return fetch("https://ultra-game.fun/api/signup?username=" + args.USERNAME + "&password=" + args.PASSWORD)
            .then(response => response.json())
            .catch(err => {
                console.error('Signup failed:', err);
            });
    };

    window.ug_chat = function(args, util) {
        const socket = io('https://ultra-game.fun');
        socket.emit('message', {
            content: args.CONTENT,
            username: args.USERNAME,
            password: args.PASSWORD
        });
    };

    // Register the extension
    Scratch.extensions.register(ext);

