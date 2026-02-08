const canvas = document.getElementById("simCanvas");
const contents = canvas.getContext("2d");

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

}

drawIntersection();