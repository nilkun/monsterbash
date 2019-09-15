export default class Factory {
    constructor() {
    }
    createBuilding(width, height, color, tileSize) {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        // const tileSize = tileSize;
        this.canvas.width = width * tileSize;
        this.canvas.height = height * tileSize;
        this.context.imageSmoothingEnabled = false;

        // BUILDING COLOR
        this.context.fillStyle = color;
        this.context.translate(.5, .5);
        this.context.fillRect(0, 0, width * tileSize, height * tileSize);
        // const size = 8;
        
        // TILES
        this.context.strokeStyle = "white";
        this.context.lineWidth = 1;
        // for(let y = 0; y < height; y += halfSize) {
        //     this.context.moveTo(0, y);
        //     this.context.lineTo(width, y);
        // }
        // const space = size;
        // for(let x = 0; x < width; x += space) {
        //     for(let y = 0; y < height; y += size) {
        //         this.context.moveTo(x, y);
        //         this.context.lineTo(x, y + halfSize);
        //         this.context.moveTo(x + halfSize, y + space / 2);
        //         this.context.lineTo(x + halfSize, y  + (space / 2) + halfSize);
        //     }
        // }

        // OUTLINE
        // this.context.moveTo(0, 0);
        // this.context.lineTo(0, height-1);
        // this.context.lineTo(width-1, height-1);
        // this.context.lineTo(width-1, 0);
        // this.context.stroke();

        // WINDOW
        const windowsPerRow = width;
        const margin = tileSize / 10;
        const horMargin = margin * 2.5;
        const vertMargin = margin * 3;
        const windowWidth = margin * 5;
        const windowHeight = margin * 7;
        this.context.beginPath();
        this.context.fillStyle = "grey";

        for (let x = 0; x < width; x++) {
            for(let y = 0; y < height - 1; y++) {
                this.context.rect(x * tileSize + horMargin, y * tileSize + vertMargin, windowWidth, windowHeight);  
            }
            this.context.fill();
            this.context.stroke();  
        }
        return this.canvas;

        // const windowWidth = 5;
        // const windowsPerRow = Math.floor(width / (windowWidth * 2));
        // const spacing = Math.floor((width - (windowWidth * windowsPerRow))/windowsPerRow)
        // this.context.beginPath();
        // this.context.fillStyle = "grey";
        // const windowHeight = 8;

        // for (let x = Math.floor(spacing / 2); x < width; x += windowWidth + spacing) {
        //     for(let y = windowHeight / 2; y < height - windowHeight * 2; y += 13) {
        //         this.context.rect(x, y, windowWidth, windowHeight);  
        //     }
        //     this.context.fill();
        //     this.context.stroke();  
        // }
        // return this.canvas;
    }
}