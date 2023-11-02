//Now add a second shape-- either a triangle or a circle, and be sure to track
//these separately.
//Create a tool that allows you to draw a line by specify a set of points.

//PUSH THE CIRCLE AND SQUARES IN THE MOUSERELEASED
//PUSH THE LINE IN THE MOUSEPRESSED

let clickX = 0
let clickY = 0

let buttonRed;
let buttonBlue;
let buttonGreen;

let currentShape;

let endX = 0
let endY = 0

let particles = []
let shapes = []

function setup() {
    createCanvas(500, 600);
    rectMode(CENTER)

    createButton('Square').position(10, 440).mousePressed(() => selectShape('square'));
    createButton('Circle').position(10, 460).mousePressed(() => selectShape('circle'));
    createButton('Line').position(10, 480).mousePressed(() => selectShape('line'));
    //I tried to add another button for the particles but I can't get it to function
    createButton('Sparkle').position(10, 500).mousePressed(() => selectShape('void'));
}

//draws the shapes
function draw() {
    background(255);
    stroke("black")
    noStroke()
    rect(20, 20, width, 40)
    text(`clickX: ${clickX.toFixed(2)}, clickY: ${clickY.toFixed(2)}`, 20, 20)
    text(`endX: ${endX.toFixed(2)}, endY: ${endY.toFixed(2)}`, 20, 40)
    //draws the shape
    for (let i = 0; i < shapes.length; i++) {
        stroke("black")
        if (shapes[i].currentShape === "square") {
            stroke("black")
            square(shapes[i].x, shapes[i].y, 2 * dist(shapes[i].x, shapes[i].y, shapes[i].ex, shapes[i].ey))

        } else if (shapes[i].currentShape === "circle") {
            circle(shapes[i].x, shapes[i].y, 2 * dist(shapes[i].x, shapes[i].y, shapes[i].ex, shapes[i].ey))
        }

        // else if (shapes[i].currentShape === "line") {
        //     for(let i = 0; i < shapes.lenght - 1; i++){
        //         stroke("black")
        //     line(shapes[i].x, shapes[i].y, shapes[i+1].ex, shapes[i+1].ey);
        // }
        for (let i = 0; i < shapes.length - 1; i++) {
            stroke("black")
            if (shapes[i].currentShape === 'line') {
                line(shapes[i].x, shapes[i].y, shapes[i + 1].x, shapes[i + 1].y);
            }
        }
        for(let i = particles.length - 1; i >= 0; i --){
            particles[i].update();
            particles[i].display();
            if(particles[i].isFinished()){
                particles.splice(i, 1);
            }
        }

    }


    //draws the shape in progress, as you are dragging
    if (mouseIsPressed && currentShape === 'square') {
        square(clickX, clickY, 2 * dist(clickX, clickY, mouseX, mouseY))
    }
    else if (mouseIsPressed && currentShape === 'circle') {
        ellipse(clickX, clickY, 2 * dist(clickX, clickY, mouseX, mouseY))
    }
    else if (mouseIsPressed && currentShape === 'line') {
        line(clickX, clickY, endX, endY);
    }
    //Also, added it in the if statement
    else if(mouseIsPressed && currentShape === 'void'){
       mousePressed(particleSystem)
    }

}

//defines where the mouse press is started
function mousePressed() {
    clickX = mouseX
    clickY = mouseY
    stroke("black")
    strokeWeight(3);
    point(clickX, clickY);
    console.log("clicked for point")
    if (currentShape === "line") {
        shapes.push({
            currentShape: currentShape,
            x: clickX,
            y: clickY,
            ex: endX,
            ey: endY
        });
    }
}

//defines where the mouse release ends
function mouseReleased() {
    endX = mouseX
    endY = mouseY
    stroke("red")
   if (currentShape == 'square' || currentShape == 'circle') {
        shapes.push({
            currentShape: currentShape,
            x: clickX,
            y: clickY,
            ex: endX,
            ey: endY
      });
        print(currentShape);
        print(shapes);
    }
}
//added a particleSystem function
function particleSystem(){
    for(let i = 0; i < 100; i++){
        let p = new Particle(mouseX, mouseY);
        particles.push(p);
    }
}

//particle Class
class Particle{
    constructor(x,y){
        this.pos = createVector(x,y)
        this.vel = p5.Vector.random2D().mult(random(5, 10));
        this.acc = createVector(0, 0.1)
        this.lifespan = 255;
        this.r = random(255);
        this.g = random(255);
        this.b = random(255);
    }

    update(){
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.lifespan -= 2;
    }
    
    display(){
        noStroke()
        fill(this.r, this.g, this.b, this.lifespan);
        ellipse(this.pos.x, this.pos.y, 10, 10)
    }

    isFinished(){
        return this.lifespan <= 0;
    }
}

//defines what shape is selected
function selectShape(shape) {
    currentShape = shape;
}

//need a function for the vector line tool -> {x:1, y;7} for(i = 1; i > lines.length; i--)