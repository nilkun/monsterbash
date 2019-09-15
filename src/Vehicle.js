export default class Vehicle {
    constructor(x = 500, id = 0) {
        this.x = x;
        this.y = 450;
        this.speed = .1;
        this.hasStopped = 0;
        this.isDying = false;
        this.height = 12;
        this.width = 23;
        this.color = id;
        this.spriteSheet;
    }
    // 23 x 12
    collision(x1, y1, w1, h1, x2, y2, w2, h2) {
        if(x1 + w1 >= x2
            && x1 <= x2 + w2
            && y1 <= y2 + h2
            && y1 + h1 >= y2
        ) return true;
        return false;
    }
    render(renderer) {
        renderer.imageSmoothingEnabled = false;
        renderer.drawImage(this.spriteSheet, this.color * this.width, 0, this.width, this.height, this.x, this.y - this.height, this.width, this.height)
    }
    update(delta, player) {
        if(this.isDying) {
            this.height -= delta;
            if (this.height < 1) return false;
        }
        if(this.hasStopped > 0) {
            this.hasStopped += delta;
            if(this.hasStopped > 500) this.hasStopped = 0;
        }
        else {
            this.x -= delta * this.speed;
            if(this.x < -30) this.x = 830;
            const collide = this.collision(player.x - 16, player.y - 32, 20, 32, this.x, this.y - this.height, this.width, this.height);
            if(collide) {
                console.log("crash")
                if(player.isJumping && player.jumpingForce <= 0) {
                    this.isDying = true;
                }
                else {
                    player.isHit(-1);
                }
            }
        }
        return true;
    }
}