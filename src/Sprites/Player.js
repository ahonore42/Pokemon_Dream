import 'phaser';


export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'Bulbasaur', 2);
        this.scene = scene;
        this.health = 5;
        this.hitDelay = false;
        //enable physics
        this.scene.physics.world.enable(this);
        
        //add bulbasaur to the pokemon world. Or scene, we can just call it a scene
        this.scene.add.existing(this);
        
    }

    

    update (cursors) {
        this.setVelocity(0) //stops the player when the keyboard isn't being pressed
        if (cursors.up.isDown) {       //check if up or down is pressed on the keyboard
            this.direction = 'up';
            this.setVelocityY(-120);
            this.anims.play('up', true)
        }
        else if(cursors.down.isDown) {
            this.direction = 'down';
            this.setVelocityY(120);
            this.anims.play('down', true)
        }
        else if (cursors.left.isDown) { //check if left or right is pressed on the keyboard
            this.direction = 'left';
            this.setVelocityX(-120);
            this.anims.play('left', true)
            
        } 
        else if (cursors.right.isDown) {
            this.direction = 'right';
            this.setVelocityX(120);
            this.anims.play('right', true)
        }
        
    }
    
    loseHealth () {
        this.health--;
        this.scene.events.emit('loseHealth', this.health);
        if (this.health === 0) {
          this.scene.gameRestart(true);
        }
    }

    enemyCollision (player, enemy) {
        if (!this.hitDelay) {
          this.loseHealth();
          this.hitDelay = true;
          this.tint = 0xff0000;
          this.scene.time.addEvent({
            delay: 1200,
            callback: () => {
              this.hitDelay = false;
              this.tint = 0xffffff;
            },
            callbackScope: this
          });
        }
      }
    }
    

