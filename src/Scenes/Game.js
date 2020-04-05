import 'phaser';
import Player from '../Sprites/Player';
import Portal from '../Sprites/Portal';
import Berries from '../Groups/Berries';

export default class GameScene extends Phaser.Scene {
    constructor (key) {
        super(key);
    }

    init (data) {
        console.log(data);
        this._LEVEL = data.level;
        this._LEVELS = data.levels;
        this._NEWGAME = data.newGame;
        this.loadingLevel = false;
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
        // create berries
        this.berries = this.map.createFromObjects('Berries', 'Berry', { key: 'berry'});
        this.berriesGroup = new Berries(this.physics.world, this, [], this.berries);
        // create a portal
        this.createPortal()  
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
        this.physics.add.overlap(this.player, this.portal, this.loadNextLevel.bind(this));
        this.physics.add.overlap(this.berriesGroup, this.player, this.berriesGroup.collectBerry.bind(this.berriesGroup));

    }

    createPlayer () {
        this.map.findObject('Player', (obj) => {
            if (this._NEWGAME && this._LEVEL === 1) {
              if (obj.type === 'StartingPosition'){
                this.player = new Player(this, obj.x, obj.y);
              }
            } else {
              this.player = new Player(this, obj.x, obj.y);
            }
        });
        
    }


createPortal() {
  this.map.findObject('Portal', (obj) => {
    if (this._LEVEL === 1) {
        this.portal = new Portal(this, obj.x, obj.y);
      } else if (this._LEVEL === 2) {
        this.portal = new Portal(this, obj.x, obj.y);
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
        var currentMap = this._LEVELS !== undefined ?  this._LEVELS[this._LEVEL]: 'map1';
        console.log(this._LEVELS)
        // create the tilemap
        this.map = this.make.tilemap({ key: currentMap });
        //this.map = this.make.tilemap({ key: this._LEVELS[this._LEVEL] });
        // add tileset image
        this.tiles = this.map.addTilesetImage('GimpMaster');
    
        // create our layers
        this.backgroundLayer = this.map.createStaticLayer('Background', this.tiles, 0, 0);

        
        this.blockedLayer = this.map.createStaticLayer('Blocked', this.tiles, 0, 0);
        this.blockedLayer.setCollisionByExclusion(-1);
        this.backgroundLayer = this.map.createStaticLayer('Blocked2', this.tiles, 0, 0);
        //this.blockedLayer.setCollisionByExclusion(-1);
        this.backgroundLayer = this.map.createStaticLayer('Paths', this.tiles, 0, 0);
        this.backgroundLayer = this.map.createStaticLayer('Paths2', this.tiles, 0, 0);
        this.backgroundLayer = this.map.createStaticLayer('Texture', this.tiles, 0, 0);
        this.backgroundLayer = this.map.createStaticLayer('Texture2', this.tiles, 0, 0);
        
    }

    loadNextLevel () {
        if (!this.loadingLevel) {
            this.cameras.main.fade(700, 0, 0, 0);
            this.cameras.main.on( 'camerafadeoutcomplete', () => {
                if (this._LEVEL === 1) {
                this.scene.restart({level: 2, levels: this._LEVELS, newGame: false});
                }
                else if (this._LEVEL === 2) {
                this.scene.restart({level: 3, levels: this._LEVELS, newGame: false})
                }
                else if (this._LEVEL === 3) {
                this.scene.restart({level: 1, levels: this._LEVELS, newGame: false})
                }
            });
        this.loadingLevel = true
        }
    }
};

