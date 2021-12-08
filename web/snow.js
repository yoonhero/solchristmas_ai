snowDrop(150, randomInt(1035, 1280));
snow(150, 150);

function snow(num, speed) {
  if (num > 0) {
    setTimeout(function () {
      const dropID = "#drop_" + randomInt(1, 250);
      document.getElementById(dropID).classList.add("animate");
      num--;
      snow(num, speed);
    }, speed);
  }
}

function snowDrop(num, position) {
  if (num > 0) {
    var drop = `<div class="drop snow" id="drop_${num}"></div>`;

    var dropEle = document.createElement(String(drop));

    document.getElementById("main").appendChild(dropEle);
    const dropID = "#drop_" + randomInt(1, num);

    document.getElementById(dropID).style.left = position;

    num--;
    snowDrop(num, randomInt(60, 1280));
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
