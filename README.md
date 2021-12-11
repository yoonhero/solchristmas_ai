# 솔크 판별기 인공지능

## 제작 로드맵

```
이미지 크롤링 -> 데이터 전처리 -> 이미지 분류 인공지능 (cnn, transfer learning) -> 웹사이트 시각화
```

## 이미지 크롤링

웹 페이지를 그대로 가져와서 거기서 데이터를 추출해 내는 행위를 말한다.

```python
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import urllib.request
import requests
import os


class Crawling:
    def __init__(this, category, folder, count):
        this.category = category
        this.driver = webdriver.Chrome("CHROME DRIVER DIRECTORY")

        this.SCROLL_PAUSE_TIME = 0.2
        this.folderName = "./data/" + folder
        this.IMAGE_PAUSE_TIME = 0.4
        this.count = count
        this.start()

    def start(this):
        this.driver.get(
            "https://www.google.co.kr/imghp?hl=ko&tab=wi&authuser=0&ogbl")
        elem = this.driver.find_element_by_name('q')
        elem.send_keys(this.category)
        elem.send_keys(Keys.RETURN)

        this.scrollToBottom()
        this.imageCrawling()

    def scrollToBottom(this):
        this.last_height = this.driver.execute_script(
            "return document.body.scrollHeight")

        while True:
            this.driver.execute_script(
                "window.scrollTo(0, document.body.scrollHeight);")

            time.sleep(this.SCROLL_PAUSE_TIME)

            this.new_height = this.driver.execute_script(
                "return document.body.scrollHeight")

            if this.new_height == this.last_height:
                try:
                    this.driver.find_element_by_css_selector(".mye4qd").click()
                except:
                    break
            this.last_height = this.new_height

    def imageCrawling(this):

        this.images = this.driver.find_elements_by_css_selector(".rg_i.Q4LuWd")

        for image in this.images:
            try:
                image.click()
                time.sleep(this.IMAGE_PAUSE_TIME)

                file_name = str(this.count) + ".jpg"

                completeFileName = os.path.join(this.folderName, file_name)
                imgUrl = this.driver.find_element_by_xpath(
                    '/html/body/div[2]/c-wiz/div[3]/div[2]/div[3]/div/div/div[3]/div[2]/c-wiz/div/div[1]/div[1]/div[2]/div/a/img').get_attribute("src")

                f = open(completeFileName, "wb")
                f.write(requests.get(imgUrl).content)
                f.close()

                this.count += 1

            except:
                pass

        this.driver.close()
```

## 데이터 전처리

많은 사진을 크롤링한 가운데 데이터 전처리는 필수적일 것입니다. 하지만 아직 완벽한 인공지능을 만드는 단계가 아니기에 샘플 이미지로 계속 사용할 계획입니다.

## 인공지능

- [Teachable Machine](https://teachablemachine.withgoogle.com/train)
- [Tensorflow](https://www.tensorflow.org/?hl=ko)

### Teachable Machine

티처블 머신은 쉽게 인공지능을 훈련시킬 수 있도록 한 플랫폼으로 베타 버젼을 만들어보기 위해서 간단히 사용해보았습니다.

데이터

- 커플 사진 441개
- 솔로 사진 482개

<strong>Model Url: </strong> https://teachablemachine.withgoogle.com/models/OIZ-f69pX/

### Tensorflow

실제 인공지능을 만드는 것이 중요하기에 텐서플로우를 사용하여 컨볼루션 신경망과 전이 학습을 통해서 적은 이미지로 최대한의 효율을 낼 계획입니다.

## 웹사이트 시각화

<strong>[솔크 판별기 Ver 1.0.](https://solchristmas-example-1.netlify.app/)</strong>

웹캠을 이용한 티처블 머신 인공지능을 시각화한 웹사이트입니다.

간단한 html, css, js 를 통해서 제작하였습니다.

<strong>[솔크 판별기 Ver 2.0.](https://solxmas.netlify.app/)</strong>

Ver 1.0. 에 디테일을 추가했습니다.

업데이트 내용

- 로딩 페이지 UI/UX
- 솔로들을 위한 글귀
- 눈 내리는 애니매이션
- 크리스마스 카운트다운
