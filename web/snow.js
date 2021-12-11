let intViewportWidth = window.innerWidth;

snowDrop(150, randomInt(0, intViewportWidth));
snow(150, 100);

function snow(num, speed) {
  if (num > 0) {
    setTimeout(function () {
      const dropID = "drop_" + randomInt(1, 150);
      document.getElementById(dropID).classList.add("animate");
      num--;
      snow(num, speed);
    }, speed);
  }
}

function snowDrop(num, position) {
  if (num > 0) {
    var dropEle = document.createElement("div");

    dropEle.className = "drop snow";
    dropEle.id = `drop_${num}`;

    document.body.appendChild(dropEle);
    const dropID = "drop_" + num;

    document.getElementById(dropID).style.left = position + "px";

    num--;
    snowDrop(num, randomInt(0, intViewportWidth));
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
