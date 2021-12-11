import Quote from "./quote.js";
import WebcamTensorflow from "./webcam.js";

class App {
  constructor() {
    this.screen = screen.width;
    this.loading = false;

    this.desktop = document.querySelector(".desktop");
    this.mobile = document.querySelector(".mobile");
    this.loadingComponent = document.querySelector(".loading");

    this.init();
  }

  async init() {
    window.addEventListener("resize", () => {
      this.screen = screen.width;

      this.initScreen();
    });
    // this.desktop.classList.add("hidden");
    // this.mobile.classList.add("hidden");

    this.loading = true;
    // this.loadingComponent.classList.remove("hidden");

    await this.initScreen();
  }

  async initScreen() {
    if (this.screen > 680) {
      // desktop

      if (this.loading) {
        this.quote = new Quote(Math.floor(Math.random() * 4 + 1) * 1000);
        // load tensorflow model first
        this.webcamTensorflow = new WebcamTensorflow();

        document.querySelector(".loadingText").innerText = "인공지능 로딩중...";
        const ok = await this.webcamTensorflow.init();

        if (ok) {
          this.loading = false;
          this.quote.deleteInterval();
        } else {
          return;
        }
      }

      this.loadingComponent.classList.add("hidden");
      this.desktop.classList.remove("hidden");

      this.countdown = this.desktop.querySelector(".countdonwText");

      const countDate = new Date("dec 25, 2021 00:00:00").getTime();
      let now = new Date().getTime();

      let gap = countDate - now;

      this.countdown.innerText =
        "D-" + String(Math.floor(gap / 1000 / 60 / 60 / 24));
    } else {
      // mobile
      this.loadingComponent.classList.add("hidden");
      this.mobile.classList.remove("hidden");
    }
  }
}

window.onload = () => {
  new App();
};
