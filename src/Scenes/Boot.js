import 'phaser';


export default class BootScene extends Phaser.Scene {   //creates a scene loading function between game scenes
    constructor (key) {
        super(key);
    }

    preload () {
        this.levels = {
            1: 'map1',
            2: 'map2',
            3: 'dungeon'
        };
        // loads in the tilemap
        this.load.tilemapTiledJSON('map1', '../src/assets/tilemaps/map1.json');
        this.load.tilemapTiledJSON('map2', '../src/assets/tilemaps/map2.json');
        this.load.tilemapTiledJSON('dungeon', '../src/assets/tilemaps/dungeon.json');
        // load in the map spritesheet
        this.load.spritesheet('GimpMaster', '../src/assets/images/GimpMaster.png', { frameWidth: 32, frameHeight: 32 });
        // load in the character spritesheet
        this.load.spritesheet('Bulbasaur', '../src/assets/images/Bulbasaur.png', { frameWidth: 32, frameHeight: 32 });
         // load portal sprite
        this.load.image('Portal', '../src/assets/images/Portal.png');
         // load berry sprite
         this.load.image('berry', '../src/assets/images/berry.png');
         // load in the enemy spritesheet
        this.load.spritesheet('Gengar', '../src/assets/images/Gengar.png', { frameWidth: 32, frameHeight: 32 });
        // load in our bullet sprite
        this.load.image('bullet', '..src/assets/images/rzrleaf.png');
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

          this.scene.start('Game', {level: 1, newGame: true, levels: this.levels});
    }
};