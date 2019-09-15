import Screen from "./engine/Screen.js";
import AssetManager from "./engine/AssetsManager.js";
import KeyStates from "./engine/KeyStates.js";
import Sprite from "./engine/Sprite.js"
import Player from "./Player.js"
import Vehicle from "./Vehicle.js"
import Level from "./Level.js"

const screen = new Screen();
const assetManager = new AssetManager();
const renderer = screen.context;

assetManager.addImg("../resources/monster.png");
assetManager.addImg("../resources/car.png")
assetManager.addImg("../resources/brickBuilding.png");
assetManager.addImg("../resources/road.png");
assetManager.addImg("../resources/monsterClimb.png");
assetManager.addImg("../resources/climbingPunch.png");
assetManager.addImg("../resources/damage.png");
assetManager.addImg("../resources/monsterJump.png");


const getReverse = (image, spriteWidth, spriteHeight) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height * 2;
    context.drawImage(image, 0, 0);
    let y = image.height;
    let index = 0;
    context.scale(-1, 1);
    while(index < image.width) {        
        context.drawImage(image, index, 0, spriteWidth, spriteHeight, -index, y, spriteWidth *-1, spriteHeight);
        index += spriteWidth;
    }
    return canvas;
}

// Create level class
const background = {
    render() {
        for(let i = 0; i < 25; i++)
        renderer.drawImage(assetManager.images[3], i * 32, 450 - 3);
    }
}

let lastTime = 0;
let delta = 0;

const gravity = .006;
const player = new Player();

// Event listener keystates, and background factory
const keyState = new KeyStates();
const sprite = new Sprite(assetManager.images[0]);
const climbSprite = new Sprite();
const climbPunch = new Sprite();
const damage = new Sprite();

// Buildings are constructed in order of vicinity
let vehicles = [];
vehicles.push(new Vehicle(500, Math.floor(Math.random() *5)));
// vehicles.push(new Vehicle(350, Math.floor(Math.random() * 5)));
// vehicles.push(new Vehicle(100, Math.floor(Math.random() * 5)));

const level = new Level();
// STUFF THAT NEEDS TO BE RUN AFTER THE IMAGES HAVE BEEN LOADED
const init = () => {
    sprite.sheet = getReverse(assetManager.images[0], 16, 32);
    climbSprite.init(getReverse(assetManager.images[4], 19, 32), 19, 32, 16);
    climbPunch.init(getReverse(assetManager.images[5], 25, 32), 25, 32, 7);
    damage.sheet = assetManager.images[6];

    level.demo(damage);
    player.sprite = sprite;
    player.spriteWalk =sprite;
    player.spriteClimb =climbSprite;
    player.spriteClimbPunch = climbPunch;
    climbPunch.playbackSpeed = 0.02;
    for(let i = 0; i < vehicles.length; i++) vehicles[i].spriteSheet = assetManager.images[1];
    requestAnimationFrame(loop);
}

// GAME LOOP
const loop = elapsed => {
    delta = elapsed - lastTime;
    lastTime = elapsed;
    player.update(delta, keyState, gravity, screen, level.buildings, level);
    level.update(delta);
    for(let i = vehicles.length - 1; i >= 0; i--) {
        if(!vehicles[i].update(delta, player)) vehicles.splice(i, 1);
    }
    screen.clear();

    level.render(renderer);
    background.render();
    player.render(renderer);

    for(let i = 0; i < vehicles.length; i++) vehicles[i].render(renderer);
    // damage.demo(renderer);
    requestAnimationFrame(loop);
}

// EVENT LISTENERS
window.addEventListener("keydown", e => keyState.inputOn(e));
window.addEventListener("keyup", e => keyState.inputOff(e));

// START
assetManager.initialize(init);