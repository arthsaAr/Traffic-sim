const canvas = document.getElementById("simCanvas");
const contents = canvas.getContext("2d");

//stop line positions(hard coded)
let carStopLeftX = 300;
let carStopRightX = 500;
let carStopTopY = 297;
let carStopBottomY = 502;

let intersectionState = "verticalGreen";
let lasSwitchTime = Date.now();

let car1X = 0;
let car1Y = 425;     

let car2X = 800;
let car2Y = 340;

let car4X = 420;
let car4Y = 0;

let car3X = 350;
let car3Y = 800;

const carWidth1 = 60;
const carWidth2 = 30;
const carHeight1 = 30;
const carHeight2 = 60;
const speed = 2;        //this is pixels per frame

const lightDurations = {
    verticalGreen: 25000,
    verticalOrange: 5000,
    allRed1: 2000,
    horizontalGreen: 25000,
    horizontalOrange: 5000,
    allRed2: 2000
}

//method to update the traffic lights(change their colors)
function updateTrafficLight(){
    const now = Date.now();
    const elapsed = now - lasSwitchTime;

    if(elapsed >= lightDurations[intersectionState]){
        switch (intersectionState){
            case "verticalGreen":
                intersectionState = "verticalOrange";
                break;
            case "verticalOrange":
                intersectionState = "allRed1";
                break;
            case "allRed1":
                intersectionState = "horizontalGreen";
                break;
            case "horizontalGreen":
                intersectionState = "horizontalOrange";
                break;
            case "horizontalOrange":
                intersectionState = "allRed2";
                break;
            case "allRed2":
                intersectionState = "verticalGreen";
                break;
        }
        lasSwitchTime = now;
    }

    //setting actual colors now based on current state
    switch(intersectionState){
        case "verticalGreen":
            currentLight_horizontal = "red";
            currentLight_vertical = "green";
            break;
        case "verticalOrange":
            currentLight_horizontal = "red";
            currentLight_vertical = "orange";
            break;
        case "horizontalGreen":
            currentLight_horizontal = "green";
            currentLight_vertical = "red";
            break;
        case "horizontalOrange":
            currentLight_horizontal = "orange";
            currentLight_vertical = "red";
            break;
        case "allRed1":
        case "allRed2":
            currentLight_horizontal = "red";
            currentLight_vertical = "red";
            break;
    }
}

//drawing the main intersection road
function drawIntersection() {
    contents.fillStyle = "#333";
    contents.fillRect(0,325,800,150);       //horizontal road
    contents.fillRect(325,0,150,800);       //verticle road

    //stop line for left-horizontal road
    contents.strokeStyle = "gray";
    contents.lineWidth = 4;
    contents.setLineDash([15,0]);

    contents.beginPath();
    contents.moveTo(carStopLeftX, 325);
    contents.lineTo(carStopLeftX, 475);
    contents.stroke();

    //stop line for right-horizontal road
    contents.strokeStyle = "gray";
    contents.lineWidth = 4;
    contents.setLineDash([15,0]);

    contents.beginPath();
    contents.moveTo(carStopRightX, 325);
    contents.lineTo(carStopRightX, 475);
    contents.stroke();

    //stop line for top-vertical road
    contents.strokeStyle = "gray";
    contents.lineWidth = 4;
    contents.setLineDash([15,0]);

    contents.beginPath();
    contents.moveTo(325, carStopTopY);
    contents.lineTo(475, carStopTopY);
    contents.stroke();

    //stop line for bottom-vertical road
    contents.strokeStyle = "gray";
    contents.lineWidth = 4;
    contents.setLineDash([15,0]);

    contents.beginPath();
    contents.moveTo(325, carStopBottomY);
    contents.lineTo(475, carStopBottomY);
    contents.stroke();

    //dashed yellow lines
    contents.strokeStyle = "yellow";
    contents.lineWidth = 4;
    contents.setLineDash([20,15]); //this makes 20px dash with 15px gap

    //first verticle line
    contents.beginPath();
    contents.moveTo(400,0);
    contents.lineTo(400, 800);
    contents.stroke();

    //horizontal line
    contents.beginPath()
    contents.moveTo(0,400);
    contents.lineTo(800, 400);
    contents.stroke();

    //this is for reseting the dash
    contents.setLineDash([]);

    //traffic line drawing (right road)
    const boxWidth1 = 15;
    const boxHeight1 = 70;

    contents.fillStyle="white";
    drawTrafficBox(483 - boxWidth1/2, 440 - boxHeight1/2, boxWidth1, boxHeight1, true, currentLight_horizontal);

    //left road
    contents.fillStyle="white";
    drawTrafficBox(318 - boxWidth1/2, 360 - boxHeight1/2, boxWidth1, boxHeight1, true, currentLight_horizontal);

    //top road
    const boxWidth2 = 70;
    const boxHeight2 = 15;
    contents.fillStyle= "white";
    drawTrafficBox(440 - boxWidth2/2, 315 - boxHeight2/2, boxWidth2, boxHeight2, false , currentLight_vertical);
    
    //bottom road
    const posX4 = 360 - boxWidth2/2;
    const posY4 = 483 +  - boxHeight2/2;
    contents.fillStyle= "white";
    drawTrafficBox(360 - boxWidth2/2, 483 - boxHeight2/2, boxWidth2, boxHeight2, false, currentLight_vertical);
}

//function to draw a traffic light from the given parameters(which is hardcoded for this to match our requirements)
function drawTrafficBox(x,y,width, height, isVertical = true, active = null){
    const brightColors = {
        red: "#FF0000",
        orange: "#FF9900",
        green: "#00FF00"
    };

    const dimColors = {
        red: "#400000",
        orange: "#553300",
        green: "#004000"
    };

    const colors = ["red", "orange", "green"];

    if(isVertical){
        const eachLightHeight = height/3;
        for(let i =0; i<3; i++ ){
            let color;
            if(colors[i] === active){
                color = brightColors[colors[i]];
            }else{
                color = dimColors[colors[i]];
            }
            contents.fillStyle = color;

            contents.fillRect(x, y+i*eachLightHeight, width, eachLightHeight);
        }

    }else {
        const eachLightWidth = width/3;
        for(let i=0; i<3; i++){
            let color;
            if(colors[i] === active){
                color = brightColors[colors[i]];
            }else{
                color = dimColors[colors[i]];
            }
            contents.fillStyle = color;

            contents.fillRect(x+i*eachLightWidth, y, eachLightWidth, height);
        }
    }
}

function loop(){
    //Traffic Lights section
    contents.clearRect(0, 0, canvas.width, canvas.height);
    updateTrafficLight();
    drawIntersection();

    //moving car(red box for now) section(left to right)
    // car1X = car1X + speed;

    //making sure to follow the lights as well
    if(currentLight_horizontal == "green"){
        car1X = car1X + speed;
    }else {
        //stop before crossing the gray lane lien
        if(car1X + carWidth1 + 10 < carStopLeftX){
            car1X = car1X + speed;
        }
    }

    if(car1X > canvas.width){
        car1X = -carWidth1;
    }

    contents.fillStyle = "red";
    contents.fillRect(car1X, car1Y, carWidth1, carHeight1);

    //second car right to left
    car2X = car2X - speed;
    if(car2X < -carWidth1){
        car2X = canvas.width;
    }

    contents.fillStyle = "red";
    contents.fillRect(car2X, car2Y, carWidth1, carHeight1);

    //verticle car top to bottom
    car3Y = car3Y + speed;
    if(car3Y > canvas.height){
        car3Y = -carWidth2;
    }

    contents.fillStyle = "red";
    contents.fillRect(car3X, car3Y, carWidth2, carHeight2);


    //verticle car bottom to top
    car4Y = car4Y - speed;
    if(car4Y < -carWidth2){
        car4Y = canvas.height;
    }

    contents.fillStyle = "red";
    contents.fillRect(car4X, car4Y, carWidth2, carHeight2);

    requestAnimationFrame(loop);
}

loop();