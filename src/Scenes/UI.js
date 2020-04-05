export default class UIScene extends Phaser.Scene {
    constructor(){
      super({ key: 'UI', active: true});
    }
   
init () {
  this.berriesCollected = 0;
}
   
    create () {
        //create score text
        this.scoreText = this.add.text(12, 12, `Berries: ${this.berriesCollected}`, { fontSize: '16px', fill: '#fff', backgroundColor: '#00d'});
        // get a reference to the game scene
        this.gameScene = this.scene.get('Game');
 
        // listen for events from that scene
        this.gameScene.events.on('berryCollected', () => {
            this.berriesCollected++;
            this.scoreText.setText(`Berries: ${this.berriesCollected}`)
        });
    }
  };