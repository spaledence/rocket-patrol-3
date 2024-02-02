class Play extends Phaser.Scene {
    constructor() {
        super("playScene")

        this.highScore = localStorage.getItem('highScore') || 0;
    }

    
    
    create() {
        //tile sprite

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)

        //green ui background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
        
        //if(twoPlayer){
        //    this.p2Rocket = new Rocket(this, game.config.width/2 + 100, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
        //}
          // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30, false).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, false).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, false).setOrigin(0,0)

        this.ship04 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceshipMad', 0, 50, true).setOrigin(0,0).setScale(.75)

        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        //keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        //keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        //keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
    
        // initialize score
        this.p1Score = 0

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
    
        
        
        this.gameOver = false
        //60 second play clock
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)
        
    
        this.timerText = this.add.text(12, 12, 'Time: 60', 
        { fontFamily: 'Arial', fontSize: '24px', fill: '#000000' }).setOrigin(0, 0);
        

        //let highScore = 0;

        this.highScoreText = this.add.text(400, 16, 'High Score: ' + this.highScore, { fontSize: '20px', fill: '#FF0000' });



        //add physics colliders

        this.physics.add.collider(this.p1Rocket, this.ship01, this.explodeShip, null, this);
        this.physics.add.collider(this.p1Rocket, this.ship02, this.explodeShip, null, this);
        this.physics.add.collider(this.p1Rocket, this.ship03, this.explodeShip, null, this);
        this.physics.add.collider(this.p1Rocket, this.ship04, this.explodeShip, null, this);

    }

    update() {
        // check key input for restart
        
        
        if (!this.gameOver) {
            // Calculate remaining time
            const remainingTime = this.clock.delay - this.clock.getElapsed();
    
            // Convert remaining time to seconds (if needed)
            const remainingSeconds = Math.ceil(remainingTime / 1000);
    
            // Display the remaining time or do something with it
            this.timerText.setText('Time:' + remainingSeconds);

        }
        
        
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.updateHighscore(this.p1Score)
            console.log(this.highScore)
            this.scene.restart()
            
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.updateHighscore(this.p1Score)
            console.log(this.highScore)
            this.scene.start("menuScene")
          }

        this.starfield.tilePositionX -= 4
        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }

        
        // check collisions
        if(this.physics.collide(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
            this.clock.delay += 5000;
            //this.clock += 100;   

        }
        if (this.physics.collide(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)   
            this.clock.delay += 5000;
            //this.clock += 100;   



        }
        if (this.physics.collide(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)  
            this.clock.delay += 5000; 
            //this.clock += 100;   



        }

        if(this.physics.collide(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship04)   
            this.clock.delay += 5000;
            //this.clock += 300;   


        }

        if (!this.gameOver && this.p1Rocket.y <= borderUISize * 3 + borderPadding) {
            this.clock.delay -= 5000;
            this.p1Rocket.reset();
        }

     
    }

    /*
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
            return true
        } else {
            return false
        }

    }
    */
    
    

    
    shipExplode(ship) {

        const explosions = ['sfx-explosion', 'explosion2', 'explosion3',
        'explosion4', 'explosion5']
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
          ship.reset()                         // reset ship position
          ship.alpha = 1                       // make ship visible again
          boom.destroy()                       // remove explosion sprite
        })
        
        // score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score

        
        const randomNum = Math.floor(Math.random() * explosions.length)
        for (let counter = 0; counter < explosions.length; counter++){
            if(randomNum == counter){
                this.sound.play(explosions[counter])
            }
        }
        

        //for (let num = 0; num < )
        //this.sound.play('sfx-explosion')
    }

    updateHighscore(score){
        if (this.p1Score > this.highScore){
            this.highScore = this.p1Score;
            this.highScoreText.setText('High Score: ' + this.highScore);
            localStorage.setItem('highScore', this.highScore);

        }


    }
    

}
