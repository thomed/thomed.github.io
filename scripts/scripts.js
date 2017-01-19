var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var x = 0, y = 15;
var img = new ImageData(1, 1);

$(document).ready(function() {
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
    while(x < 126) {
        c.putImageData(img, x+=2, y+=1);
    }
    while(x < 250) {
        c.putImageData(img, x+=2, y-=1);
    }
}