let webcam, model, maxPredictions;

async function predict() {
  const prediction = await model.predict(webcam.canvas);
  for (let i = 0; i < maxPredictions; i++) {
    let posibility =
      String(Math.floor(prediction[i].probability.toFixed(2) * 100)) + "%";

    document.querySelectorAll(".category")[i].innerText =
      prediction[i].className;
    document.querySelectorAll(".bar_text")[i].innerText = posibility;
    document.querySelectorAll(".bar_main")[i].style.width = posibility;
  }
}

async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

class WebcamTensorflow {
  constructor() {
    this.URL = "https://teachablemachine.withgoogle.com/models/OIZ-f69pX/";

    model = null;
    webcam = null;
    maxPredictions = null;
  }

  async init() {
    const modelURL = this.URL + "model.json";
    const metadataURL = this.URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    await this.initWebcam();

    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);

    return true;
  }

  async initWebcam() {
    const flip = true;
    webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup();
    await webcam.play();
  }
}

export default WebcamTensorflow;
