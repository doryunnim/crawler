import time
import pymysql
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from pprint import pprint
import datetime

# 1. db 연결
conn=pymysql.connect(host='localhost',user='root',password='tjdgus12',db='mysql',charset='utf8')
url = "https://www.pizzahut.co.kr/main"
path = "C:/chromedriver.exe"
dt = datetime.datetime.now()

# 2. Connection으로부터 Cursor생성
curs=conn.cursor(pymysql.cursors.DictCursor)

# Chrome WebDriver를 이용해 Chrome을 실행합니다.
driver = webdriver.Chrome(path)
# burgerking으로 이동
driver.get(url)

time.sleep(0.5)

#이벤트 페이지이동
driver.find_element(By.XPATH, "//*[@id='wh_Header']/div[4]/div/nav/ul[1]/li[5]/a").click()



time.sleep(0.5)
event_ul=driver.find_element(By.XPATH, "//*[@id='list-box']")
event_li = event_ul.find_elements(By.TAG_NAME, "li")

#페이징
for i in range(1,len(event_li)+1):
    # 3. SQL문 실행
    sql="""insert into pizzahut(title,content)
        values(%s,%s)"""
    element=driver.find_element(By.XPATH,"//*[@id='list-box']/li[{}]/a/div[1]/img".format(i))
    driver.execute_script("arguments[0].click();", element)

    title=driver.find_element(By.XPATH,"//*[@id='Contents']/div[2]/section/div/div[2]/div[1]/dl/dt/strong").text
    img_sub = driver.find_element(By.XPATH, "/html/body/div[1]/div[3]/article/div[2]/section/div/div[2]/div[1]/dl/dd/div/img").get_attribute("src")
    
    pprint(title)
    pprint(img_sub)

    curs.execute(sql,(title,img_sub))
    conn.commit()

    time.sleep(0.5)
    driver.find_element(By.XPATH, "//*[@id='eventList']/a").click()
    time.sleep(0.5)

    


print("---------------------------------------------------")
