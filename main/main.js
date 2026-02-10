const canvas = document.getElementById("simCanvas");
const contents = canvas.getContext("2d");

let currentLight_vertical = "green";
let currentLight_horizontal = "red";
let lastSwitchTime_vertical = Date.now();
let lastSwitchTime_horizontal = Date.now();

let car1X = 0;
let car1Y = 425;     

let car2X = 800;
let car2Y = 340;

const carWidth = 60;
const carHeight = 30;
const speed = 2;        //this is pixels per frame

const lightsDurations = {
    green: 25000,       //25 seconds
    orange: 5000,       //5 seconds
    red: 30000      //30 seconds
}

//method to update the traffic lights(change their colors)
function updateTrafficLight() {
    const now = Date.now();

    const elapsed1 = now -lastSwitchTime_horizontal;
    const elapsed2 = now -lastSwitchTime_vertical;

    if(elapsed1 >= lightsDurations[currentLight_horizontal]){
        if(currentLight_horizontal === "green"){
            currentLight_horizontal = "orange";
        } else if(currentLight_horizontal === "orange"){
            currentLight_horizontal = "red";
        }else {
            currentLight_horizontal = "green";
        }
        lastSwitchTime_horizontal = now;
    }

    if(elapsed2 >= lightsDurations[currentLight_vertical]){
        if(currentLight_vertical === "red"){
            currentLight_vertical = "green";
        } else if(currentLight_vertical === "green"){
            currentLight_vertical = "orange";
        }else {
            currentLight_vertical = "red";
        }
        lastSwitchTime_vertical = now;
    }
}

//drawing the main intersection road
function drawIntersection() {
    contents.fillStyle = "#333";
    contents.fillRect(0,325,800,150);       //horizontal road
    contents.fillRect(325,0,150,800);       //verticle road

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

    //moving car(red box for now) section
    car1X = car1X + speed;

    if(car1X > canvas.width){
        car1X = -carWidth;
    }

    contents.fillStyle = "red";
    contents.fillRect(car1X, car1Y, carWidth, carHeight);

    car2X = car2X - speed;
    if(car2X < -carWidth){
        car2X = canvas.width;
    }

    contents.fillStyle = "red";
    contents.fillRect(car2X, car2Y, carWidth, carHeight);

    requestAnimationFrame(loop);
}

// drawIntersection();
loop();