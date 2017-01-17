console.log('in level 2');

var level2 = new Phaser.Game(1080, 926, Phaser.AUTO, '', {
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
var emails;
var scorePlayer;
var scoreFbi
var score = 0;
var scoreEnemy = 0;

function create() {


    fire = level2.add.physicsGroup();
    fire.createMultiple(32, 'fireBullet', false);
    fire.setAll('checkWorldBounds', true);
    fire.setAll('outOfBoundsKill', true);

    fire.width = 10;
    fire.height = 10;

    player = level2.add.sprite(400, 570, 'hil');
    player.width = 150;
    player.height = 160;
    // player.enableBody = true;
    // player.body.collideWorldBounds = true;

    //Emails
    emails = level2.add.group();
    emails.enableBody = true;
    emails.physicsBodyType = Phaser.Physics.ARCADE;


    //WTF ???
    for (var y = 0; y < 10; y++) {
        for (var x = 0; x < 10; x++) {
            //Create falling emails
            var mail = emails.create(5 + x * 94, y * 10, 'email');
            mail.name = 'mail' + x.toString() + y.toString(); // ??
            mail.checkWorldBounds = true;
            mail.events.onOutOfBounds.add(mailOut, this);
            mail.body.velocity.y = 150 + Math.random() * 200;
        }
    }

    level2.physics.arcade.enable(player);
    level2.physics.arcade.enable(mail);
    mail.width = 150;
    mail.height = 150;

    //Score Hillary
    scorePlayer = level2.add.text(16, 16, 'Score: 0', {
        fontSize: '32px',
        fill: '#fff',
        background: '#000'
    });

    //Score FBI
    scoreFbi = level2.add.text(660, 16, 'FBI: 0', {
        fontSize: '32px',
        fill: '#ff0000',
        background: '#000'
    });

    cursors = level2.input.keyboard.createCursorKeys();
    fireButton = level2.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}


//Generate emails
function mailOut(mail) {
    mail.reset(mail.x, 0);
    //Emails move X
    mail.body.velocity.y = 50 + Math.random() * 200;
    //Emails move Y
    // mail.body.velocity.x = 0 + Math.random() * 200;

}


function update() {

    //Colistion between bullet and emails
    level2.physics.arcade.overlap(emails, fire, collectMail, null, this);


    //Hillary collect emails
    function collectMail(fire, mail) {
        console.log('in collect mail');
        mail.kill();
        fire.kill();
        score += 10;
        scorePlayer.text = 'Score: ' + score;
    }

    //Hillary's move
    if (cursors.left.isDown) {
        player.body.velocity.x = -600;
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 600;
    }

    //Shot's command
    if (fireButton.isDown) {
        fireBullet();
    }

    //FBI collect 
    function fbiCollect() {
        // mail.kill();
        scoreEnemy += 10;
        scoreFbi.text = 'Score FBI : ' + scoreEnemy;
    }

    //Hillary's shot
    function fireBullet() {
        if (level2.time.time > bulletTime) {
            bullet = fire.getFirstExists(false);
            if (bullet) {
                bullet.reset(player.x + 6, player.y - 12);
                bullet.body.velocity.y = -600;
                bulletTime = level2.time.time + 100;
            }
        }

    }

}

function render() {

}
