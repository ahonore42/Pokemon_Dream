import 'phaser';


export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'Bulbasaur', 3);
        this.scene = scene;

        //enable physics
        this.scene.physics.world.enable(this);
        //add bulbasaur to the pokemon world. Or scene, we can just call it a scene
        this.scene.add.existing(this);
    }

    update (cursors) {
        this.setVelocity(0) //stops the player when the keyboard isn't being pressed
        if (cursors.up.isDown) {       //check if up or down is pressed on the keyboard
            this.setVelocityY(-150);
        }
        else if(cursors.down.isDown) {
            this.setVelocityY(150);
        }
        if (cursors.left.isDown) { //check if left or right is pressed on the keyboard
            this.setVelocityX(-150);
            
        } 
        else if (cursors.right.isDown) {
            this.setVelocityX(150);
        }
    }
};
