const canvas = document.getElementById("simCanvas");
const contents = canvas.getContext("2d");

let currentLight_verticle = "green";
let currentLight_horizontal = "red";
let lastSwitchTime_verticle = Date.now();
let lastSwitchTime_horizontal = Date.now();

const lightsDurations = {
    green: 30000,       //30 seconds
    orange: 5000,       //5 seconds
    red: 20000      //20 seconds
}

function updateTrafficLight() {
    const now = Date.now();
    const elapsed1 = now -lastSwitchTime_horizontal;

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

    const elapsed2 = now -lastSwitchTime_verticle;

    if(elapsed2 >= lightsDurations[lastSwitchTime_verticle]){
        if(lastSwitchTime_verticle === "red"){
            lastSwitchTime_verticle = "green";
        } else if(lastSwitchTime_verticle === "green"){
            lastSwitchTime_verticle = "orange";
        }else {
            lastSwitchTime_verticle = "red";
        }
        lastSwitchTime_verticle = now;
    }
}

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
    const posX1 = 483 - boxWidth1/2;
    const posY1 = 440 +  - boxHeight1/2;

    contents.fillStyle="white";
    drawTrafficBox(483 - boxWidth1/2, 440 - boxHeight1/2, boxWidth1, boxHeight1, true, currentLight_horizontal);
    // contents.fillRect(posX1, posY1, boxWidth1, boxHeight1);

    //left road
    const posX2 = 318 - boxWidth1/2;
    const posY2 = 360 +  - boxHeight1/2;
    contents.fillStyle="white";
    drawTrafficBox(318 - boxWidth1/2, 360 - boxHeight1/2, boxWidth1, boxHeight1, true, currentLight_horizontal);
    // contents.fillRect(posX2, posY2, boxWidth1, boxHeight1);

    //top road
    const boxWidth2 = 70;
    const boxHeight2 = 15;
    const posX3 = 440 - boxWidth2/2;
    const posY3 = 315 +  - boxHeight2/2;
    contents.fillStyle= "white";
    drawTrafficBox(440 - boxWidth2/2, 315 - boxHeight2/2, boxWidth2, boxHeight2, false , currentLight_verticle);
    // contents.fillRect(posX3, posY3, boxWidth2, boxHeight2);

    //bottom road
    const posX4 = 360 - boxWidth2/2;
    const posY4 = 483 +  - boxHeight2/2;
    contents.fillStyle= "white";
    drawTrafficBox(360 - boxWidth2/2, 483 - boxHeight2/2, boxWidth2, boxHeight2, false, currentLight_verticle);
    // contents.fillRect(posX4, posY4, boxWidth2, boxHeight2);
}

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
    contents.clearRect(0, 0, canvas.width, canvas.height);

    updateTrafficLight();
    drawIntersection();

    requestAnimationFrame(loop);
}

// drawIntersection();
loop();