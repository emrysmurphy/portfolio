// Constants
const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, selectedShape, selectedColor1, selectedColor2;
let shapeSelect, colorPicker1, colorPicker2;
let isDrawing = false;
let startX, startY;

function setup() {
    createCanvas(800, 600);

    // Define default colors and shape
    b1 = color(255);
    b2 = color(0);
    selectedShape = "circle";
    selectedColor1 = color(204, 102, 0);
    selectedColor2 = color(0, 102, 153);

    // Create UI elements
    shapeSelect = createSelect();
    shapeSelect.position(10, height + 10);
    shapeSelect.option("circle");
    shapeSelect.option("square");
    shapeSelect.option("rectangle");
    shapeSelect.changed(updateShape);

    colorPicker1 = createColorPicker(selectedColor1);
    colorPicker1.position(150, height + 10);
    colorPicker1.input(updateColors);

    colorPicker2 = createColorPicker(selectedColor2);
    colorPicker2.position(300, height + 10);
    colorPicker2.input(updateColors);

    noLoop();
}

function draw() {
    background(255);

    // Apply gradient to the selected shape
    if (selectedShape === "circle") {
        drawCircleGradient(width / 2, height / 2, 200, selectedColor1, selectedColor2, Y_AXIS);
    } else if (selectedShape === "square") {
        drawSquareGradient(width / 2, height / 2, 200, selectedColor1, selectedColor2, Y_AXIS);
    } else if (selectedShape === "rectangle") {
        drawRectangleGradient(width / 2, height / 2, 300, 100, selectedColor1, selectedColor2, X_AXIS);
    }

    // Draw shape while dragging
    if (isDrawing) {
        let endX = mouseX;
        let endY = mouseY;
        if (selectedShape === "circle") {
            drawCircleGradient(startX, startY, dist(startX, startY, endX, endY) * 2, selectedColor1, selectedColor2, Y_AXIS);
        } else if (selectedShape === "square") {
            let side = max(abs(endX - startX), abs(endY - startY));
            drawSquareGradient(startX + (endX - startX) / 2, startY + (endY - startY) / 2, side, selectedColor1, selectedColor2, Y_AXIS);
        } else if (selectedShape === "rectangle") {
            let width = abs(endX - startX);
            let height = abs(endY - startY);
            drawRectangleGradient(startX + (endX - startX) / 2, startY + (endY - startY) / 2, width, height, selectedColor1, selectedColor2, X_AXIS);
        }
    }
}

function drawCircleGradient(x, y, diameter, c1, c2, axis) {
    // Draw the circle with gradient
    noFill();

    for (let r = diameter; r > 0; r--) {
        let inter = map(r, diameter, 0, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        ellipse(x, y, r, r);
    }
}

function drawSquareGradient(x, y, side, c1, c2, axis) {
    // Draw the square with gradient
    noFill();

    let halfSide = side / 2;
    for (let offset = 0; offset <= side; offset++) {
        let inter = map(offset, 0, side, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        rect(x - halfSide + offset, y - halfSide, 1, side);
    }
}

function drawRectangleGradient(x, y, width, height, c1, c2, axis) {
    // Draw the rectangle with gradient
    noFill();

    for (let i = 0; i <= width; i++) {
        let inter = map(i, 0, width, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        rect(x - width / 2 + i, y - height / 2, 1, height);
    }
}

function updateShape() {
    selectedShape = shapeSelect.value();
    redraw(); // Redraw the canvas with the selected shape and gradient
}

function updateColors() {
    selectedColor1 = colorPicker1.color();
    selectedColor2 = colorPicker2.color();
    redraw(); // Redraw the canvas with the updated colors
}

function mousePressed() {
    if (!isDrawing) {
        isDrawing = true;
        startX = mouseX;
        startY = mouseY;
    }
}

function mouseReleased() {
    isDrawing = false;
}