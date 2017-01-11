// var game = new Phaser.Game(1680, 926, Phaser.AUTO, '', {
//         preload: preload,
//         create: create,
//         update: update
//     });

//     function preload() {
//         game.load.image('sky', 'src/img/sky.png');
//         game.load.image('platform', 'src/img/platform.png');
//         game.load.image('star', 'src/img/star.png');
//         game.load.image('sol', 'src/img/sol.png')
//         game.load.image('bg', 'src/img/Landing-Backgroundlvl1.jpg');
// // var game = new Phaser.Game(1680, 926, Phaser.AUTO, '', {
// //         preload: preload,
// //         create: create,
// //         update: update
// //     });

// //     function preload() {
// //         game.load.image('sky', 'src/img/sky.png');
// //         game.load.image('platform', 'src/img/platform.png');
// //         game.load.image('star', 'src/img/star.png');
// //         game.load.image('sol', 'src/img/sol.png')
// //         game.load.image('bg', 'src/img/background.svg');

        

// //         game.load.spritesheet('dude', 'src/img/dude.png', 32, 48); // ??????
// //     }



//     var platforms;
//     var score = 0;
//     var scoreText;
//     var cursors;

//     function create() {
//         // creation platform
//         var createPlatform = function(arg1, arg2, type) {
//                 return platforms.create(arg1, arg2, type);
//             }
//             // On rend actif Arcade Physics qui nous permet de mettre en place les règles physique
//         game.physics.startSystem(Phaser.Physics.ARCADE);
//         var bg = game.add.sprite(0, 0, 'bg');
//         game.world.setBounds(0, 0, 0, 2000);
//         // On crée le fond du monde (ici le ciel)
//         bg.height = game.height;
//         bg.width = game.width;
//         bg.scale.setTo(0.5,0.5);

// //     var platforms;
// //     var score = 0;
// //     var scoreText;

// //     function create() {
// //         // creation platform
// //         var createPlatform = function(arg1, arg2, type) {
// //                 return platforms.create(arg1, arg2, type);
// //             }
// //             // On rend actif Arcade Physics qui nous permet de mettre en place les règles physique
// //         game.physics.startSystem(Phaser.Physics.ARCADE);
// //         var bg = game.add.sprite(0, 0, 'bg');
// //         // On crée le fond du monde (ici le ciel)
// //         bg.height = game.height;
// //         bg.width = game.width;
// //         // bg.scale.setTo(10,10);

// //         test = game.add.sprite(200, 0, 'test');


// //         // Le groupe contenant les platformes se compose du sol & de 2 plateformes sur lesquells on peu sauter
// //         platforms = game.add.group();

// //         // On active la physique sur tout les éléments crées dans le jeu
// //         platforms.enableBody = true;

// //         // On crée le sol
// //         var ground = platforms.create(0, game.world.height - 64, 'sol');

// //         // On fait correspondre la taille du sol avec "l'écran"
// //         // ground.scale.setTo(1,1);

// //         // Cela donne de la consistance aux plateformes créés pour qu'elles soient "solides"
// //         ground.body.immovable = true;


//         //  On crée les 3 plateformes
//         var ledge = platforms.create(400, 400, 'platform');
//         ledge.body.immovable = true;

//         ledge = platforms.create(150, 250, 'platform');
//         ledge.body.immovable = true;

//         ledge = createPlatform(0, 500, 'platform');
//         ledge.body.immovable = true;

//         player = game.add.sprite(32, game.world.height - 850, 'dude');

//         //**************** TEST **********************//
//         game.camera.follow(player);
//         cursors = game.input.keyboard.createCursorKeys();


//         //  We need to enable physics on the player
//         game.physics.arcade.enable(player);

//         //  Player physics properties. Give the little guy a slight bounce.
//         player.body.bounce.y = 0.2; // Rebond à l'atterissage
//         player.body.gravity.y = 300; // Vitesse de chute
//         player.body.collideWorldBounds = true;

//         //  Our two animations, walking left and right.
//         player.animations.add('left', [0, 1, 2, 3], 10, true);
//         player.animations.add('right', [5, 6, 7, 8], 10, true);

//         stars = game.add.group();
//         bigStars = game.add.group();

//         bigStars.enableBody = true;
//         stars.enableBody = true;

//         //  Here we'll create 12 of them evenly spaced apart
//         /* for (var i = 0; i < 12; i++) {
//             //  Create a star inside of the 'stars' group
//             var star = stars.create(i * 70, 0, 'star');

//             //  Let gravity do its thing
//            // star.body.gravity.y = 300;

//             //  This just gives each star a slightly random bounce value
//            // star.body.bounce.y = 0.1 + Math.random(1, 67) * 0.2;
//         } */

//         var star = stars.create(150, 200, 'star');
//         var bigStar = bigStars.create(500, 150, 'star');

//         // SCORE
//         scoreText = game.add.text(16, 16, 'Score: 0', {
//             fontSize: '32px',
//             fill: '#fff',
//             background: '#000'
//         });



//     }

//     function update() {
//         //  Collide the player and the stars with the platforms
//         var hitPlatform = game.physics.arcade.collide(player, platforms);
//         var hitStar = game.physics.arcade.collide(stars, platforms);
//         var getStar = game.physics.arcade.overlap(player, stars, collectStar, null, this);
//         var getBigStar = game.physics.arcade.overlap(player, bigStars, collectBigStar, null, this);

//         function collectStar(player, star) {

//             // Removes the star from the screen
//             star.kill();
//             //  Add and update the score
//             score += 10;
//             scoreText.text = 'Score: ' + score;

//         }

//         function collectBigStar (player, bigStar) {
//             bigStar.kill();
//             score += 100;
//             scoreText.text = 'Score: ' + score;
//         }

//         cursors = game.input.keyboard.createCursorKeys();
//         //  Reset the players velocity (movement)
//         player.body.velocity.x = 0;

// //         //  On crée les 3 plateformes
// //         var ledge = platforms.create(400, 400, 'platform');
// //         ledge.body.immovable = true;

// //         ledge = platforms.create(150, 250, 'platform');
// //         ledge.body.immovable = true;

// //         ledge = createPlatform(0, 500, 'platform');
// //         ledge.body.immovable = true;

// //         player = game.add.sprite(32, game.world.height - 850, 'dude');

// //         //  We need to enable physics on the player
// //         game.physics.arcade.enable(player);

// //         //  Player physics properties. Give the little guy a slight bounce.
// //         player.body.bounce.y = 0.2; // Rebond à l'atterissage
// //         player.body.gravity.y = 300; // Vitesse de chute
// //         player.body.collideWorldBounds = true;

// //         //  Our two animations, walking left and right.
// //         player.animations.add('left', [0, 1, 2, 3], 10, true);
// //         player.animations.add('right', [5, 6, 7, 8], 10, true);

// //         stars = game.add.group();
// //         bigStars = game.add.group();

// //         bigStars.enableBody = true;
// //         stars.enableBody = true;

// //         //  Here we'll create 12 of them evenly spaced apart
// //         /* for (var i = 0; i < 12; i++) {
// //             //  Create a star inside of the 'stars' group
// //             var star = stars.create(i * 70, 0, 'star');

// //             //  Let gravity do its thing
// //            // star.body.gravity.y = 300;

// //             //  This just gives each star a slightly random bounce value
// //            // star.body.bounce.y = 0.1 + Math.random(1, 67) * 0.2;
// //         } */

// //         var star = stars.create(150, 200, 'star');
// //         var bigStar = bigStars.create(500, 150, 'star');

// //         // SCORE
// //         scoreText = game.add.text(16, 16, 'Score: 0', {
// //             fontSize: '32px',
// //             fill: '#fff',
// //             background: '#000'
// //         });


// //     }

// //     function update() {
// //         //  Collide the player and the stars with the platforms
// //         var hitPlatform = game.physics.arcade.collide(player, platforms);
// //         var hitStar = game.physics.arcade.collide(stars, platforms);
// //         var getStar = game.physics.arcade.overlap(player, stars, collectStar, null, this);
// //         var getBigStar = game.physics.arcade.overlap(player, bigStars, collectBigStar, null, this);

// //         function collectStar(player, star) {

// //             // Removes the star from the screen
// //             star.kill();
// //             //  Add and update the score
// //             score += 10;
// //             scoreText.text = 'Score: ' + score;

// //         }

// //         function collectBigStar (player, bigStar) {
// //             bigStar.kill();
// //             score += 100;
// //             scoreText.text = 'Score: ' + score;
// //         }

// //         cursors = game.input.keyboard.createCursorKeys();
// //         //  Reset the players velocity (movement)
// //         player.body.velocity.x = 0;


// //         if (cursors.left.isDown) {
// //             //  Move to the left
// //             player.body.velocity.x = -150;
// //             player.animations.play('left');
// //         } else if (cursors.right.isDown) {
// //             //  Move to the right
// //             player.body.velocity.x = 150;
// //             player.animations.play('right');
// //         } else {
// //             //  Stand still
// //             player.animations.stop();
// //             player.frame = 4;
// //         }

// //         //  Allow the player to jump if they are touching the ground.
// //         if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
// //             player.body.velocity.y = -300;
// //         }
// // 	}