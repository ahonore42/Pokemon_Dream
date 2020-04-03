import 'phaser';


export default class BootScene extends Phaser.Scene {   //creates a scene loading function between game scenes
    constructor (key) {
        super(key);
    }

    preload () {
        this.levels = {
            1: 'map1',
            2: 'map2'
        };
        
        // loads in the tilemap
        this.load.tilemapTiledJSON('map1', '../src/assets/tilemaps/map1.json');
        this.load.tilemapTiledJSON('map2', '../src/assets/tilemaps/map2.json');
        // load in the map spritesheet
        this.load.spritesheet('GimpMaster', '../src/assets/images/GimpMaster.png', { frameWidth: 32, frameHeight: 32 });
        // load in the character spritesheet
        this.load.spritesheet('Bulbasaur', '../src/assets/images/Bulbasaur.png', { frameWidth: 32, frameHeight: 32 });
        // load the portal sprite
        this.load.image('Portal', '../src/assets/images/Portal.png');

    }

    create () {
        this.scene.start('Game', {levels: 1, newGame: true, levels: this.levels });

    }
};