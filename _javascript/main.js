
var angle;
var scale;
var img;
var axiom;
var sentences;              // array to hold sentences
var level = 0;              // level of sentences structure to be drawn
var depth;       // max level of recursion
var offset = {"x" : 0, "y": 0};
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

//------------------------------------------------------------------
// MAIN SETUP FUNCTION
//------------------------------------------------------------------
function setup() {
  // CREATE AND ADJUST CANVAS
  // ------------------------
  var bodyWidth = select("#body").width;
  canvasSize = min(canvasSize, bodyWidth);
  var canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent('sketch-holder'); // Move the canvas so it’s inside our <div id="sketch-holder">.
  pixelDensity(3);  // increase pixel density to get decent download quality
  background(255);

  // SET KEY VARIABLES
  // -----------------
  length = canvasSize/6;
  angle = radians(25);
  scale = 0.75;

  // PREPARE AND DRAW
  // -----------------
  reload();


  // SETUP INTERACTIVITY
  // -------------------
  select("#growBtn").mouseClicked(nextLevel);         //grow, i.e. draw next sentence
  select("#shrinkBtn").mouseClicked(prevLevel);       //shrink, i.e. draw previous sentence
  select("#growAngle").mouseClicked(growAngle);       //increase angle
  select("#shrinkAngle").mouseClicked(shrinkAngle);    //decrease ange
  select("#zoomOut").mouseClicked(zoomOut);         //zoom out
  select("#zoomIn").mouseClicked(zoomIn);           //zoom in
  select("#submitButton").mouseClicked(reload);       //submit settings and redraw

  let fileInput = select("#fileInput");

}

//------------------------------------------------------------------
// FUNCTION TO RELOAD SETTINGS USED BY MODAL SETTINGS
//------------------------------------------------------------------
function reload() {
  axiom = select("#axiomInput").value();
  rules[0]["F"] = select("#ruleFInput").value();
  rules[0]["X"] = select("#ruleXInput").value();
  rules[0]["+"] = select("#rulePlusInput").value();
  rules[0]["-"] = select("#ruleMinusInput").value();
  angle = radians(select("#angleInput").value());
  generateSentences();
  generate(level);
}


//------------------------------------------------------------------
// ITERATIVELY EXPAND AXIOM INTO SENTENCES BASED ON RULES
//------------------------------------------------------------------
function generateSentences() {
  sentences = [axiom];
  var n = 0;
  var nextSentence = []; 
  while (nextSentence.length < 75000){
    nextSentence = "";
    for (var i = 0; i < sentences[n].length; i++) {
      var current = sentences[n].charAt(i);
      for (var j = 0; j < rules.length; j++) {
          nextSentence += rules[j][current];
      }
    }
    chechlength = nextSentence.length;
    sentences.push(nextSentence);
    n++;
  }
}

//------------------------------------------------------------------
// MAIN DRAWING FUNCTION, calls turtle
//------------------------------------------------------------------
function generate(level) {
  len = length * scale ** (level+1);
  turtle(level);
  depth = sentences.length - 1;
  select("#depthContainer").html(level + "/" + depth)
  makeCanvasDownloadable();
}

// SWITCH LINE / IMAGE
function createMark() {
  tint(255, 255*opacity);
  if (select("#selectImage").elt.checked) {
    image(img, 0, 0, len, len);
  } else {
    line(0, 0, 0, -len);
  }
}

//------------------------------------------------------------------
// TURTLE GRAPHICS DRAW FUNCTION
//------------------------------------------------------------------
function turtle(level) {
  background(255);
  resetMatrix();
  translate(width / 2 + offset["x"], height - offset["y"]);
  stroke(0, 100);
  for (var i = 0; i < sentences[level].length; i++) {
    var current = sentences[level].charAt(i);
    if (current == "F") {
      createMark();
      translate(0, -len);
    } else if (current == "X") {
      tint(255, 255*opacity);
      if (select("#selectImage").elt.checked) {
        image(img, 0, 0, len, len);
      } else {
        line(0, 0, 0, -len);
      }
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

//------------------------------------------------------------------
// MAKE CANVAS CONTENT DOWNLOADABLE AS .PNG
//------------------------------------------------------------------
function makeCanvasDownloadable() {
  dataURL = canvas.toDataURL("image/png");
  var downloadButton = select("#downloadButton");
  downloadButton.attribute("href", "data:application/octet-stream;" + dataURL.split("data:image/png:")[0]);
}

//------------------------------------------------------------------
// MAKE SURE IMAGE LOADING IS FINISHED BEFORE SETUP
//------------------------------------------------------------------
function preload() {
  img = loadImage("stroke.png");
}

//------------------------------------------------------------------
// CALLBACK FUNCTIONS FOR INTERFACE
//------------------------------------------------------------------
// move to the next/previous sentence
function nextLevel() {
  if (level < sentences.length-1) {
    level +=1;
    generate(level);
  }
}
function prevLevel() {
  if (level > 0) {
    level -=1;
    generate(level);
  }
}

// change angle by increment
function changeAngle(increment) {
  angle += increment;
  generate(level);
}
// argument free functions for callback
function growAngle() {
  changeAngle(+radians(1));
}
function shrinkAngle() {
  changeAngle(-radians(1));
}

// change zoom level
function changeZoom(increment) {
  scale += increment;
  select("#zoomContainer").html(round(scale,2), false);
  generate(level);
}
function zoomIn() {
  changeZoom(+0.01);
}
function zoomOut() {
  changeZoom(-.01);
}

function applyOffset(increment, dim) {
  offset[dim] += increment;
  generate(level);

}
function moveRight() {applyOffset(+len, "x")};
function moveLeft() {applyOffset(-len, "x")};
function moveUp() {applyOffset(len, "y")};
function moveDown() {applyOffset(-len, "y")};

//------------------------------------------------------------------
// KEYBOARD SHORTCUTS
//------------------------------------------------------------------
document.addEventListener('keydown', (event) => {
  var name = event.key;
  switch (name) {
    case 'y':
      prevLevel();
      break;
    case 'x':
      nextLevel();
      break;
    // angle setting handled by alpine in index.html
    case 'b':
      zoomOut();
      break;
    case 'n':
      zoomIn();
      break;
    case "w":
      moveUp();
      break;
    case "a":
      moveLeft();
      break;
    case "s":
      moveDown();
      break;
    case "d":
      moveRight();
      break;
  }
}, false);

document.addEventListener('keyup', (event) => {
  var name = event.key;
  switch (name) {
    case 'c':
      reload();
      break;
    case 'v':
      reload();
      break;
  }
}, false);

//------------------------------------------------------------------
// NAVBAR
//------------------------------------------------------------------
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

//------------------------------------------------------------------
// MODAL OVERLAYS
//------------------------------------------------------------------
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
});