import 'phaser';


export default class GameScene extends Phaser.Scene {
    constructor (key) {
        super(key);
    }

    preload () {    
    }

    create () {
        //creates the tilemap
        this.createMap();
        
    }

    createMap () {
        // create the tilemap
        this.map = this.make.tilemap({ key: 'pokemaze_scene1' });
     
        // add tileset image
        this.tiles = this.map.addTilesetImage('pokemon_tileset');
    
        // create our layers
        this.backgroundLayer = this.map.createStaticLayer('Background', this.tiles, 0, 0);
        this.blockedLayer = this.map.createStaticLayer('Blocked', this.tiles, 0, 0);
        this.blockedLayer = this.map.createStaticLayer('Blocked2', this.tiles, 0, 0);
        this.blockedLayer = this.map.createStaticLayer('Blocked3', this.tiles, 0, 0);
        this.backgroundLayer = this.map.createStaticLayer('Paths', this.tiles, 0, 0);
        this.backgroundLayer = this.map.createStaticLayer('Paths2', this.tiles, 0, 0);
        this.backgroundLayer = this.map.createStaticLayer('Texture', this.tiles, 0, 0);
        this.backgroundLayer = this.map.createStaticLayer('Texture2', this.tiles, 0, 0);
    }
};

