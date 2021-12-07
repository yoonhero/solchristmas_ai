from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import urllib.request
import requests
import os


class Crawling:
    def __init__(this, category, folder, count):
        this.category = category
        this.driver = webdriver.Chrome(
            "/Users/yoonseonghyeon/Desktop/YSH/programming/solchristmas_ai/chromedriver")

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


crawler = Crawling("커플의 관상", "couple", 260)

# G10_
# smart10_071
