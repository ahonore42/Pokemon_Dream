import 'phaser';


export default class GameScene extends Phaser.Scene {
    constructor (key) {
        super(key);
    }

    preload () {    
    }

    create () {
        //listen for the resize event
        this.scale.on('resize', this.resize, this);
        //creates the tilemap
        this.createMap();
        
    }

    resize (gameSize, baseSize, displaySize, resolution) {  //enables dynamic resizing of the game window with browsers
        let width = gameSize.width;
        let height = gameSize.height;
          if (width === undefined) {
            width = this.sys.game.config.width;
          }
          if (height === undefined) {
            height = this.sys.game.config.height;
          }
          this.cameras.resize(width, height);
        }

    createMap () {
        // create the tilemap
        this.map = this.make.tilemap({ key: 'map1' });
     
        // add tileset image
        this.tiles = this.map.addTilesetImage('GimpMaster');
    
        // create our layers
        this.backgroundLayer = this.map.createStaticLayer('Background', this.tiles, 0, 0);
        this.blockedLayer = this.map.createStaticLayer('Blocked', this.tiles, 0, 0);
        this.blockedLayer = this.map.createStaticLayer('Blocked2', this.tiles, 0, 0);
        // this.blockedLayer = this.map.createStaticLayer('Blocked3', this.tiles, 0, 0);
        this.backgroundLayer = this.map.createStaticLayer('Paths', this.tiles, 0, 0);
        this.backgroundLayer = this.map.createStaticLayer('Paths2', this.tiles, 0, 0);
        this.backgroundLayer = this.map.createStaticLayer('Texture', this.tiles, 0, 0);
        this.backgroundLayer = this.map.createStaticLayer('Texture2', this.tiles, 0, 0);
    }
};

