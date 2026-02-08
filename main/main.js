const canvas = document.getElementById("simCanvas");
const contents = canvas.getContext("2d");

function drawIntersection() {
    contents.fillStyle = "#333";
    contents.fillRect(0,350,800,100);       //horizontal road
    contents.fillRect(350,0,100,800);       //verticle road
}

drawIntersection();