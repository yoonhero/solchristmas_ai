class WebcamTensorflow {
  constructor() {
    this.URL = "https://teachablemachine.withgoogle.com/models/OIZ-f69pX/";

    this.model = null;
    this.webcam = null;
    this.maxPredictions = null;
  }

  async init() {
    const modelURL = this.URL + "model.json";
    const metadataURL = this.URL + "metadata.json";

    this.model = await tmImage.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();

    await this.initWebcam();

    console.log(this.webcam);

    window.requestAnimationFrame(this.loop);

    document.getElementById("webcam-container").appendChild(this.webcam.canvas);

    return true;
  }

  async initWebcam() {
    const flip = true;
    this.webcam = new tmImage.Webcam(200, 200, flip);
    await this.webcam.setup();
    await this.webcam.play();
  }

  async loop() {
    console.log(this.webca;
    this.webcam.update();
    await this.predict();
    window.requestAnimationFrame(this.loop);
  }

  async predict() {
    const prediction = await this.model.predict(this.webcam.canvas);
    for (let i = 0; i < this.maxPredictions; i++) {
      let posibility =
        String(Math.floor(prediction[i].probability.toFixed(2) * 100)) + "%";

      document.querySelectorAll(".category")[i].innerText =
        prediction[i].className;
      document.querySelectorAll(".bar_text")[i].innerText = posibility;
      document.querySelectorAll(".bar_main")[i].style.width = posibility;
    }
  }
}

export default WebcamTensorflow;
