class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")

    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.image('spaceshipMad', './assets/spaceshipMad.png')

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })

        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('explosion2', './assets/explosion2.wav')
        this.load.audio('explosion3', './assets/explosion3.wav')
        this.load.audio('explosion4', './assets/explosion4.wav')
        this.load.audio('explosion5', './assets/explosion5.wav')


        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
      }

    create() {
        // animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        let menuConfig = {
            fontFamily: 'Fascinate',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }


        // show menu text
        this.add.image(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 30, "spaceship")
        this.add.image(game.config.width/2 + 60, game.config.height/2 - borderUISize - borderPadding - 30, "spaceship")
        this.add.image(game.config.width/2 - 60, game.config.height/2 - borderUISize - borderPadding - 30, "spaceship")
        menuConfig.fontSize = '48px'
        this.add.text(game.config.width/2, game.config.height/2 - 150, 'ROCKET      PATROL', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#ac3b3b';
        menuConfig.color = '#FFFFFF'
        menuConfig.fontSize = '28px'
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#603cc1';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#add7f8';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 50, 'Press → for Expert', menuConfig).setOrigin(0.5);
        // define keys  
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // Novice mode
          game.settings = {
            spaceshipSpeed: 3,
            madSpaceshipSpeed: 7,
            gameTimer: 30000    
          }
          this.sound.play('sfx-select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // Expert mode
          game.settings = {
            spaceshipSpeed: 4,
            madSpaceshipSpeed: 7,
            gameTimer: 15000    
          }
          this.sound.play('sfx-select');
          this.scene.start("playScene");    
        }
        
        /*
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)){
            game.settings = {
                spaceshipSpeed: 4,
                madSpaceshipSpeed: 7,
                gameTimer: 60000,
                twoPlayer: true
            }
            this.sound.play('sfx-select');
            this.scene.start("playScene");    
        }
        */
    }

}