export default class Player {
    constructor() {

        // SPRITE POINTERS
        this.sprite;
        this.previousSprite;

        this.snappedOn;

        // SPRITES
        this.spriteClimb;
        this.spriteClimbPunch;
        this.spriteWalk;
        this.spriteJump;

        // PLAYER STATS
        this.x = 250;
        this.y = 450;
        this.speed = .05;
        this.direction = 1;
        
        this.jumpingSpeed = .05;
        this.jumpingForce = .15;

        this.isCrashing = false;

        // BOOLEANS
        this.isPunching = false;
        this.isMoving = false;
        this.isJumping = false;
        this.isClimbing = false;
        this.hasHit = false;
    }
    isHit(direction) {
        this.isCrashing = true;
        this.jumpingForce = .7;
    }
    
    update(elapsed, keyState, gravity, screen, buildings, level) {
        if(this.isCrashing) {
            if(this.isPunching) {
                if(!this.sprite.update(elapsed)) {
                    this.isPunching = false;
                    this.sprite = this.previousSprite;
                }
            }
            this.x -= .5 * elapsed;

            // this.isCrashing = false;
            if(this.x < -20) this.x += screen.canvas.width + 40;            
            else if(this.x > screen.canvas.width + 20) this.x -= (screen.canvas.width + 40);
            this.jumpingForce -= gravity * elapsed * .5;
            this.y += this.jumpingForce;
        }
        else {
            // PUNCHING
            if(keyState.inputs["x"] && !this.isPunching) {
                this.isPunching = true;
                this.previousSprite = this.sprite;
                this.sprite = this.spriteClimbPunch;
                this.sprite.index = 0;

            } 

            else {             
            if(this.isPunching) {

                // this.isPunching = false;
                if(!this.sprite.update(elapsed, true)) {
                    this.isPunching = false;
                    this.hasHit = false;
                    this.sprite = this.previousSprite;
                }
                else if(this.isClimbing && !this.hasHit && this.sprite.index >=3) {
                    const scale = 1;
                    const steps = this.direction === 1 ? 3 : -3;
                    
                    const currentX = this.x + Math.floor(this.sprite.index) * steps;
                    const x = 
                        Math.abs(
                            (this.snappedOn.position 
                            - currentX
                            )/32)
                        ;
                    
                    const y = (450 - (this.y - 18 * scale))/32;

                    if(this.snappedOn.isHit(x, y)) {
                        this.hasHit = true;
                        console.log("HIT!!!");
                    }
                }
            }                       
                if(keyState.inputs["ArrowLeft"]) {
                    if(this.isClimbing) {
                        if(keyState.inputs["x"]) {
                            console.log("punch left");
                        }
                    }
                    else {
                        this.x -= this.speed * elapsed;
                        if(this.x < -20) this.x += screen.canvas.width + 40;
                        this.direction = 0;
                        this.isMoving = true;
                        this.isClimbing = false;
                        this.sprite = this.spriteWalk;
                        this.sprite.update(elapsed);
                    }

                }
                else if(keyState.inputs["ArrowRight"]) {

                    if(this.isClimbing) {
                        if(keyState.inputs["x"]) {
                            console.log("punch right");
                        }
                    }
                    else {
                        this.x += this.speed * elapsed;
                        if(this.x > screen.canvas.width + 20) this.x -= (screen.canvas.width + 40);
                        this.direction = 1;

                        this.isMoving = true;
                        this.isClimbing = false;
                        this.sprite = this.spriteWalk;
                        this.sprite.update(elapsed);
                    }
                }
                else this.isMoving = false;

                if(keyState.inputs[" "] && !this.isJumping) {
                    this.isJumping = true;
                    this.jumpingForce = .85;
                }

                if(keyState.inputs["ArrowUp"]) {

                    if(this.isClimbing) {
                        this.y -= this.speed * elapsed;
                        this.sprite.update(elapsed);

                    }

                    else for(let i = 0; i < buildings.length; i++) {
                        const distance1 = Math.abs(this.x - buildings[i].position);
                        const distance2 = Math.abs(this.x - (buildings[i].position + buildings[i].width * level.tileSize));
                        
                        if(distance1 <= 5)  {
                            this.snappedOn = buildings[i];
                            this.y -= this.speed * elapsed;
                            this.isClimbing = true;
                            this.sprite = this.spriteClimb;
                            this.sprite.isForward = true;
                            this.sprite.update(elapsed);
                            this.direction = 1;

                            this.x = buildings[i].position;
                            break;
                        } 
                        else if(distance2 <= 5) {
                            this.snappedOn = buildings[i];
                            this.direction = 0;
                            this.y -= this.speed * elapsed;
                            this.isClimbing = true;
                            this.sprite = this.spriteClimb;
                            this.sprite.isForward = true;
                            this.sprite.update(elapsed);

                            this.x = (buildings[i].position + buildings[i].width * level.tileSize)
                            break;
                        }

                    }
                }
                if(keyState.inputs["ArrowDown"] && this.sprite === this.spriteClimb) {
                    this.y += this.speed * elapsed;
                    this.sprite.isForward = false;
                    this.sprite.update(elapsed);
                }
            }
        }            
        if(!this.isClimbing) {
            this.jumpingForce -= gravity * elapsed;
            this.y -= this.jumpingForce * elapsed; 
            if(this.y > 450) {
                this.y = 450;
                this.isJumping = false;
                this.jumpingForce = 0;
                this.isCrashing = false;
            } 
        }
        else {
            if(this.snappedOn.isDestroyed) this.isClimbing = false;
        }
    }
    render(renderer) {
        this.sprite.render(renderer, this.x, this.y, this.direction);
    }
}