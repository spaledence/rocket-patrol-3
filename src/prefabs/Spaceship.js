// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, isMad) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.moveSpeed = isMad ? game.settings.madSpaceshipSpeed : game.settings.spaceshipSpeed;         // pixels per frame
        this.madSpeed = 7;
        scene.physics.add.existing(this);
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
        //if (this.Spaceship)
    }

    // position reset
    reset() {
        this.x = game.config.width;
        
    }
}