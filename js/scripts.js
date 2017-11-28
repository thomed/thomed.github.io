$(function () {
    console.log("test");

    setTimeout(function () { typeThis("Thomas Walker", $("#header-name")) }, 500);
    setTimeout(function() {showContentContainer()}, 1300);
});

function typeThis(text, element) {
    var index = 0;

    var typer = setInterval(function () {
        if (index === text.length) {
            clearInterval(typer);
            //console.log("done");
        } else {
            element.append(text.charAt(index));
            index++;
        }
    }, 45);
}

function showContentContainer() {
    var height = $("#content-container").height();
    $("#content-container").css({"height" : "0px", "visibility": "visible"});
    $("#content-container").animate({"height" : height + "px"}, 400);
}
