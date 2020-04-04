import 'phaser';


export default class BootScene extends Phaser.Scene {   //creates a scene loading function between game scenes
    constructor (key) {
        super(key);
    }

    preload () {
        
        // loads in the tilemap
        this.load.tilemapTiledJSON('map1', '../src/assets/tilemaps/map1.json');
 
        // load in the map spritesheet
        this.load.spritesheet('GimpMaster', '../src/assets/images/GimpMaster.png', { frameWidth: 32, frameHeight: 32 });
        // load in the character spritesheet
        this.load.spritesheet('Bulbasaur', '../src/assets/images/Bulbasaur.png', { frameWidth: 32, frameHeight: 32 });
    }

    create () {
        this.scene.start('Game');
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNames('Bulbasaur', { start: 12, end: 14}),
            frameRate: 8,
            repeat: 0
          });
          this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNames('Bulbasaur', { start: 20, end: 18}),
            frameRate: 8,
            repeat: 0
          });
          this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNames('Bulbasaur', { start: 6, end: 8}),
            frameRate: 8,
            repeat: 0
          });
          this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNames('Bulbasaur', {start: 0, end: 2}),
            frameRate: 8,
            repeat: 0
          });
    }
};