import 'phaser';
import Player from '../Sprites/Player';
import Portal from '../Sprites/Portal';
import Berries from '../Groups/Berries';
import Enemies from '../Groups/Enemies';
import Bullets from '../Groups/Bullets';



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
        this.events.emit('newGame');
    }

    create () {
        
        const music = this.sound.add('forest', {volume: 0.5})
        var loopMarker = {
            name: 'loop',
            start: 0,
            duration: 168,
            config: {
                loop: true
            }
        };
        music.addMarker(loopMarker);
        if(this.scene !== 'Game') {music.pause()};
        if(this._NEWGAME && this._LEVEL === 1) {music.play('loop')};
        
        this.damage = this.sound.add('cry'); 


        //listen for the resize event
        this.scale.on('resize', this.resize, this);
        // listen for player input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //creates the tilemap
        this.createMap();
        // create pokemon
        this.createPlayer();  
        // create portals
        this.createPortal()   
        // create berries
        this.berries = this.map.createFromObjects('Berries', 'Berry', { key: 'berry'});
        this.berriesGroup = new Berries(this.physics.world, this, [], this.berries);
        //create nasty ghost pokemon
        this.enemies = this.map.createFromObjects('Enemies', 'Gengar', {});
        this.enemiesGroup = new Enemies(this.physics.world, this, [], this.enemies);
        // creating the bullets
        this.bullets = new Bullets(this.physics.world, this, []);
        //add collisions
        this.addCollisions();
        //  update the camera to follow the player around the map
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2)   
       
        
        
    }

   


    update () {
        this.player.update(this.cursors);

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.bullets.fireBullet(this.player.x, this.player.y, this.player.direction);
        }
    }

    addCollisions () {      //adds collisions between the player and the map
        
        this.physics.add.collider(this.player, this.blockedLayer)
        this.physics.add.collider(this.enemiesGroup, this.blockedLayer);
        this.physics.add.overlap(this.player, this.enemiesGroup, this.player.enemyCollision.bind(this.player));
        this.physics.add.collider(this.player, this.map)
        this.physics.add.collider(this.enemiesGroup, this.map)
        this.physics.add.overlap(this.player, this.portal, this.loadNextLevel.bind(this));
        this.physics.add.overlap(this.berriesGroup, this.player, this.berriesGroup.collectBerry.bind(this.berriesGroup));
        this.physics.add.overlap(this.bullets, this.enemiesGroup, this.bullets.enemyCollision);
    }

    createPlayer () {
        this.map.findObject('Player', (obj) => {
            if (this._NEWGAME && this._LEVEL === 1) {
              if (obj.type === 'StartingPosition'){
                this.player = new Player(this, obj.x, obj.y);
              }
            } 
            else {
              this.player = new Player(this, obj.x, obj.y);
            }
          
        });
        
    }


createPortal() {
  this.map.findObject('Portal', (obj) => {
    if (this._LEVEL === 1) {
        this.portal = new Portal(this, obj.x + 600, obj.y + 1800);
      } else if (this._LEVEL === 2) {
        this.portal = new Portal(this, obj.x - 1450, obj.y + 1700);
      }
      else if (this._LEVEL === 3) {
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
        //Set boundaries of game world
        this.physics.world.bounds.width = this.map.width;
        this.physics.world.bounds.height = this.map.height;
    }

    loadNextLevel () {
        if (!this.loadingLevel) {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.cameras.main.on( 'camerafadeoutcomplete', () => {
                if (this._LEVEL === 1 ) {
                this.scene.restart({level: 2, levels: this._LEVELS, newGame: false});
                }
                else if (this._LEVEL === 2) {
                this.scene.restart({level: 3, levels: this._LEVELS, newGame: false})
                }
                else if (this._LEVEL === 3) {
                //this.scene.restart({level: 1, levels: this._LEVELS, newGame: false})
                //}
                
                this.scene.stop('Game')

                this.scene.start('Winner')}
            });
            
        this.loadingLevel = true
        }
    }
      
    gameRestart (endGame) {
         //add music
        
         if (!this.loadingLevel) {
            this.cameras.main.fade(2000, 0, 0, 0);
            this.cameras.main.on( 'camerafadeoutcomplete', () => {
                if (endGame) {
                 this.scene.stop('Game')
                 this.scene.start('Lose')
                
                 }
            });
             
        }
    }
};

