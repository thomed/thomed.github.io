var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var x = 0, y = 0;
var img = new ImageData(1, 1);

$(document).ready(function() {
    $('#canvas').prop("width", $('.name-type').width());
    console.log("ready");
    // setInterval(function() {
    //     updateCanvas();
    //     renderCanvas();
    // }, 100);
    updateCanvas();
    renderCanvas();
});

function updateCanvas() {

    for(var i = 0; i < 250; i++) {
        img.data[0] = 255;
        img.data[1] = 255;
        img.data[2] = 255;
        img.data[3] = 255;
    }
}

function renderCanvas() {
    var nameTypeW = $('.name-type').width();
    while(x < nameTypeW/2) {
        c.putImageData(img, x+=2, y+=1);
    }
    while(x < nameTypeW) {
        c.putImageData(img, x+=2, y-=1);
    }
}