var level2 = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, '');

level2.state.add('Menu', Menu);

// Adding the Game state.
level2.state.add('Game', Game);

// level2.state.start('Menu')