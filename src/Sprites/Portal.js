import 'phaser';


export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'Portal');
        this.scene = scene;

        //enable physics
        this.scene.physics.world.enable(this);
        //add bulbasaur to the pokemon world. Or scene, we can just call it a scene
        this.scene.add.existing(this);
    }
};