import Building from "./Building.js"
import Factory from "./engine/Factory.js"
export default class Level {
    constructor() {
        this.buildings = [];
        this.factory = new Factory();
        this.tileSize = 32;
        this.damage;
    }
    addBuilding(width, height, color, x) {
        const sprite = this.factory.createBuilding(width, height, color, this.tileSize);
        this.buildings.push(new Building(width, height, x, sprite, this.damage));

    }
    demo(damage) {

        this.damage = damage;
        // furthest back
        
        // in front
        this.addBuilding(3, 5, "pink", 716);
        this.addBuilding(7, 130, "orange", 620);
        // this.addBuilding(2, 80, "blue", 100);
        // this.addBuilding(4, 180, "red", 150);
        // this.addBuilding(5, 380, "green", 400);
        // this.addBuilding(4, 220, "pink", 260);
        // this.addBuilding(3, 410, "black", 10);
        // this.addBuilding(4, 120, "purple", 700);
        // this.addBuilding(6, 230, "grey", 610);
        this.addBuilding(4, 10, "purple", 96);
        // this.addBuilding(4, 8, "orange", 32);
        this.addBuilding(4, 8, "orange", 0);
        this.addBuilding(4, 7, "grey", 164);
        this.addBuilding(3, 13, "red", 300);
        this.addBuilding(4, 11, "black", 400);
        this.addBuilding(4, 10, "blue", 500);
        this.addBuilding(2, 13, "green", 600);
    }
    update(elapsed) {
        for(let i = this.buildings.length - 1; i >= 0; i--) {
            if(this.buildings[i].isDestroyed) this.buildings[i].update(elapsed);
            if(this.buildings[i].isReadyToBeRemoved) {
                console.log("REMOVED")
                this.buildings.splice(i, 1);
            }
        }
    }
    render(renderer) {
        renderer.fillStyle = "lightblue";
        renderer.fillRect(0, 0, renderer.canvas.width, renderer.canvas.height);
        renderer.fillStyle = "#448844";
        renderer.fillRect(0, 420, renderer.canvas.width, renderer.canvas.height);
        for(let i = 0; i < this.buildings.length; i++) {
            renderer.drawImage(this.buildings[i].sprite, 0, 0, this.buildings[i].width * 32, this.buildings[i].height * 32, this.buildings[i].position, 450 - this.buildings[i].height * 32, this.buildings[i].width * 32, this.buildings[i].height * 32);

            // renderer.drawImage(this.buildings[i].sprite, this.buildings[i].position, 450 - this.buildings[i].height * 32);
        }
    }
}