console.log('in level 2');

var level2 = new Phaser.Game(1080, 726, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

function preload() {

    level2.load.baseURL = '../../';
    level2.load.crossOrigin = 'anonymous';

    level2.load.image('sky', 'dest/img/sky.png');
    level2.load.image('hil', 'dest/img/hil.jpg');
    level2.load.image('email', 'dest/img/yahoo.png');
    level2.load.image('fireBullet', 'dest/img/fire.png');
    level2.load.image('ground', 'dest/img/ground.png');

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
var platforms;
var ground;
var bkg;



// -------------------------------------------------
// -------------------------------------------------
// -----------------    CREATE   ----------------------
// -------------------------------------------------
// -------------------------------------------------


function create() {

    level2.physics.startSystem(Phaser.Physics.ARCADE);

    //Add bkg
    var bkg = level2.add.sprite(0, 0, 'sky');
    bkg.height = level2.height;
    bkg.width = level2.width;
    bkg.enableBody = true;
    bkg.physicsBodyType = Phaser.Physics.ARCADE;
    level2.physics.enable(bkg, Phaser.Physics.ARCADE);
    bkg.body.collideWorldBounds = true;
    bkg.body.checkCollision.left = true;
    bkg.body.checkCollision.right = true;
    bkg.body.immovable = true;

    //Add ground
    var ground = level2.add.sprite(0, 650, 'ground');
    ground.height = 100;
    ground.width = level2.width;
    ground.enableBody = true;
    ground.physicsBodyType = Phaser.Physics.ARCADE;
    ground.name = 'ground';
    level2.physics.enable(ground, Phaser.Physics.ARCADE);
    ground.body.collideWorldBounds = true;
    ground.body.checkCollision.up = true;
    ground.body.checkCollision.down = true;
    ground.body.immovable = true;

    //Add Hillary;
    player = level2.add.sprite(400, 570, 'hil');
    player.width = 150;
    player.height = 160;
    player.enableBody = true;
    player.name = 'player';
    player.physicsBodyType = Phaser.Physics.ARCADE;
    level2.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.checkCollision.left = true;
    player.body.checkCollision.right = true;


    //Add Emails
    emails = level2.add.group();
    emails.enableBody = true;
    emails.physicsBodyType = Phaser.Physics.ARCADE;
    // level2.body.checkCollision.down = true;

    // if (level2.body.checkCollision.down) {
    //     console.log('down 1')
    // }



    sprite2 = level2.add.sprite(350, 400, 'fireBullet', 2);
    sprite2.name = 'fireBullet';

    level2.physics.enable(sprite2, Phaser.Physics.ARCADE);
    sprite2.body.collideWorldBounds = true;
    sprite2.body.bounce.setTo(1, 1);
    sprite2.body.velocity.y = 200;



    //Add bullets
    fire = level2.add.physicsGroup();
    fire.createMultiple(32, 'fireBullet', false);
    fire.setAll('checkWorldBounds', true);
    fire.setAll('outOfBoundsKill', true);

    fire.width = 10;
    fire.height = 10;


    //WTF ???
    for (var y = 0; y < 2; y++) {
        for (var x = 0; x < 10; x++) {
            //Create falling emails
            var mail = emails.create(5 + x * 94, y * 10, 'email');
            mail.name = 'mail' + x.toString() + y.toString(); // ??
            mail.checkWorldBounds = true;
            mail.events.onOutOfBounds.add(mailOut, this);
            mail.body.velocity.y = 150 + Math.random() * 200;
        }
    }

    // level2.physics.arcade.enable(player);
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

    // mail.events.onOutOfBounds.add(fbiCollect, this);

    cursors = level2.input.keyboard.createCursorKeys();
    fireButton = level2.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}


//email doesn't take by Hillary
function mailOut(mail) {
    mail.reset(mail.x, 0);
    //Emails move Y
    mail.body.velocity.y = 100 + Math.random() * 200;
    //Emails move X
    // mail.body.velocity.x = 10 + Math.random() * 200;
    scoreEnemy += 10;
    scoreFbi.text = 'Score FBI : ' + scoreEnemy;

}
// function fbiCollect(ground, mail) {
//     console.log('in fbi collect')
//     mail.kill();
//     scoreEnemy += 10;
//     scoreFbi.text = 'Score FBI : ' + scoreEnemy;
// }


// -------------------------------------------------
// -------------------------------------------------
// -----------------    UPDATE   ----------------------
// -------------------------------------------------
// -------------------------------------------------


function update() {

    //Colistion between bullet and emails
    level2.physics.arcade.overlap(emails, fire, collectMail, null, this);
    
    level2.physics.arcade.overlap(ground, emails, fbiCollect, null, this);


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


    //  if (Math.abs(emails.body.velocity.x) < 1 && Math.abs(emails.body.velocity.y) < 1) {
    //      alert("ball stopped moving");
    // }

    //Shot's command
    if (fireButton.isDown) {
        fireBullet();
    }

    //FBI collect 
    function fbiCollect(ground, mail) {
        console.log('in fbi collect')
        mail.kill();
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


    level2.physics.arcade.collide(ground, sprite2);
    level2.physics.arcade.collide(bkg, sprite2);

}

function render() {

}
