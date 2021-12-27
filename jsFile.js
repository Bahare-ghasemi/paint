var selected = false;
var canvas1 = document.getElementById("canvas1");
var context = canvas1.getContext("2d");
//condition that mouse clicked or not
var drawing = false;

//size
var size = document.getElementById("pen-size");
context.widthPen = size.value;
var posX0, posY0, posX, posY;

var pen = document.getElementById("pen");
var del = document.getElementById("del");
var reset = document.getElementById("reset-btn");
var uploadFromURL = document.getElementById("btn-uploadImage-url");
var uploadFromWEB = document.getElementById("btn-uploadImage-uri");
var drawCircle = document.getElementById("drawCircle");
var colors = document.getElementById("colorTab");
var line = document.getElementById("line");
var mostatil = document.getElementById("mostatil");
var write = document.getElementById("write");
var writeInput = document.getElementById("writeInput");
var writeFont = document.getElementById("writeFont");
var writeSize = document.getElementById("writeSize");
var download = document.getElementById("download");
var colors = document.getElementById("colorTab");

function getpositions(canvas1, e) {
  var rects = canvas1.getBoundingClientRect();
  return {
    x: parseInt(e.clientX - rects.left),
    y: parseInt(e.clientY - rects.top),
  };
}

function penDown(e) {
  drawing = true;
  var positions = getpositions(canvas1, e);
  posX = positions.x;
  posY = positions.y;
  context.beginPath();
  context.moveTo(posX, posY);
  context.lineTo(posX, posY);
  context.widthPen = size.value;
  context.stroke();
}

function brushDown(canvas1, posx, posy) {
  if (drawing) {
    canvas1.style.cursor = "pointer";
    context.lineTo(posx, posy);
    context.stroke();
  }
}

function penMoved(e) {
  var positions = getpositions(canvas1, e);
  posX = positions.x;
  posY = positions.y;
  brushDown(canvas1, posX, posY);
}
function penUp(e) {
  drawing = false;
}
function cancelpen(e) {
  canvas1.style.cursor = "auto";
}

//draw circle
function circleStartPoint(e) {
  var positions = getpositions(canvas1, e);
  if (drawing == false) {
    canvas1.style.cursor = "move";
    posX0 = positions.x;
    posY0 = positions.y;
    drawing = true;
  } else if (drawing) {
    posX = positions.x;
    posY = positions.y;
    context.beginPath();
    var scaleX = 1 * ((posX - posX0) / 2);
    var scaleY = 1 * ((posY - posY0) / 2);
    context.scale(scaleX, scaleY);
    var centerX = posX0 / scaleX + 1;
    var centerY = posY0 / scaleY + 1;
    context.arc(centerX, centerY, 1, 0, 2 * Math.PI);
    context.widthPen = size.value/10;
    context.strokeStyle = colors.value;
    context.stroke();
    drawing = false;
  }
}

function circleEndPoint(){

};

function lineFirstPoint(e){
  var positions = getpositions(canvas1, e);
  if (drawing == false) {
    posX0 = positions.x;
    posY0 = positions.y;
    canvas1.style.cursor = "move";
    drawing = true;
  } else if (drawing == true) {
    posX = positions.x;
    posY = positions.y;
    context.beginPath();
    context.moveTo(posX0, posY0);
    context.lineTo(posX, posY);
    context.widthPen = size.value;
    context.stroke();
    drawing = false;
  }
};

function drawRectangle(e) {
  var positions = getpositions(canvas1, e);
  if (drawing == false) {
    canvas1.style.cursor = "move";
    posX0 = positions.x;
    posY0 = positions.y;
    drawing = true;
  } else if (drawing == true) {
    posX = positions.x;
    posY = positions.y;
    context.beginPath();
    context.widthPen = size.value / 10;
    context.rect(posX0, posY0, posX - posX0, posY - posY0);
    context.stroke();
    drawing = false;
  }
}

function txtDown(e) {
  var positions = getpositions(canvas1, e);
  posX = positions.x;
  posY = positions.y;
  var inputText = writeInput.value;
  var txtFontSize = parseInt(writeSize.value);
  context.font = `${txtFontSize}px  ${writeFont.value}`;
  context.fillText(inputText, posX, posY);
}

pen.addEventListener("click", function() {
  selected = !selected;
  if (selected) {
    context.strokeStyle = colors.value;
    pen.style.border = `3px solid ${colors.value}`;
    canvas1.addEventListener("mousedown", penDown, false);
    canvas1.addEventListener("mousemove", penMoved, false);
    canvas1.addEventListener("mouseup", penUp, false);
  } else if (selected == false) {
    pen.style.border = ``;
    canvas1.removeEventListener("mousedown", penDown, false);
    canvas1.removeEventListener("mousemove", penMoved, false);
    canvas1.removeEventListener("mouseup", penUp, false);
    canvas1.style.cursor = "auto";
  }
  });

line.addEventListener("click", (e) => {
  selected = !selected;
  if (selected) {
    context.strokeStyle = colors.value;
    line.style.border = `3px solid ${colors.value}`;
    canvas1.addEventListener("mousedown", lineFirstPoint, false);
  } else if (selected == false) {
    canvas1.style.cursor = "auto";
    line.style.border = ``;
    canvas1.removeEventListener("mousedown", lineFirstPoint, false);
  }
});

del.addEventListener("click", () => {
  selected = !selected;
  if (selected) {
    var delColor = "#ffffff";
    context.strokeStyle = delColor;
    del.style.border = "3px solid #ffffff";
    canvas1.addEventListener("mousedown", penDown, false);
    canvas1.addEventListener("mousemove", penMoved, false);
    canvas1.addEventListener("mouseup", penUp, false);
  } else if (selected == false) {
    del.style.border = "";
    canvas1.style.cursor = "auto";
    canvas1.removeEventListener("mousedown", penDown, false);
    canvas1.removeEventListener("mousemove", penMoved, false);
    canvas1.removeEventListener("mouseup", penUp, false);
  }
});

drawCircle.addEventListener("click", (e) => {
  selected = !selected;
  if (selected) {
    context.strokeStyle = colors.value;
    drawCircle.style.border = `3px solid ${colors.value}`;
    canvas1.addEventListener("mousedown", circleStartPoint, false);
    // canvas1.addEventListener("mousemove", circleMove, false);
    canvas1.addEventListener("mouseup", circleEndPoint, false);
  } else if (selected == false) {
    drawCircle.style.border = ``;
    canvas1.style.cursor = "auto";
    canvas1.removeEventListener("mousedown", circleStartPoint, false);
    canvas1.removeEventListener("mouseup", circleEndPoint, false);
  }
});

mostatil.addEventListener("click", () => {
  selected = !selected;
  if (selected) {
    context.strokeStyle = colors.value;
    mostatil.style.border = `3px solid ${colors.value}`;
    canvas1.addEventListener("mousedown", drawRectangle, false);
    //canvas1.addEventListener("mouseup", recUp, false);
  } else if (selected == false) {
    canvas1.style.cursor = "auto";
    mostatil.style.border = "";
    canvas1.removeEventListener("mousedown", drawRectangle, false);
  }
});

write.addEventListener("click", () => {
  selected = !selected;
  if (selected) {
    context.strokeStyle = colors.value;
    write.style.border = `3px solid ${colors.value}`;
    canvas1.addEventListener("mousedown", txtDown, false);
  } else if (selected == false) {
    canvas1.style.cursor = "auto";
    write.style.border = "";
    canvas1.removeEventListener("mousedown", txtDown, false);
  }
});

function sizeValue() {
  document.getElementById("pen-size-label").innerHTML = `Pen-size : ${
    document.getElementById("pen-size").value
  }px `;
}

reset.addEventListener("click", () => {
  context.clearRect(0, 0, canvas1.clientWidth, canvas1.clientHeight);
});

uploadFromURL.addEventListener("click", () => {
  var imgAddress = prompt("آدرس محلی عکس خود را وارد کنید.");
  canvas1.style.backgroundImage = `url(${imgAddress})`;
});
//get image background from internet address
uploadFromWEB.addEventListener("click", () => {
  var imgAddress = prompt("آدرس اینترنتی عکس خود را وارد کنید.");
  canvas1.style.backgroundImage = `url(${imgAddress})`;
});
download.addEventListener("click", () => {
  download.download = "myfile.jpeg";
  download.href = canvas1.toDataURL();
});
function penSizeChange(){

}