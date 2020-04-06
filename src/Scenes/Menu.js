import 'phaser';
 
export default class MenuScene extends Phaser.Scene {
  constructor () {
    super('Menu');
  }
 
  preload () {

  }
 
  create () {

    this.add.image(0, -220, 'menuBackground').setOrigin(0).setDepth(0);

    // create title text
    this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 3, '[Pokemon Dream]', {fontSize: '80px', fill: '#007'});
    this.titleText.setOrigin(0.5);
    this.button = this.add.image(this.scale.width / 2, this.scale.height / 1.5, 'button1');
    this.button.setInteractive();
    
    this.buttonText = this.add.text(0,0, 'New Game', {fontSize: '32px', fill:'#000'});
    Phaser.Display.Align.In.Center(this.buttonText, this.button);    
 
    this.button.on('pointerdown', () => {
      this.scene.start('Game');
      this.scene.start('Game', {level: 1, newGame: true, levels: {1: "map1", 2: "map2", 3: "dungeon"}});
    });
 
    this.button.on('pointerover', () => {
      this.button.setTexture('button2');
    });
 
    this.button.on('pointerout', () => {
      this.button.setTexture('button1');
    });
  }

};