const quote = [
  "괜찮아요 다 잘될거에요",
  "It's okay",
  `참된 사랑의 힘은 태산보다도 강하다
그러므로 그 힘은 거대한 힘을 가지고 있는 황금일지라도
무너뜨리지 못한다`,
  `사랑은 우리가 모르는 사이에 찾아온다
  우리는 다만 사랑이 사라져 가는 것을 볼 뿐이다`,
  `사랑은 우리를 행복하게 하기 위해서
  존재하는 것이 아니라
  우리들이 고뇌와 인내에서
  얼마만큼 결딜 수 있는가를 보기 위해서 있다`,
  `질투는 늘 사랑과 함께 탄생한다
  그러나,반드시 사랑과 함께 사라지지는 않는다`,
  `난 나를 웃게해주는 사람이 좋다`,
  `길을 아는것과 그것을 걷는것은 분명히 다르다`,
  `인간이 외로운 이유는 둘씩 있다는 것 때문이다`,
  `힘들고 외로울 때우리에게 진짜 필요한 건

  내 마음을 알아주는 사람,
  
  바로 딱 한사람입니다.`,
];

function randomQuote() {
  return quote[Math.floor(Math.random() * quote.length)];
}

const quoteContainer = document.querySelector(".quote");
const quoteText = quoteContainer.querySelector(".quoteText");

class Quote {
  constructor(intervel) {
    this.intervel = intervel;

    // quoteText.innerText = "";

    this.refreshQuote = setInterval(this.changeQuote, this.intervel);
  }

  deleteInterval() {
    clearInterval(this.refreshQuote);
  }

  changeQuote() {
    console.log("hi");
    let randomQ = "- " + randomQuote() + " -";

    quoteText.innerText = randomQ;
  }
}

export default Quote;
