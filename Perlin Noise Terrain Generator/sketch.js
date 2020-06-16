//Declaring variables
var cols, rows;
var scl = 20;
var w = 1800;
var h = 1000;
var r1,g1,b1,a1;
var flying = 0;
var terrain = [];
var r,g,b,a = 0;

//Setup function which creates the canvas
function setup() {
  createCanvas(800, 500, WEBGL);
  cols = w / scl;
  rows = h / scl;
  frameRate(20);
  
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

//Draw function which actually draws the randomly generated terrain
function draw() {
  flying -= 0.01;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -20, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(0);
  rotateX(PI / 3.25);
  //If the mouse is pressed, it randomly changes the colour of the terrain
  if (mouseIsPressed){
    //Random colour generation
    var r = random(255);
    var g = random(100,200);
    var b = random(100);
    var a = random(200,255); 
    frameRate(2);
  } else{
    var r = 255;
    var g = 200;
    var b = 20;
    var a = 200;
    frameRate(15);
  }
  
  fill(r,g,b,a);
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}
