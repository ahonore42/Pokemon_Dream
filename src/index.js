import Phaser from 'phaser';
import config from './config';
import MenuScene from './Scenes/Menu';
import GameScene from './Scenes/Game';
import BootScene from './Scenes/Boot';
import UIScene from './Scenes/UI';
import WinScene from './Scenes/Winner';
import LoseScene from './Scenes/Lose';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Menu', MenuScene);
    this.scene.add('Boot', BootScene);
    this.scene.add('Game', GameScene);
    this.scene.add('UI', UIScene)
    this.scene.add('Winner', WinScene)
    this.scene.add('Lose', LoseScene)
    this.scene.start('Boot');
  }
}

window.game = new Game();
window.addEventListener('resize', (event) => {
  console.log(window.innerWidth);
  game.scale.resize(window.innerWidth, window.innerHeight)
});