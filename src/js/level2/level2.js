console.log('in level 2');

var level2 = new Phaser.Game(1280, 750, Phaser.AUTO, '', {
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
    level2.load.image('hil', 'dest/img/hil.png');
    level2.load.image('email', 'dest/img/mail.png');
    level2.load.image('fireBullet', 'dest/img/fire.png');
    level2.load.image('ground', 'dest/img/ground.png');
    level2.load.image('ground2', 'dest/img/ground2.png');
    level2.load.image('fbi', 'dest/img/fbi.png');

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
var bkg;
var fireSound;
var copsSound;
var emailKilled;
var explo;
var timer = 0;
var total = 0;
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
    var ground = level2.add.sprite(0, 750, 'ground');
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
    var ground2 = level2.add.sprite(0, 500, 'ground2');
    ground2.height = 15;
    ground2.width = level2.width;
    ground2.enableBody = true;
    ground2.physicsBodyType = Phaser.Physics.ARCADE;
    ground2.name = 'ground2';
    level2.physics.enable(ground2, Phaser.Physics.ARCADE);
    ground2.body.collideWorldBounds = true;
    ground2.checkWorldBounds = true; //To test
    ground2.outOfBoundsKill = true; ////To test
    ground2.body.checkCollision.up = true;
    ground2.body.checkCollision.down = true;
    ground2.body.immovable = true;

    //Add blocks left
    var blockLeft = level2.add.sprite(0, 0, 'blockLeft');
    blockLeft.height = level2.height;
    blockLeft.width = 300;
    blockLeft.enableBody = true;
    blockLeft.physicsBodyType = Phaser.Physics.ARCADE;
    blockLeft.name = 'blockLeft';
    level2.physics.enable(blockLeft, Phaser.Physics.ARCADE);
    blockLeft.body.collideWorldBounds = true;
    blockLeft.checkWorldBounds = true; //To test
    blockLeft.outOfBoundsKill = true; ////To test
    blockLeft.body.checkCollision.up = true;
    blockLeft.body.checkCollision.down = true;
    blockLeft.body.immovable = true;
    
    //Add blocks Right
    var blockRight = level2.add.sprite(1000, 0, 'blockRight');
    blockRight.height = level2.height;
    blockRight.width = 300;
    blockRight.enableBody = true;
    blockRight.physicsBodyType = Phaser.Physics.ARCADE;
    blockRight.name = 'blockRight';
    level2.physics.enable(blockRight, Phaser.Physics.ARCADE);
    blockRight.body.collideWorldBounds = true;
    blockRight.checkWorldBounds = true; //To test
    blockRight.outOfBoundsKill = true; ////To test
    blockRight.body.checkCollision.up = true;
    blockRight.body.checkCollision.down = true;
    blockRight.body.immovable = true;

    //Add Hillary;
    player = level2.add.sprite(400, 350, 'hil');
    player.width = 130;
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
    createEmails();

    //Generate emails
    // for (var y = 0; y < 2; y++) {
    //     for (var x = 0; x < 100; x++) {

    //         var mail = emails.create(level2.world.randomX, 0, 'email');
    //         mail.width = 50;
    //         mail.height = 40;
    //         // mail.name = 'mail' + x.toString() + y.toString(); // ??
    //         mail.checkWorldBounds = true;
    //         mail.events.onOutOfBounds.add(mailOut, this);

    //         var num = Math.random() * 500 + 200; // Get a number between 200 and 500;
    //         mail.body.velocity.y = num;
    //         var num = Math.floor(Math.random() * 99) + 1; // Get a number between 1 and 99;
    //         num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // Add minus 
    //         mail.body.velocity.x = num;

    //     }
    // }


    //Add sounds
    fireSound = level2.add.audio('fireSound');
    emailKilled = level2.add.audio('emailKilled');
    copsSound = level2.add.audio('copsSound');
    explo = level2.add.audio('explo');

    level2.physics.arcade.enable(player);
    // level2.physics.arcade.enable(mail);

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
    fire.width = 5;
    fire.height = 5;


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



//Generate emails when out of the game
function mailOut(mail) {
    mail.reset(level2.world.randomX, 0);
    mail.body.velocity.y = 800;
    var num = Math.floor(Math.random() * 99) + 1; // Get a number between 1 and 99;
    num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // Add minus sign in 50% of cases
    mail.body.velocity.x = num;
}

//Generate fbi car when out of the ground
function fbiOut(fbiCar) {
    console.log('in fbi out')
    fbiCar.reset(0, 645);
}


function createEmails(mail) {
    var mail = emails.create(level2.world.randomX, 0, 'email');
    mail.width = 50;
    mail.height = 40;
    mail.checkWorldBounds = true;
    mail.events.onOutOfBounds.add(mailOut, this);
    //var numY = Math.random() */* 900*/ + 1000; // Get a number between 200 and 500;
    mail.body.velocity.y = 800;
    var numX = Math.floor(Math.random() * 99) + 1;;
    numX *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    mail.body.velocity.x = numX;
    setTimeout(createEmails, 3000);

}


//Generate fbi when Hil fires on it
function createFbi() {
    console.log('create fbi');
    var fbiCar = fbi.create(random, 645, 'fbi');
    fbiCar.width = 285;
    fbiCar.height = 100;
    fbiCar.body.velocity.x = 550 + Math.random() * 200;
    fbiCar.physicsBodyType = Phaser.Physics.ARCADE;
    level2.physics.enable(fbiCar, Phaser.Physics.ARCADE);
    fbiCar.body.collideWorldBounds = true;
    fbiCar.checkWorldBounds = true;
    fbiCar.body.bounce.setTo(1, 1);
    fbiCar.events.onOutOfBounds.add(fbiOut, this);
}





// -------------------------------------------------
// -------------------------------------------------
// -----------------    UPDATE   ----------------------
// -------------------------------------------------
// -------------------------------------------------

function update() {

    //Colistion between items
    level2.physics.arcade.overlap(emails, fire, collectMail, null, this);
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
        // copsSound.play();
        scoreEnemy += 9;
        scoreFbi.text = 'Score FBI : ' + scoreEnemy;
    }

    //Start game
    function startGame(mail) {
        if (score >= 1000) {
            emails.destroy()
        } else if (scoreEnemy >= 1000) {
            emails.destroy();
        }
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

    //Fire on FBI
    function fireOnFbi(fbiCar, fire) {
        fire.kill();
        createFbi();
        copsSound.play();
    }

    startGame();
    // level2.physics.arcade.collide(bkg, fbi);

}

function render() {

}
