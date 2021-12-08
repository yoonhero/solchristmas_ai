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
        // load tensorflow model first
        this.webcamTensorflow = new WebcamTensorflow();

        document.querySelector(".loadingText").innerText = "인공지능 로딩중...";
        const ok = await this.webcamTensorflow.init();

        if (ok) {
          this.loading = false;
        } else {
          return;
        }
      }

      this.loadingComponent.classList.add("hidden");
      this.desktop.classList.remove("hidden");
    } else {
      // mobile
      this.loading.classList.add("hidden");
      this.mobile.classList.remove("hidden");
    }
  }
}

window.onload = () => {
  new App();
};
