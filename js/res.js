var randomnumbers1 = [56, 48, 49, 45, 56, 48, 57, 45, 54, 57, 55, 54];
var randomnumbers2 = [116, 104, 111, 109, 97, 115, 101, 100, 119, 97, 108, 107, 101, 114, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109];

var sp1 = document.getElementById("talkie");
var sp2 = document.getElementById("typey");

sp1.addEventListener("click", function() {
    sp1.innerText = String.fromCharCode.apply(null, randomnumbers1);
    sp1.style = "cursor: auto";
});

sp2.addEventListener("click", function() {
    sp2.innerText = String.fromCharCode.apply(null, randomnumbers2);
    sp2.style = "cursor: auto";
});
