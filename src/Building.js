export default class Building {
    constructor(width, height, x, sprite, damage) {
        this.width = width;
        this.height = height;
        this.position = x;
        this.isDestroyed = false;
        this.damage = 0;
        this.blocks = new Array(this.width);
        this.sprite = sprite;
        this.damageSprite = damage;
        this.isReadyToBeRemoved = false;
        // this.end = 0;

        for(let i = 0; i < this.width; i++) {
            this.blocks[i] = new Array(this.height).fill(false);
        }        
    }
    renderDamage(x, y) {
        const context = this.sprite.getContext("2d");
        context.drawImage(this.damageSprite.sheet, 32 * x - 8, (this.height * 32 - (32 * y)-8));

    }
    update(elapsed) {
        this.height -= elapsed * .005;
        if(this.height <= 0) this.isReadyToBeRemoved = true;
    }
    isHit(x, y) {

        this.renderDamage(x, y);
        const yM = Math.floor(y);
        const xM = Math.floor(x);

        if(!this.blocks[xM][yM]) {
            this.blocks[xM][yM] = true;
            console.log("ouch");
            this.damage++;
            if(this.damage > 2) this.isDestroyed = true;
            // if(this.damage > this.height / 2 + 1) this.isDestroyed = true;
            return true;
        }
        return false;
    } 
}