var ball;
var database;
var ballpos, ballsize;
var position, size;

function setup() {
    createCanvas(500, 500);
    ball = createSprite(250, 250, 10, 10);
    ball.shapeColor = "red";
    // connecting to the database
    database = firebase.database();
    // referring to the location of the value we want
    ballpos = database.ref('ball/position');
    // ballsize = database.ref('ball/size');
    // ballsize.on("value", function (data) {
    //     size = data.val();
    // });

    // reading the values from the database
    ballpos.on("value", readPosition);
}

function draw() {
    background("white");
    // console.log(size);
    if (position) {
        if (keyDown(LEFT_ARROW)) {
            writePosition(-1, 0);
        } else if (keyDown(RIGHT_ARROW)) {
            writePosition(1, 0);
        } else if (keyDown(UP_ARROW)) {
            writePosition(0, -1);
        } else if (keyDown(DOWN_ARROW)) {
            writePosition(0, +1);
        }
    }
    drawSprites();
}

function readPosition(data) {
    position = data.val();
    console.log(position);
    ball.x = position.x;
    ball.y = position.y;
}

// function showError() {
//     console.log("Error in writing to the database");
// }

function writePosition(x, y) {
    database.ref('ball/position').set({
        'x': position.x + x,
        'y': position.y + y
    });
}

// async function keyPressed() {
//     if (key == " ") {
//         await database.ref('ball/size').set({
//             "size": size += 10
//         })
//     }
// }