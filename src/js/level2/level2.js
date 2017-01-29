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
    level2.load.image('hil', 'dest/img/hil.png');
    level2.load.image('email', 'dest/img/yahoo.png');
    level2.load.image('fireBullet', 'dest/img/fire.png');
    level2.load.image('ground', 'dest/img/ground.png');
    level2.load.image('fbi', 'dest/img/cops.png');

    level2.load.audio('fireSound', 'sounds/fireSound2.wav');
    level2.load.audio('emailKilled', 'sounds/emailKilled.wav');
    level2.load.audio('copsSound', 'sounds/copsSound.wav');
    level2.load.audio('explo', 'sounds/explo.wav');


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
var fireSound;
var copsSound;
var emailKilled;
var explo;


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
    ground.checkWorldBounds = true; //To test
    ground.outOfBoundsKill = true; ////To test
    ground.body.checkCollision.up = true;
    ground.body.checkCollision.down = true;
    ground.body.immovable = true;

    //Add Hillary;
    player = level2.add.sprite(400, 570, 'hil');
    player.width = 130;
    player.height = 160;
    player.enableBody = true;
    player.name = 'player';
    player.physicsBodyType = Phaser.Physics.ARCADE;
    level2.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.checkCollision.left = true;
    player.body.checkCollision.right = true;

    //Add fbi
    fbi = level2.add.group();
    fbi.enableBody = true;

    random = Math.random();
    var fbiCar = fbi.create(random, 500, 'fbi');

    fbiCar.width = 90;
    fbiCar.height = 60;

    fbiCar.body.velocity.x = 550 + Math.random() * 200;

    fbiCar.physicsBodyType = Phaser.Physics.ARCADE;
    // fbiCar.body.checkCollision.right = true;
    level2.physics.enable(fbiCar, Phaser.Physics.ARCADE);
    fbiCar.body.collideWorldBounds = true;
    fbiCar.body.bounce.setTo(1, 1);


    //Add Emails
    emails = level2.add.group();
    emails.enableBody = true;

    var xpos = Math.floor(Math.random()*99) + 1; // Get a number between 1 and 99;
    xpos *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // Add minus sign in 50% of cases

    // for (var y = 0; y < 2; y++) {
        for (var x = 0; x < 100; x++) {
            //Create falling emails
            var mail = emails.create(5 + x * 10, 0 /*y * 10*/, 'email');

            mail.width = 50;
            mail.height = 40;

            // mail.name = 'mail' + x.toString() + y.toString(); // ??

            mail.checkWorldBounds = true;
            mail.events.onOutOfBounds.add(mailOut, this);
            mail.body.velocity.y = 200 + Math.random() * 200;

        }
    // }

    //Add sounds
    fireSound = level2.add.audio('fireSound');
    emailKilled = level2.add.audio('emailKilled');
    copsSound = level2.add.audio('copsSound');
    explo = level2.add.audio('explo');

    level2.physics.arcade.enable(player);
    level2.physics.arcade.enable(mail);

    // sprite2 = level2.add.sprite(350, 400, 'fireBullet', 2);
    // sprite2.name = 'fireBullet';
    // level2.physics.enable(sprite2, Phaser.Physics.ARCADE);
    // sprite2.body.collideWorldBounds = true;
    // sprite2.body.bounce.setTo(1, 1);
    // sprite2.body.velocity.y = 200;



    //Add bullets
    fire = level2.add.physicsGroup();
    fire.createMultiple(32, 'fireBullet', false);
    fire.setAll('checkWorldBounds', true);
    fire.setAll('outOfBoundsKill', true);
    fire.width = 10;
    fire.height = 10;


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

function createEmails(mail) {
    var mail = emails.create(5 + x * 10, 0 /*y * 10*/, 'email');
}

//Generate emails

function mailOut(mail) {
    mail.reset(mail.x, 0);

    //Emails move Y
    mail.body.velocity.y = 100 + Math.random() * 200;
    //Emails move X
    var num = Math.floor(Math.random()*99) + 1; 
    num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; 
    mail.body.velocity.x = num;
}


// -------------------------------------------------
// -------------------------------------------------
// -----------------    UPDATE   ----------------------
// -------------------------------------------------
// -------------------------------------------------


function update() {

    //Colistion between bullet and emails
    level2.physics.arcade.overlap(emails, fire, collectMail, null, this);
    //Collision between emails and ground
    level2.physics.arcade.overlap(fbi, emails, fbiCollect, null, this);
    level2.physics.arcade.overlap(fbi, fire, fireOnFbi, null, this);


    //Hillary collect emails
    function collectMail(fire, mail) {
        mail.kill();
        fire.kill();
        emailKilled.play();
        score += 11;
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
        fireSound.play();

    }

    //FBI collect 
    function fbiCollect(fbiCar, mail) {
        mail.kill();
        copsSound.play();
        scoreEnemy += 9;
        scoreFbi.text = 'Score FBI : ' + scoreEnemy;
    }

    //Hillary's shot
    function fireBullet() {
        if (level2.time.time > bulletTime) {
            bullet = fire.getFirstExists(false);
            if (bullet) {
                bullet.reset(player.x + 56, player.y - 52);
                bullet.body.velocity.y = -900;
                bulletTime = level2.time.time + 70;
            }
        }
    }

    function fireOnFbi (fbiCar, fire) {
        fire.kill();
        explo.play();
        var xvelo = Math.floor(Math.random()*99) + 1; 
        // xvelo *= Math.floor(Math.random()) ;
        
        fbiCar.body.velocity.x = 10 + xvelo * 20 
    }

    function gameOver() {
        if (scoreEnemy = 100) {
            console.log('in gme over')
            emails.kill();
        }
    }



    // level2.physics.arcade.collide(bkg, sprite2);
    level2.physics.arcade.collide(bkg, fbi);

}

function render() {

}
