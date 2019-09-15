export default class Sprite {
    constructor(sheet) {
        this.width = 16;
        this.height = 32;
        this.index = 0;
        this.frame = 0;
        this.noOfFrames = 16;
        this.sheet = sheet;
        this.isForward = true;
        this.playbackSpeed = .02;
        this.center = 8;
    }
    init(sheet, width, height, noOfFrames) {
        this.sheet = sheet;
        this.width = width;
        this.height = height;
        this.noOfFrames = noOfFrames;
        this.center = this.width / 2;
    }
    scale(scalar) {
        const context = this.sheet.getContext("2d");
        
    }
    update(elapsed, debug = false) {

        if(this.isForward) {
            this.index += elapsed * this.playbackSpeed;
            if(debug) {
                // console.log(
                //     this.width, this.height, this.index
                // )
            }
            if(Math.floor(this.index) >= this.noOfFrames) {
                this.index -= this.noOfFrames;    
                return false;
            }
        }
        else {
            this.index -= elapsed * this.playbackSpeed;
            if(this.index < 0) {
                this.index += this.noOfFrames; 
                return false;
            }
        }
        return true;

    }
    demo(renderer) {
        renderer.drawImage(this.sheet, Math.floor(this.index) * this.width, 0, this.width, this.height,  308, 110, this.width, this.height);
    }
    render(renderer, x, y, direction) {
        renderer.drawImage(this.sheet, Math.floor(this.index) * this.width, this.height * direction, this.width, this.height,  x - this.center, y, this.width, -this.height);
    }
}