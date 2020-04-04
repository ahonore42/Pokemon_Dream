import 'phaser';
import Player from '../Sprites/Player';

export default class GameScene extends Phaser.Scene {
    constructor (key) {
        super(key);
    }

    preload () {    
    }

    create () {
        //listen for the resize event
        this.scale.on('resize', this.resize, this);
        // listen for player input
        this.cursors = this.input.keyboard.createCursorKeys();
        //creates the tilemap
        this.createMap();
        // create pokemon
        this.createPlayer();    
        // create a portal
        //this.createPortal()  
        //add collisions
        this.addCollisions();
        //  update the camera to follow the player around the map
        this.cameras.main.startFollow(this.player);  
    }

    update () {
        this.player.update(this.cursors);
    }

    addCollisions () {      //adds collisions between the player and the map
        this.physics.add.collider(this.player, this.blockedLayer)
        this.physics.add.collider(this.player, this.map)
        this.physics.add.collider(this.player, this.blockedLayer);

    }

    createPlayer () {
        this.map.findObject('Player', (obj) => {
            console.log(obj);
            if (obj.type === 'StartingPosition') {
            this.player = new Player(this, obj.x, obj.y);
            }
        });
        
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
        
        this.backgroundLayer = this.map.createStaticLayer('Blocked2', this.tiles, 0, 0);
        // this.blockedLayer = this.map.createStaticLayer('Blocked3', this.tiles, 0, 0);
        this.backgroundLayer = this.map.createStaticLayer('Paths', this.tiles, 0, 0);
        this.backgroundLayer = this.map.createStaticLayer('Paths2', this.tiles, 0, 0);
        this.backgroundLayer = this.map.createStaticLayer('Texture', this.tiles, 0, 0);
        this.backgroundLayer = this.map.createStaticLayer('Texture2', this.tiles, 0, 0);
        this.blockedLayer.setCollisionByExclusion(-1);
    }
};

