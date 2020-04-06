import 'phaser';    //allow you to use Phaser objects from Phaser.min.js

export default {
    type: Phaser.AUTO,
    //parent: "phaser-example",
    width: window.innerWidth,       //makes game window scale to browser size
    height: window.innerHeight,
    pixelArt: true,
    roundPixels: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

