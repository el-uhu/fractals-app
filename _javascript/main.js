

// 
// Draw and L-System
// 
// based on:
// Daniel Shiffman
// Code for: https://youtu.be/E1B4UoSQMFw

// variables: A B
// axiom: A
// rules: (A → AB), (B → A)



var angle;
var scale;
var img;
var axiom = "F";
var sentences;              // array to hold sentences
var level = 0;              // level of sentences structure to be drawn
var totalDepth = 5;         // max level of recursion
var canvasSize = 760;  
var opacity = 0.5;
var length;
var dataURL;
var len;

var rules = [];
rules[0] = {
  "F": "FF+[+F-F-F]-[-F+F+F]",
  "X": "X",
  "+": "+",
  "-": "-",
  "[": "[",
  "]": "]",
}

// pre-calculate sentences 
function initiate() {
  sentences = [axiom];
  for (var n = 0; n < totalDepth; n++){
    var nextSentence = "";
    for (var i = 0; i < sentences[n].length; i++) {
      var current = sentences[n].charAt(i);
      var found = false;
      for (var j = 0; j < rules.length; j++) {
          nextSentence += rules[j][current];
        }
      }
      if (!found) {
        nextSentence += current;
      }
    sentences.push(nextSentence);
  }
  generate(level);
}



function generate(level) {
  len = length * scale ** (level+1);
  turtle(level);
  console.log("drawn: ", level)
  dataURL = canvas.toDataURL("image/png");
  var downloadButton = select("#downloadButton");
  downloadButton.attribute("href", "data:application/octet-stream;" + dataURL.split("data:image/png:")[0]);
}

function turtle(level) {
  background(255);
  resetMatrix();
  translate(width / 2, height);
  stroke(0, 100);
  for (var i = 0; i < sentences[level].length; i++) {
    var current = sentences[level].charAt(i);
    if (current == "F") {
      tint(255, 255*opacity);
      if (select("#selectImage").elt.checked) {
        image(img, 0, 0, len, len);
      } else {
        line(0, 0, 0, -len);
      }
      translate(0, -len);
    } else if (current == "X") {
      translate(0, -len);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle)
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
}

function preload() {
  img = loadImage("stroke.png");
}

function nextLevel() {
  if (level < totalDepth) {
    level +=1;
    generate(level);
    console.log("next level: ", level)
  } else {
    //   
  }
}

function prevLevel() {
  if (level > 0) {
    level -=1;
    generate(level);
    console.log("next level: ", level)
  } else {
    //   
  }
}

function changeAngle(increment) {
  angle += increment;
  generate(level);
  console.log("next level: ", level)
}
function plusAngle() {
  changeAngle(+radians(1));
}
function minusAngle() {
  changeAngle(-radians(1));
}

function changeZoom(increment) {
  scale += increment;
  generate(level);
}
function plusZoom() {
  changeZoom(+0.01);
}
function minusZoom() {
  changeZoom(-.01);
}


function reload() {
  axiom = select("#axiomInput").value();
  rules[0]["F"] = select("#ruleFInput").value();
  rules[0]["X"] = select("#ruleXInput").value();
  rules[0]["+"] = select("#rulePlusInput").value();
  rules[0]["-"] = select("#ruleMinusInput").value();
  angle = radians(select("#angleInput").value());
  initiate();
}

function setup() {
  // todo: make this somewhat responsive

  var bodyWidth = select("#body").width;
  canvasSize = min(canvasSize, bodyWidth);
  console.log(bodyWidth);
  length = canvasSize/6;
  var canvas = createCanvas(canvasSize, canvasSize);
  pixelDensity(3);

  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  angle = radians(25);
  scale = 0.75;

  background(255);
  // createP(axiom);

  initiate();

  let growBtn = select("#growBtn");
  growBtn.mouseClicked(nextLevel);

  let shrinkBtn = select("#shrinkBtn");
  shrinkBtn.mouseClicked(prevLevel);


  let growAngle = select("#growAngle");
  growAngle.mouseClicked(plusAngle);

  let shrinkAngle = select("#shrinkAngle");
  shrinkAngle.mouseClicked(minusAngle);


  let zoomOut = select("#zoomOut");
  zoomOut.mouseClicked(minusZoom);

  let zoomIn = select("#zoomIn");
  zoomIn.mouseClicked(plusZoom);

  let submitButton = select("#submitButton");
  submitButton.mouseClicked(reload);

  let fileInput = select("#fileInput");
  fileInput.changed(setImage);
}


// Navbar-stuff
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

});

// Modal stuff
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .closemodal, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});