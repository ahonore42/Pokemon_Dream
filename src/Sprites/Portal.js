import 'phaser';


export default class Portal extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'Portal');
        this.scene = scene;

        //enable physics
        this.scene.physics.world.enable(this);
        
        // add portal to the scene
        this.scene.add.existing(this);
        
    }
}