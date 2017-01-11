console.log('in level 2');

var level2 = new Phaser.Game(1680, 926, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

function preload() {

    level2.load.baseURL = '../../';
    level2.load.crossOrigin = 'anonymous';

    level2.load.image('hil', 'dest/img/hil.jpg');
    level2.load.image('email', 'dest/img/yahoo.png');
    level2.load.image('fireBullet', 'dest/img/fire.png');

}

var player;
var fire;

var cursors;
var fireButton;

var bulletTime = 0;
// var bullet;
var emails;
var scoreText;
var score = 0;

function create() {


    fire = level2.add.physicsGroup();
    fire.createMultiple(32, 'fireBullet', false);
    fire.setAll('checkWorldBounds', true);
    fire.setAll('outOfBoundsKill', true);

    fire.width = 10;
    fire.height = 10;

    player = level2.add.sprite(400, 550, 'hil');
    player.width = 150;
    player.height = 160;
    // player.body.collideWorldBounds = true;

    //Emails
    emails = level2.add.group();
    emails.enableBody = true;
    emails.physicsBodyType = Phaser.Physics.ARCADE;

    for (var y = 0; y < 4; y++) {
        for (var x = 0; x < 10; x++) {
            var mail = emails.create(200 + x * 500, y * 50, 'email');
            mail.name = 'mail' + x.toString() + y.toString();
            mail.checkWorldBounds = true;
            mail.events.onOutOfBounds.add(mailOut, this);
            mail.body.velocity.y = 50 + Math.random() * 200;
        }
    }

    level2.physics.arcade.enable(player);

    level2.physics.arcade.enable(mail);
    mail.width = 150;
    mail.height = 150;


    scoreText = level2.add.text(16, 16, 'Score: 0', {
        fontSize: '32px',
        fill: '#fff',
        background: '#000'
    });


    cursors = level2.input.keyboard.createCursorKeys();
    fireButton = level2.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function mailOut(mail) {
    mail.reset(mail.x, 0);
    mail.body.velocity.y = 50 + Math.random() * 200;


}

function update() {

    console.log('in')

    level2.physics.arcade.overlap(emails, fire, collectMail, null, this);

    function collectMail(fire, mail) {
        console.log('in collect mail');
        mail.kill();
        fire.kill();
        score += 10;
        scoreText.text = 'Score: ' + score;
    }


    if (cursors.left.isDown) {
        player.body.velocity.x = -600;
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 600;
    }

    if (fireButton.isDown) {
        fireBullet();
    }

}

function fireBullet() {
    console.log('in2')

    if (level2.time.time > bulletTime) {
        bullet = fire.getFirstExists(false);

        if (bullet) {
            bullet.reset(player.x + 6, player.y - 12);
            bullet.body.velocity.y = -600;
            bulletTime = level2.time.time + 100;
        }
    }

}

function render() {

}
