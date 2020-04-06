import "phaser";
import Enemy from '../Sprites/Enemy';
 
export default class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(world, scene, children, spriteArray) {
    super(world, scene, children);
    this.scene = scene;
    this.spriteFrames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
 
    // create our enemies from the sprite array
    this.createEnemies(scene, spriteArray);
  }
 
  createEnemies (scene, spriteArray) {
    spriteArray.forEach((sprite) => {
      const randNumber = Math.floor(Math.random() * this.spriteFrames.length - 1);
      // create a new enemy
      const enemy = new Enemy(scene, sprite.x, sprite.y, this.spriteFrames[randNumber]);
      // add to our group
      this.add(enemy);
      
      // destroy the sprite
      sprite.destroy();
    });
  }
};