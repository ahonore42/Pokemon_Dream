
export default class Berries extends Phaser.Physics.Arcade.StaticGroup {
  constructor(world, scene, children, spriteArray) {
    super(world, scene);
    this.scene = scene;

    // add berries to our group
    spriteArray.forEach(berry => {
        berry.setOrigin(0);
        this.world.enableBody(berry, 1);
        berry.setScale(0.8);
        berry.body.setSize(berry.width*berry.scaleX, berry.height*berry.scaleY, true);
        this.add(berry);
      });
      this.refresh();
  }

  collectBerry (player, berry) {
    this.remove(berry);
    berry.destroy();
    this.scene.events.emit('berryCollected');
  }
};