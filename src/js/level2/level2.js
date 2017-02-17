console.log('in level 2 - play');

var level2 = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});


function preload() {

    level2.load.baseURL = '../../';
    level2.load.crossOrigin = 'anonymous';

    level2.load.image('bkg', 'dest/img/bkg_level2.jpg');
    level2.load.image('blockLeft', 'dest/img/block_left.jpg');
    level2.load.image('blockRight', 'dest/img/block_right.png');
    level2.load.image('email', 'dest/img/mail.png');
    level2.load.image('fireBullet', 'dest/img/fire.png');
    level2.load.image('ground', 'dest/img/ground.png');
    level2.load.image('ground2', 'dest/img/ground2.png');
    level2.load.image('fbi', 'dest/img/fbi.png');

    level2.load.spritesheet('hil', 'dest/img/hil_sprite.png', 155, 170);

    // level2.load.audio('fireSound', 'sounds/fireSound2.wav');
    level2.load.audio('emailKilled', 'sounds/emailKilled.wav');
    level2.load.audio('copsSound', 'sounds/copsSound.wav');
    level2.load.audio('explo', 'sounds/explo.wav');
}


// var player;
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
var blockLeft;
var blockRight;
var bkg;
var fireSound;
var copsSound;
var emailKilled;
var explo;
var timer = 0;
var total = 0;
random = Math.random();
var player = {
  sprite: undefined,
  direction: 'right',
  doNothing: true
}



// -------------------------------------------------
// -------------------------------------------------
// -----------------    CREATE   ----------------------
// -------------------------------------------------
// -------------------------------------------------

function create() {

    level2.physics.startSystem(Phaser.Physics.ARCADE);

    //Add bkg
    var bkg = level2.add.sprite(0, 0, 'bkg');
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
    var ground = level2.add.sprite(0, level2.height - 20, 'ground');
    ground.height = 15;
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

    //Add fbi
    fbi = level2.add.group();
    fbi.enableBody = true;
    createFbi();
    
    //Add ground 2
    var ground2 = level2.add.sprite(0, level2.height - 400 , 'ground2');
    ground2.height = 15;
    ground2.width = level2.width;
    ground2.enableBody = true;
    ground2.physicsBodyType = Phaser.Physics.ARCADE;
    ground2.name = 'ground2';
    level2.physics.enable(ground2, Phaser.Physics.ARCADE);
    ground2.body.collideWorldBounds = true;
    ground2.checkWorldBounds = true; //To test
    ground2.outOfBoundsKill = true; ////To test
    ground2.body.immovable = true;


    //Add Hillary;
    player = level2.add.sprite(400, level2.height - 553, 'hil');
    // player.width = 50;
    player.enableBody = true;
    player.name = 'player';
    player.physicsBodyType = Phaser.Physics.ARCADE;
    level2.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.bounce.setTo(1, 1);
    level2.physics.arcade.enable(player);
    // player.sprite.animations.add('left');
    player.animations.add('left', [8,7,6,5,4,3,2,1,0], 10, true);

    //Add Emails
    emails = level2.add.group();
    emails.enableBody = true;
    createEmails();

    //Add blocks left
    blockLeft = level2.add.sprite(0, 0, 'blockLeft');
    blockLeft.height = level2.height;
    blockLeft.width = 300;
    blockLeft.enableBody = true;
    blockLeft.name = 'blockLeft';
    level2.physics.enable(blockLeft, Phaser.Physics.ARCADE);
    blockLeft.body.collideWorldBounds = true;
    blockLeft.checkWorldBounds = true; //To test
    blockLeft.body.checkCollision.left = true;
    blockLeft.body.checkCollision.right = true;
    blockLeft.body.immovable = true;
    
    //Add blocks Right
    blockRight = level2.add.sprite(window.innerWidth, 0, 'blockRight');
    blockRight.height = level2.height;
    blockRight.width = 300;
    blockRight.enableBody = true;
    blockRight.physicsBodyType = Phaser.Physics.ARCADE;
    blockRight.name = 'blockRight';
    level2.physics.enable(blockRight, Phaser.Physics.ARCADE);
    blockRight.body.collideWorldBounds = true;
    blockRight.body.checkCollision.left = true;
    blockRight.body.checkCollision.right = true;
    blockRight.body.immovable = true;


    //Add sounds
    fireSound = level2.add.audio('fireSound');
    emailKilled = level2.add.audio('emailKilled');
    copsSound = level2.add.audio('copsSound');
    explo = level2.add.audio('explo');


    //Add Scores
    scorePlayer = level2.add.text(360, 16, 'Score: 0', {
        fontSize: '32px',
        fill: '#2196f3',
        background: '#000'
    });

    scoreFbi = level2.add.text(660, 16, 'FBI: 0', {
        fontSize: '32px',
        fill: '#ff0000',
        background: '#000'
    });
console.log(player)
    // cursors = level2.input.keyboard.createCursorKeys();
}


    var x = level2.width 

//Generate emails when out of the game
function mailOut(mail) {
    // console.log('in mail out');
    mail.reset(level2.world.randomX  , 0);
    // console.log('in mail out :' + level2.world.randomX);
    mail.body.velocity.y = 1000;
    var num = Math.floor(Math.random() * 99) + 1; // Get a number between 1 and 99;
    num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // Add minus sign in 50% of cases
    mail.body.velocity.x = num;
}

//Generate fbi car when out of the ground
function fbiOut(fbiCar) {
    fbiCar.reset(0, level2.height - 243);
    fbiCar.body.velocity.x = 550 + Math.random() * 900 + 500;
}


function createEmails(mail) {
    // console.log('in create emails');
    var mail = emails.create(level2.world.randomX, 0, 'email');
    // console.log('IN CREATE :  ' + x )
    mail.width = 50;
    mail.checkWorldBounds = true;
    mail.events.onOutOfBounds.add(mailOut, this);
    //var numY = Math.random() */* 900*/ + 1000; // Get a number between 200 and 500;
    mail.body.velocity.y = 1000;
    var numX = Math.floor(Math.random() * 99) + 1;;
    numX *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    mail.body.velocity.x = numX;
    setTimeout(createEmails, 500);
}


//Generate fbi when Hil fires on it
function createFbi() {
    console.log('create fbi');
    var fbiCar = fbi.create(random, level2.height - 243, 'fbi');
    fbiCar.width = 285;
    fbiCar.height = 100;
    fbiCar.body.velocity.x = 550 + Math.random() * 200;
    fbiCar.physicsBodyType = Phaser.Physics.ARCADE;
    level2.physics.enable(fbiCar, Phaser.Physics.ARCADE);
    fbiCar.body.collideWorldBounds = false;
    fbiCar.checkWorldBounds = true;
    // fbiCar.body.bounce.setTo(1, 1);
    fbiCar.events.onOutOfBounds.add(fbiOut, this);
}





// -------------------------------------------------
// -------------------------------------------------
// -----------------    UPDATE   ----------------------
// -------------------------------------------------
// -------------------------------------------------

function update() {

    //Event on collision between items
    level2.physics.arcade.overlap(emails, player, collectMail, null, this);
    level2.physics.arcade.overlap(fbi, emails, fbiCollect, null, this);
    level2.physics.arcade.overlap(blockLeft, emails, mailOnWall, null, this);
    level2.physics.arcade.overlap(blockRight, emails, mailOnWall, null, this);

    //Hillary collect emails
    function collectMail(player, mail) {
        mail.kill();
        // emailKilled.play();
        score += 7;
        scorePlayer.text = 'Score: ' + score;
    }


    function mailOnWall(blockLeft, mail) {
        // console.log('in mail on wall')
        mail.kill();
        // mailOut();
    }

    cursors = level2.input.keyboard.createCursorKeys();
    player.body.velocity.x = 0;

    //Hillary's move
    if (cursors.left.isDown) {
        player.body.velocity.x = -800;
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 800;
        player.animations.play('left');
    } else {
        player.animations.stop('left');   
    }

    //FBI collect 
    function fbiCollect(fbiCar, mail) {
        mail.kill();
        // copsSound.play();
        scoreEnemy += 11;
        scoreFbi.text = 'Score FBI : ' + scoreEnemy;
    }

    //Start game
    function startGame(mail) {
        if (score >= 500) {
            emails.destroy();
            player.destroy();
            fbi.destroy();
            // level2.state.start('gameOver');

        } else if (scoreEnemy >= 500) {
            emails.destroy();
            player.destroy();
            fbi.destroy();
            // level2.state.start('gameOver');

        }
    }

    startGame();
    level2.physics.arcade.collide(blockLeft, player);
    level2.physics.arcade.collide(blockRight, player);
    level2.physics.arcade.collide(blockLeft, emails);
    level2.physics.arcade.collide(blockRight, emails);

}


function render() {
}
