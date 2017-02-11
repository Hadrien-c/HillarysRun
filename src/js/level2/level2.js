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
    var ground = level2.add.sprite(0, level2.height - 150, 'ground');
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
    player.width = 130;
    player.height = 160;
    player.enableBody = true;
    player.name = 'player';
    player.physicsBodyType = Phaser.Physics.ARCADE;
    level2.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.bounce.setTo(1, 1);


    //Add Emails
    emails = level2.add.group();
    emails.enableBody = true;
    createEmails();

    //Add blocks left
    blockLeft = level2.add.sprite(0, 0, 'blockLeft');
    blockLeft.height = level2.height;
    blockLeft.width = 300;
    blockLeft.enableBody = true;
    // blockLeft.physicsBodyType = Phaser.Physics.ARCADE;
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
    blockRight.checkWorldBounds = true; //To test

    blockRight.body.checkCollision.left = true;
    blockRight.body.checkCollision.right = true;
    blockRight.body.immovable = true;


    //Add sounds
    fireSound = level2.add.audio('fireSound');
    emailKilled = level2.add.audio('emailKilled');
    copsSound = level2.add.audio('copsSound');
    explo = level2.add.audio('explo');

    level2.physics.arcade.enable(player);

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
        fill: '#2196f3',
        background: '#000'
    });

    //Score FBI
    scoreFbi = level2.add.text(660, 16, 'FBI: 0', {
        fontSize: '32px',
        fill: '#ff0000',
        background: '#000'
    });

    cursors = level2.input.keyboard.createCursorKeys();
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
    fbiCar.reset(0, level2.height - 243);
    fbiCar.body.velocity.x = 550 + Math.random() * 700 + 300;
}


function createEmails(mail) {
    var x = Math.random() * ((level2.world -350) + 350); 
    var mail = emails.create(x, 0, 'email');
    mail.width = 50;
    mail.height = 40;
    mail.checkWorldBounds = true;
    mail.events.onOutOfBounds.add(mailOut, this);
    //var numY = Math.random() */* 900*/ + 1000; // Get a number between 200 and 500;
    mail.body.velocity.y = 800;
    var numX = Math.floor(Math.random() * 99) + 1;;
    numX *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    mail.body.velocity.x = numX;
    setTimeout(createEmails, 500);
}


//End of game 
function Win() {
    var winEl = document.getElementById('win');
    winEl.removeClass('none').addClass('active');
}
function Loose() {
    $('#loose').removeClass('none').addClass('active');
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

    //Hillary collect emails
    function collectMail(player, mail) {
        mail.kill();
        // emailKilled.play();
        score += 7;
        scorePlayer.text = 'Score: ' + score;
    }

    //Hillary's move
    if (cursors.left.isDown) {
        player.body.velocity.x = -800;
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 800;
    }

    //FBI collect 
    function fbiCollect(fbiCar, mail) {
        mail.kill();
        // copsSound.play();
        scoreEnemy += 12;
        scoreFbi.text = 'Score FBI : ' + scoreEnemy;
    }

    //Start game
    function startGame(mail) {
        if (score >= 20) {
            emails.destroy();
            player.destroy();
            fbi.destroy();
            level2.state.start('gameOver');

        } else if (scoreEnemy >= 20) {
            emails.destroy();
            player.destroy();
            fbi.destroy();
            level2.state.start('gameOver');

        }
    }

    startGame();
    level2.physics.arcade.collide(blockLeft, player);
    level2.physics.arcade.collide(blockRight, player);
    level2.physics.arcade.collide(blockLeft, emails);
    level2.physics.arcade.collide(blockRight, emails);

}


function createModals() {

    reg.modal.createModal({
        type: "modal1",
        includeBackground: true,
        modalCloseOnInput: true,
        itemsArr: [{
            type: "graphics",
            graphicColor: "0xffffff",
            graphicWidth: 300,
            graphicHeight: 300,
            graphicRadius: 40
        }, {
            type: "text",
            content: "The white behind me\nis a [Phaser.Graphic]",
            fontFamily: "Luckiest Guy",
            fontSize: 22,
            color: "0x1e1e1e",
            offsetY: -50
        }, ]
    });
};

function showModal1() {
    reg.modal.showModal("modal1");
}

function render() {
}
