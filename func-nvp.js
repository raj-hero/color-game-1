// The Variables
const whoosh= new Audio('music/whoosh.mp3');
const pass= new Audio('music/pass.mp3');
var butn=document.querySelector('.butn');
var btnEasy = document.querySelector('.easy');
var btnHard = document.querySelector('.hard');
var btnNew = document.querySelector('#newColor');
var colors = [];
var allGird = document.getElementsByClassName('girdy');
var hardRow = document.querySelector('.hardRow')
var difficulty = document.querySelector('#difficulty');
var rgby = document.querySelector('#numBar');
var textStatus = document.querySelector('.statusS');
var bg = 'backgroundColor';
var passingColor;
var topp=document.querySelector('.jumbotron');
// initilally by default hard mode
var easy = false;
textStatus.textContent = 'LET US PLAY !!'

btnHard.style[bg]="orange";
btnHard.style.color="#fafafa";
btnEasy.style.color="orange";
btnEasy.style[bg]="#fafafa";
topp.style[bg]="orange";

function randRGBVal() {
    return Math.floor(Math.random() * 256);
}

function randColor() {
    var value = 'rgb(';
    value += randRGBVal() + ', ';
    value += randRGBVal() + ', ';
    value += randRGBVal() + ')';
    return value;
}

function randIndex(ary) {
    return Math.floor(Math.random() * ary.length);
}
// after pass, to make grids visible => pass means correct
function makeVisible(ary) {
    for (var i = 0; i < ary.length; i++) {
        if (ary[i].classList.contains('invisiblity')) {
            ary[i].classList.remove('invisiblity');
        }
    }
}
// apply rgb of passing color to divs and header
function displayPass(ary) {
    makeVisible(ary);
    pass.play();
    for (var i = 0; i < ary.length; i++) {
        ary[i].style[bg] = passingColor;
    }
    // header.style[bg] = passingColor;
    topp.style[bg]=passingColor;
}
// random filling of grids
function fillColors(ary) {
    colors = [];
    makeVisible(ary);
    for (var i = 0; i < ary.length; i++) {
        var colr = randColor();
        ary[i].style[bg] = colr;
        colors.push(colr);
    }
    //random index for passed(win) color
    passingColor = colors[randIndex(colors)];
    //apply passing color rgb value to text in header
    rgby.textContent = passingColor;
    
    textStatus.textContent = "LET US PLAY!";;
}

// to check pass or fail when clicked on a grid
function guessColor(ary) {
    for (var i = 0; i < ary.length; i++) {
        ary[i].addEventListener("click", function () {
            if (this.style[bg] === passingColor) {
                textStatus.textContent = 'Correct :)';
                displayPass(ary);
                head.style[bg]=passingColor;
            } 
            else {
                //Make wrong DIV invisible until game won
                this.classList.add("invisiblity");
                whoosh.play();
                textStatus.textContent = "Try again!";
            }
        })
    }
}
newColor.addEventListener('click', function () {
    fillColors(allGird);
});

btnEasy.addEventListener('click', function () {
    if (easy === false)
        difficulty.removeChild(hardRow);
    easy = true;
    btnEasy.style[bg]="orange";
    btnEasy.style.color="#fafafa";
    btnHard.style[bg]="#fafafa";
    btnHard.style.color="orange";
    fillColors(allGird);
});

btnHard.addEventListener('click', function () {
    if (easy === true)
        difficulty.appendChild(hardRow);
    easy = false;
    btnHard.style[bg]="orange";
    btnHard.style.color="#fafafa";
    btnEasy.style[bg]="#fafafa";
    btnEasy.style.color="orange";
    fillColors(allGird);
});

// add colors initially
fillColors(allGird);
// to check pass or fail
guessColor(allGird);