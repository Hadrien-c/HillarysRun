console.log('in preload');

function preload() {

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('ship', 'sprites/thrust_ship2.png');
    // game.load.image('bullet', 'misc/bullet0.png');
    game.load.image('email', 'dest/img/yahoo.jpg');

}

var game = new Phaser.Game(1680, 926, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

var player;
var bullets;

var cursors;
var fireButton;

var bulletTime = 0;
var bullet;

function create() {


    bullets = game.add.physicsGroup();
    bullets.createMultiple(32, 'bullet', false);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    email = game.add.physicsGroup();
    email.createMultiple(25, 'email', true);

    player = game.add.sprite(400, 550, 'ship');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    mail = game.add.sprite(30, 25, 'email');

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update () {
    console.log('in1')

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -600;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 600;
    }

    if (fireButton.isDown)
    {
        fireBullet();
    }

}

function fireBullet () {
    console.log('in2')

    if (game.time.time > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(player.x + 6, player.y - 12);
            bullet.body.velocity.y = -600;
            bulletTime = game.time.time + 100;
        }
    }

}

function render () {

}
