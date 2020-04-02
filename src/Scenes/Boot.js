import 'phaser';


export default class BootScene extends Phaser.Scene {   //creates a scene loading function between game scenes
    constructor (key) {
        super(key);
    }

    preload () {
        
        // loads in the tilemap
        this.load.tilemapTiledJSON('pokemaze_scene1', '../src/assets/tilemaps/pokemaze_scene1.json');
 
        // load in the spritesheet
        this.load.spritesheet('pokemon_tileset', '../src/assets/images/pokemon_tileset.png', { frameWidth: 32, frameHeight: 32 });
    }

    create () {
        this.scene.start('Game');
        
    }
};