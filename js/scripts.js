$(function () {
    setTimeout(function() {
        tada();
    }, 900);
    // setTimeout(function () { typeThis("Thomas Walker", $("#header-name"))}, 900);
    //setTimeout(function() {showContentContainer()}, 2100);
});

function tada() {
    typeThis("Thomas Walker", $("#header-name"));
    setTimeout(function() {
        showContentContainer();
    },2100);
}

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
    }, 50);
}

function showContentContainer() {
    var height = $("#content-container").height();
    $("#content-container").css({"height" : "0px", "visibility": "visible"});
    $("#content-container").animate({"height" : height + "px"}, 300, "linear");
}
