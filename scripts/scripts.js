var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var x = 0, y = 0;
var img = new ImageData(1, 1);
var colorValue = 255;

$(document).ready(function() {
    $('#canvas').prop("width", $('.name-type').width());
    console.log("ready");
//     setInterval(function() {
//         updateCanvas();
//         renderCanvas();
//     }, 100);
    updateCanvas();
    renderCanvas();
});

function updateCanvas() {

    img.data[0] = colorValue;
    img.data[1] = colorValue;
    img.data[2] = colorValue;
    img.data[3] = 255;
    
}

function renderCanvas() {
    //c.clearRect(0,0, canvas.width, canvas.height);
    var nameTypeW = $('.name-type').width();
    while(x < nameTypeW/2) {
        c.putImageData(img, x+=2, y+=1);
    }
    while(x < nameTypeW) {
        c.putImageData(img, x+=2, y-=1);
    }
}