import 'phaser';
 
export default class LoseScene extends Phaser.Scene {
  constructor () {
    super('Lose');
  }
 
  preload () {

  }
 
  create () {

    this.add.image(0, 0, 'gameLose').setOrigin(0).setDepth(0);

    // create title text
    this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 3, '[Oh no! You died...]', {fontSize: '50px', fill: '#d00'});
    this.titleText.setOrigin(0.5);
    this.button = this.add.image(this.scale.width / 2, this.scale.height / 1.5, 'button1');
    this.button.setInteractive();
    
    this.buttonText = this.add.text(0,0, 'Try again?', {fontSize: '32px', fill:'#000'});
    Phaser.Display.Align.In.Center(this.buttonText, this.button);    
 
    this.button.on('pointerdown', () => {
      this.scene.start('Menu');
      
    });
 
    this.button.on('pointerover', () => {
      this.button.setTexture('button2');
    });
 
    this.button.on('pointerout', () => {
      this.button.setTexture('button1');
    });
  }

};