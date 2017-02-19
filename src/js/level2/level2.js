console.log('in level 2 - play');

var level2 = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
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
    // level2.load.image('hil', 'dest/img/hil.png', 250, 280);

    level2.load.spritesheet('hil', 'dest/img/sprite-Level2.png', 373, 265, 8);

    // level2.load.audio('fireSound', 'sounds/fireSound2.wav'); 
    level2.load.audio('emailKilled', 'sounds/emailKilled.wav');
    level2.load.audio('copsSound', 'sounds/copsSound.wav');
    level2.load.audio('explo', 'sounds/explo.wav');
}


var player;
var fire;
var cursors;
var space;
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
var timer;
var total = 0;
var counter = 5;
var text;
random = Math.random();



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
    var ground2 = level2.add.sprite(0, level2.height - 300, 'ground2');
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
    player = level2.add.sprite(380, level2.height - 430, 'hil', 1);
    player.frame = 0;
    player.enableBody = true;
    player.scale.setTo(0.5);
    player.physicsBodyType = Phaser.Physics.ARCADE;
    level2.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    level2.physics.arcade.enable(player);
    // player.animations.add('left', [0,1,2,3,4,5,6,7,8], 5, true);
    player.animations.add("left");



    //Add Emails
    emails = level2.add.group();
    emails.enableBody = true;
    // createEmails();

    //Add blocks left
    blockLeft = level2.add.sprite(0, 0, 'blockLeft');
    blockLeft.height = level2.height;
    blockLeft.width = 400;
    blockLeft.enableBody = true;
    blockLeft.name = 'blockLeft';
    level2.physics.enable(blockLeft, Phaser.Physics.ARCADE);
    blockLeft.body.collideWorldBounds = true;
    blockLeft.checkWorldBounds = true; //To test
    blockLeft.body.checkCollision.left = true;
    blockLeft.body.checkCollision.right = true;
    blockLeft.body.immovable = true;

    // //Add blocks Right
    blockRight = level2.add.sprite(window.innerWidth, 0, 'blockRight');
    blockRight.height = level2.height;
    blockRight.width = 400;
    blockRight.enableBody = true;
    blockRight.physicsBodyType = Phaser.Physics.ARCADE;
    blockRight.name = 'blockRight';
    level2.physics.enable(blockRight, Phaser.Physics.ARCADE);
    blockRight.body.collideWorldBounds = true;
    blockRight.body.checkCollision.left = true;
    blockRight.body.checkCollision.right = true;
    blockRight.body.immovable = true;


    // Add container for score and timer
    // content = new Phaser.Rectangle(0, 0, level2.width, 40);

    // var graphics = level2.add.graphics(100, 100);
    // graphics.beginFill(0xff0000);
    // graphics.drawRect(-100, -100, level2.width, 30);


    //Add sounds
    fireSound = level2.add.audio('fireSound');
    emailKilled = level2.add.audio('emailKilled');
    copsSound = level2.add.audio('copsSound');
    explo = level2.add.audio('explo');


    //Add Scores
    scorePlayer = level2.add.text(level2.world.centerX - 400, 16, 'Score: 0', {
        fontSize: '32px',
        fill: '#2196f3',
        background: '#000'
    });

    scoreFbi = level2.add.text(level2.world.centerX + 300, 16, 'FBI: 0', {
        fontSize: '32px',
        fill: '#ff0000',
        background: '#000'
    });


    //Timer
    text = level2.add.text(level2.world.centerX, 20, 'Timer : 5', {
        fontSize: "30px",
        fill: "#000000",
        align: "center"
    });
    text.anchor.setTo(0.5, 0.5);
    level2.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);



    cursors = level2.input.keyboard.createCursorKeys();
}



function killThemAll() {
    level2.lockRender = true;
}

function updateCounter() {
    
    counter--;
    text.setText('Timer: ' + counter);

    if (counter == 0) {
        counter = 0;
        text.destroy();
        // endOfTimer();
    }

}

function endOfTimer() {
    level2.lockRender = true;

    // if (score > scoreEnemy) {
    //     window.location.href = "https://localhost:3000/end.html";
    // } else {
    //     window.location.href = "https://localhost:3000/end.html";
    // }
}


//Create emails
function createEmails(mail) {
    var mail = emails.create(level2.world.randomX, 0, 'email');
    mail.width = 50;
    mail.checkWorldBounds = true;
    mail.events.onOutOfBounds.add(mailOut, this);
    //var numY = Math.random() */* 900*/ + 1000; // Get a number between 200 and 500;
    mail.body.velocity.y = 1000;
    var numX = Math.floor(Math.random() * 99) + 1;;
    numX *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    mail.body.velocity.x = numX;
    setTimeout(createEmails, 200);
}


//Generate emails when out of the game
function mailOut(mail) {
    // console.log('in mail out :' + level2.world.randomX);
    mail.reset(level2.world.randomX, 0);
    mail.body.velocity.y = 900;
    var num = Math.floor(Math.random() * 99) + 1; // Get a number between 1 and 99;
    num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // Add minus sign in 50% of cases
    mail.body.velocity.x = num;
}

//Create FBI
function createFbi() {
    var fbiCar = fbi.create(random, level2.height - 115, 'fbi');
    fbiCar.width = 285;
    fbiCar.height = 100;
    fbiCar.body.velocity.x = 550 + Math.random() * 200;
    level2.physics.enable(fbiCar, Phaser.Physics.ARCADE);
    fbiCar.body.collideWorldBounds = false;
    fbiCar.checkWorldBounds = true;
    // fbiCar.body.bounce.setTo(1, 1);
    fbiCar.events.onOutOfBounds.add(fbiOut, this);
    setTimeout(createFbi, 15000);
}

//Generate fbi car when out of the ground
function fbiOut(fbiCar) {
    fbiCar.kill();
    fbiCar.reset(0, level2.height - 115);
    fbiCar.body.velocity.x = 550 + Math.random() * 900 + 500;
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
        mail.kill();
        // mailOut();
    }

    cursors = level2.input.keyboard.createCursorKeys();
    // player.body.velocity.x = 0;

    //Hillary's move
    if (cursors.left.isDown) {
        player.body.velocity.x = -800;
        player.animations.play('left', 5, true);

    } else if (cursors.right.isDown) {
        player.body.velocity.x = 800;
        player.animations.play('left', 5, true);

    } else {
        // player.animations.stop('left');
        // player.frame = 0;
    }

    //FBI collect 
    function fbiCollect(fbiCar, mail) {
        mail.kill();
        // copsSound.play();
        scoreEnemy += 14;
        scoreFbi.text = 'Score FBI : ' + scoreEnemy;
    }

    // startGame();
    level2.physics.arcade.collide(blockLeft, player);
    level2.physics.arcade.collide(blockRight, player);
    level2.physics.arcade.collide(blockLeft, emails);
    level2.physics.arcade.collide(blockRight, emails);

}


function render() {}
