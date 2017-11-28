
// ingredients
var numColumns = 24, numRows = 24;
var col = 1, row = 1;
var mouseDown = false, eyeDropper = false, floodFilling = false;
var color = "#00f";
var gridArr;
var cellSize = 15;
var exportScale = 1;


// html div strings
var weeDiv = "<div class='wee-div'></div>";
var rowDiv = "<div class='row grid-row'></div>";

// html div classes
var divColClass = "column-" + col, divRowClass = "row-" + row;

$(function () {
    initGrid();
    initPalette();

    // drag & draw bools
    $(document).mousedown(function () {
        mouseDown = true;
    });
    $(document).mouseup(function () {
        mouseDown = false;
    });
    
    // change color when selected
    $("#color-text").change(function () {
        color = "#" + $("#color-text").val();
    });

    // increase cell size with slider
    $("#scale-slider").slider({
        value: 15,
        min: 8,
        max: 40,
        slide: function (event, ui) {
            cellSize = ui.value;
            $(".wee-div").css({"height": cellSize + "px", "width": cellSize + "px"});
            $(".grid-row").css({"height": cellSize + "px"});
        }
    });
    
    // enable/disable grid with checkbox
    $("#grid-checkbox").change(function () {
        $("#grid-checkbox").is(":checked") ? $(".wee-div").css({"border": "solid 1px black"}) : $(".wee-div").css({"border": "none"});
    });
});

function initGrid() {
    gridArr = new Array(numColumns);
    for (gridRow = 0; gridRow < numRows; gridRow++) {
        gridArr[gridRow] = new Array(numRows);

        $("#grid-area").append(rowDiv);
        for (gridColumn = 0; gridColumn < numColumns; gridColumn++) {

            gridArr[gridRow][gridColumn] = addCell(getLastChild());
            col++;
        }
        col = 0;
        row++;
    }
    $("#dimensions").text("Dimensions: " + $(getLastChild()).children().length + "x" + $("#grid-area").children().length);
    relateCells();
}

function initPalette() {
    $("#palette").empty();
    $("#palette").append("<tr></tr>");
    addPaletteColor("black");
    addPaletteColor("grey");
    addPaletteColor("white");
    addPaletteColor("red");
    addPaletteColor("green");
    addPaletteColor("blue");
    addPaletteColor("yellow");
}

function addCurrentColorToPalette() {
    if ($("#color-text").val() !== "transparent") {
        addPaletteColor("#" + $("#color-text").val());
    }
}

function addPaletteColor(c) {
    var newPaletteCell = $("#palette").children().last().append("<td></td>").children().last();
    newPaletteCell.attr({"title": c + " - Click scroll wheel to remove"});
    newPaletteCell.css({"background-color": c});
    newPaletteCell.on("click auxclick", function (e) {
        if (e.which === 2) {
            e.preventDefault();
            newPaletteCell.remove();
        } else {
            color = parseRGBtoHex(newPaletteCell.css("background-color"));
            $("#color-text").val(color.split("#")[1].toUpperCase());
            $("#color-text").css({"background-color": color});
        }
    });
}

/**
 * Takes color in raw rgb format and returns hex with leading #
 */
function parseRGBtoHex(o) {
    var rawRGB = o.split("(")[1].split(")")[0];
    rawRGB = rawRGB.split(",");
    var hex = rawRGB.map(function (c) {
        c = parseInt(c).toString(16);
        return (c.length === 1) ? "0" + c : c;
    });

    return("#" + hex.join(""));
}

/**
 * Gathers the background-color css property from each cell in the grid and saves
 * or updates the separate values on that object.
 */
function parseColors() {
    var gridCell, rawRGB;
    numRows = $("#grid-area").children().length;
    numColumns = $("#grid-area").children().first().children().length;
    console.log(numRows + " " + numColumns);

    for (gridRow = 0; gridRow < numRows; gridRow++) {
        for (gridColumn = 0; gridColumn < numColumns; gridColumn++) {
            gridCell = gridArr[gridRow][gridColumn];
            rawRGB = gridCell.css("background-color").split(",");
            gridCell.r = rawRGB[0].trim().slice(rawRGB[0].indexOf("(") + 1, rawRGB[0].length);
            gridCell.g = rawRGB[1].trim();
            gridCell.b = rawRGB[2].trim().slice(0, rawRGB[2].indexOf(")") - 1);
            gridCell.a = rawRGB.length === 4 ? rawRGB[3] : "255";
        }
    }
}

/**
 * Generate (but don't display!) canvas.
 * Then get a data URI/URL for the canvas which can then be applied to the 
 * download link
 */
function generateCanvas() {
    parseColors();
    var canvas = document.createElement("canvas"), returnCanvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d"), returnCtx = returnCanvas.getContext("2d");
    var imgData = ctx.createImageData(numColumns, numRows);
    var colorData = imgData.data;
    canvas.width = numColumns;
    canvas.height = numRows;
    returnCanvas.width = numColumns * exportScale;
    returnCanvas.height = numColumns * exportScale;
    document.body.appendChild(returnCanvas);
    document.body.appendChild(canvas);

    for (gridRow = 0; gridRow < numRows; gridRow++) {
        for (gridColumn = 0; gridColumn < numColumns; gridColumn++) {
            var gridCell = gridArr[gridRow][gridColumn];
            colorData[0] = gridCell.r;
            colorData[1] = gridCell.g;
            colorData[2] = gridCell.b;
            colorData[3] = gridCell.a; // alpha
            ctx.putImageData(imgData, gridColumn, gridRow);
        }
    }

    returnCtx.imageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    document.body.removeChild(returnCanvas);
    document.body.removeChild(canvas);
    returnCtx.drawImage(canvas, 0, 0, canvas.width * exportScale, canvas.height * exportScale);
    return returnCanvas.toDataURL("image/png");
}

function downloadPNG(uri) {
    var link = document.createElement("a");
    link.download = "asdf.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

function setErase() {
    color = "transparent";
    $("#color-text").val("transparent");
    $("#color-text").css({"background-color": "white", "color": "black"});
}

function eyeDropping() {
    if (eyeDropper) {
        eyeDropper = false;
        $("body").css({"cursor": "default"});
        $("#eyedropper").css({"color": "white"});
    } else {
        eyeDropper = true;
        $("body").css({"cursor": "copy"});
        $("#eyedropper").css({"color": "#2effa"});
    }
}

function setFloodFill() {
    if (floodFilling) {
        floodFilling = false;
        $("#floodfill").css({"color": "white"});
    } else {
        floodFilling = true;
        $("#floodfill").css({"color": "#2effa"});
    }
}

function clearCanvas() {
    $(".wee-div").css({'background-color': 'transparent'});
    initPalette();
}

$("#download-btn").click(function () {
    downloadPNG(generateCanvas());
});

/** Helper method for readability */
function getLastChild() {
    return $("#grid-area").children().last();
}

/** Helper Method for readability */
function getLastGrandchild() {
    return $("#grid-area").children().last().children().last();
}

/**
 * Floodfill / Paintbucket operation
 */
function floodFill(cell, targetColor, replacementColor) {
    if (replacementColor === parseRGBtoHex($(cell).css("background-color")) ||
            parseRGBtoHex($(cell).css("background-color")) !== targetColor) {
        return;
    }

    $(cell).css({"background-color": replacementColor});

    if (typeof $(cell).data("left") !== "undefined") {
        floodFill($(cell).data("left"), targetColor, replacementColor);
    }
    if (typeof $(cell).data("down") !== "undefined") {
        floodFill($(cell).data("down"), targetColor, replacementColor);
    }
    if (typeof $(cell).data("up") !== "undefined") {
        floodFill($(cell).data("up"), targetColor, replacementColor);
    }
    if (typeof $(cell).data("right") !== "undefined") {
        floodFill($(cell).data("right"), targetColor, replacementColor);
    }
}

/**
 * Adds a grid cell as a child to the given parent element, should generally be 
 * a .grid-row.
 * @param parent Parent element to add grid cell to.
 * @return Returns the jquery object represent the newly created cell.
 */
function addCell(parent) {
    var newCell = parent.append(weeDiv).children().last();

    $(newCell).css({"width": cellSize + "px", "height": cellSize + "px"});
    $(".grid-row").css({"height": cellSize + "px"});
    if (!$("#grid-checkbox").is(":checked")) {
        $(newCell).css({"border": "solid 1px transparent"});
    }
    newCell.mouseover(function () {
        $(this).css({"border": "solid 2px black"});
        if (mouseDown) {
            $(this).css({'background-color': color});
        }
    });
    newCell.mouseleave(function () {
        if ($("#grid-checkbox").is(":checked")) {
            $(this).css({"border": "solid 1px black"});
        } else {
            $(this).css({"border": "solid 1px transparent"});
        }
    });
    newCell.mousedown(function () {
        if (!eyeDropper && !floodFilling) {
            $(this).css({'background-color': color});
        } else {
            if (floodFilling) {
                var replacementColor = $("#color-text").val() === "transparent" ? "transparent" : "#" + $("#color-text").val();
                floodFill(newCell, parseRGBtoHex(newCell.css("background-color")), replacementColor);
                return;
            }
            if (eyeDropper) {
                if ($(this).css("background-color") !== "transparent") {
                    color = parseRGBtoHex($(this).css("background-color"));
                    $("#color-text").val(color.split("#")[1].toUpperCase());
                    $("#color-text").css({"background-color": color});
                }
                eyeDropping();
            }
        }
    });
    $("#dimensions").text("Dimensions: " + $(getLastChild()).children().length + "x" + $("#grid-area").children().length);
    return newCell;
}

/**
 * would like to get this so it works as each cell is added to increase efficiency
 */
function relateCells() {
    $("#grid-area").children().each(function () {
        var currentRow = this;
        $(currentRow).children().each(function () {
            var columnDepth = $(currentRow).children().index($(this));
            if ($(currentRow).prev().length > 0) {
                $(this).data("up", $($(currentRow).prev().children()[columnDepth]));
            }
            if ($(currentRow).next().length > 0) {
                $(this).data("down", $($(currentRow).next().children()[columnDepth]));
            }
            if ($(this).next().length > 0) {
                $(this).data("right", $(this).next());
            }
            if ($(this).prev().length > 0) {
                $(this).data("left", $(this).prev());
            }
        });
    });
}

function addColumn() {
    for (var i = 0; i < $("#grid-area").children().length; i++) {
        var currentGridRow = $("#grid-area").children()[i];
        gridArr[i].length++;
        gridArr[i][gridArr[i].length - 1] = addCell($(currentGridRow));
    }
    relateCells();
}

function addRow() {
    $("#grid-area").append(rowDiv);
    gridArr[gridArr.length++] = new Array(numColumns);
    for (var i = 0; i < $("#grid-area").children().first().children().length; i++) {
        gridArr[gridArr.length - 1][i] = addCell(getLastChild());
    }
    relateCells();
}

function removeColumn() {
    for (var i = 0; i < $("#grid-area").children().length; i++) {
        var currentGridRow = $("#grid-area").children()[i];
        $(currentGridRow).children().last().remove();
        gridArr[i].length--;
    }
    $("#dimensions").text("Dimensions: " + $(getLastChild()).children().length + "x" + $("#grid-area").children().length);
    relateCells();
}

function removeRow() {
    getLastChild().remove();
    gridArr.length--;
    $("#dimensions").text("Dimensions: " + $(getLastChild()).children().length + "x" + $("#grid-area").children().length);
    relateCells();
}

function increaseExportScale() {
    exportScale++;
    $("#export-scale").text("Scale: " + exportScale + "x");
}

function decreaseExportScale() {
   if(exportScale > 1) {
       exportScale--;
       $("#export-scale").text("Scale: " + exportScale + "x");
   } 
}
