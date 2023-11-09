// canvas and ctx refs
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// mouse cursor position
let cursorX = 0;
let cursorY = 0;

// track mouse position 
window.addEventListener("mousemove", (e)=>{
	cursorX = e.clientX;
	cursorY = e.clientY;
});

// declare particles array
let particlesArray = [];

const image = new Image();
image.src = "/images/id.png";

class Particle {
	constructor(pixel){
		
		// initial position
		this.initX = pixel.x;
		this.initY = pixel.y;

		// particle position
		this.x = -Math.random()*100;
		this.y = -Math.random()*100;

		// particle velocity
		this.vx = 0;
		this.vy = 0;

		// particle color
		this.red = pixel.red;
		this.green = pixel.green;
		this.blue = pixel.blue;
		this.alpha = pixel.alpha;

		// particle radius
		this.size = 1;

		// field sphere of influence
		//this.fieldRadius = 30;

		// distance from initial position considered back in place
		this.returnThreshold = 1;

		// Has the particle reached his location
		this.isHome = false;
	}

	move(cursorX, cursorY){

		// distance from original location
		let distanceFromLocation = this.distance(this.x, this.y, this.initX, this.initY);

		// Has the particle reached his location
		this.isHome = (distanceFromLocation < this.returnThreshold) ? true : false;

		// If particle is home stop it otherwise move homeward
		if(this.isHome){
			this.vx = 0;
			this.vy = 0;
		}else{
			let length = this.vectorLength(this.initX - this.x, this.initY - this.y);

			if(length < 9){
				this.vx = (this.initX - this.x ) / length;
				this.vy = (this.initY - this.y ) / length;
			}else{
				this.vx = 8*(this.initX - this.x ) / length;
				this.vy = 8*(this.initY - this.y ) / length;

			}
		}

		this.x += this.vx;
		this.y += this.vy;

	}

	vectorLength(x, y){
		let length = Math.sqrt(x**2 + y**2);
		return length;
	}

	draw(){
		ctx.beginPath();
		ctx.fillStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}

	distance(x1, y1, x2, y2){
		let distance = Math.sqrt((x1 - x2)**2 + (y2 - y1)**2);
		return distance;

	}

}

image.addEventListener("load", (e)=>{

	// set canvas dimensions as those of the image
	canvas.width = e.target.width/2;
	canvas.height = e.target.height/2;

	// draw the image to the canvas
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

	//get image pixel data
	let mappedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
	console.log(mappedImage);

	// clear the image
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// array of pixels [{red, gree, blue, x, y}]
	let pixels = [];

	// create the brightness map 
	for(let y = 0; y < canvas.height; y++){
		let row = [];
		for(let x = 0; x < canvas.width; x++){
			const base = (y * canvas.width + x) * 4;
			const red = mappedImage.data[base];
			const green = mappedImage.data[base + 1];
			const blue = mappedImage.data[base + 2];
			const alpha = mappedImage.data[base + 3];


			let pixel = {red, green, blue, alpha, x, y};
			row.push(pixel);
		}
		pixels.push(row);	
	}

	// create a particle for each particle
	function init(){
		for(let i = 0; i < pixels.length; i++){
			for(let j = 0; j < pixels[0].length; j++){
				if(pixels[i][j].red === 255 && pixels[i][j].blue === 255 && pixels[i][j].green === 255)
					continue;
				if(pixels[i][j].alpha == 0)
					continue;
				let pixel = pixels[i][j];
				//if(pixel.red < 50 && pixel.green < 5 && pixel.blue < 5)
				particlesArray.push(new Particle(pixel));
			}
		}
	}
	init();

	function drawOriginalImage(){
		for(let i = 0; i < particlesArray.length; i++){
			//particlesArray[i].draw()
		}
	}

	let inPosition  = 0;
	function loop(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for(let i = 0; i < particlesArray.length; i++){
			let particle = particlesArray[i];
			if(Math.random()>0.05 && !particle.isHome){
				particle.move(cursorX, cursorY);
				continue;
			}

			particle.draw();
			particle.move(cursorX, cursorY);
			inPosition++;
		}	
		if(inPosition > 0.9 * particlesArray.length)
			drawOriginalImage();
		requestAnimationFrame(loop);
	}
	loop();
});
