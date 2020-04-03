import 'phaser';    //allow you to use Phaser objects from Phaser.min.js

export default {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 800,
    height: 600,
    pixelArt: true,
    roundPixels: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    }
};

