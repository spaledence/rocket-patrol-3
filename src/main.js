// Dale Spence
// Rocket Patrol 3
// 6-8hrs
// Mods: Highscore: 1, 
// 4 new explosion sound effects: 3, Time Remaining Display : 3, New Title Screen: 3,
// New Enemy Spaceship: (new art, smaller, faster, worth more)5 points, 
//Timing Scoring Mechanic: (misses decrease time, hits increase time) 5 points,
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    }    
}
let game = new Phaser.Game(config)

//this.physics.world.enable(this);

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT