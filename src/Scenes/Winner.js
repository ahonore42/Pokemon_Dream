import 'phaser';
 
export default class WinScene extends Phaser.Scene {
  constructor () {
    super('Winner');
  }
 
  preload () {

  }
 
  create () {

    this.add.image(0, 0, 'gameWin').setOrigin(0).setDepth(0);

    // create title text
    this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 3, '[You won! Great job!]', {fontSize: '50px', fill: '#00b'});
    this.titleText.setOrigin(0.5);
    this.button = this.add.image(this.scale.width / 2, this.scale.height / 1.5, 'button1');
    this.button.setInteractive();
    
    this.buttonText = this.add.text(0,0, 'Back to the Menu', {fontSize: '32px', fill:'#000'});
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