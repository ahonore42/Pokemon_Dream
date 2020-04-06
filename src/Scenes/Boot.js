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
        this.load.spritesheet('Ghosts', '../src/assets/images/Ghosts.png', { frameWidth: 32, frameHeight: 32 });
        // load in our bullet sprite
        this.load.image('bullet', '../src/assets/images/rzrleaf.png');
        //load in music and sounds
        this.load.audio('forest', ['../src/assets/audio/EternaForest.mp3', '../src/assets/audio/EternaForest.mp3']);
        this.load.audio('attack', '../src/assets/audio/vinewhip.mp3');
        this.load.audio('cry', '../src/assets/audio/Bulbasaur.mp3');
        //Menus images
        this.load.image('button1', '../src/assets/images/pokemonbutton1.png');
        this.load.image('button2', '../src/assets/images/pokemonbutton2.png');
        this.load.image('menuBackground', '../src/assets/images/sunset.png');
        this.load.image('gameWin', '../src/assets/images/gamewin.png');
        this.load.image('gameLose', '../src/assets/images/gameover.png');


    }

    create () {
        this.scene.start('Menu');
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
       
        //this.scene.start('Game', {level: 1, newGame: true, levels: this.levels});
          //
    }
};