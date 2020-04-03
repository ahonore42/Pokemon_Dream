import 'phaser';


export default class BootScene extends Phaser.Scene {   //creates a scene loading function between game scenes
    constructor (key) {
        super(key);
    }

    preload () {
        
        // loads in the tilemap
        this.load.tilemapTiledJSON('map1', '../src/assets/tilemaps/map1.json');
 
        // load in the spritesheet
        this.load.spritesheet('GimpMaster', '../src/assets/images/GimpMaster.png', { frameWidth: 32, frameHeight: 32 });
    }

    create () {
        this.scene.start('Game');
        
    }
};