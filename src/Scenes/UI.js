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
        //create health text
        this.healthText = this.add.text(12, 29, `Health: 3`, { fontSize: '16px', fill: '#fff', backgroundColor: '#0d0'});
        // get a reference to the game scene
        
        this.gameScene = this.scene.get('Game');
 
        // listen for events from that scene
        this.gameScene.events.on('berryCollected', () => {
            this.berriesCollected++;
            this.scoreText.setText(`Berries: ${this.berriesCollected}`)
        });

        this.gameScene.events.on('loseHealth', (health) => {
            this.healthText.setText(`Health: ${health}`)
          });
       
          this.gameScene.events.on('newGame', () => {
            this.berriesCollected = 0;
            this.scoreText.setText(`Berries: ${this.berriesCollected}`)
            this.healthText.setText(`Health: 3`)
          });
    }
  };