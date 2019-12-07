import time
import pymysql
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from pprint import pprint
import datetime

# 1. db 연결
conn=pymysql.connect(host='localhost',user='root',password='tjdgus12',db='python',charset='utf8')
url="http://www.lotteria.com/index.asp"
path="C:/chromedriver.exe"

# 2. Connection으로부터 Cursor생성
curs=conn.cursor(pymysql.cursors.DictCursor)

driver=webdriver.Chrome(path)
driver.get(url)

time.sleep(0.2)



 
driver.find_element(By.XPATH,"//*[@id='navigation']/ul/li[4]/a/img").click()




for i in range(2,6):
    main_element=driver.find_element(By.XPATH, "//*[@id='content']/div/div[2]/div[{}]/a/img".format(i)).get_attribute("src")
    driver.find_element(By.XPATH,"//*[@id='content']/div/div[2]/div[{}]/a/img".format(i)).click()
    time.sleep(0.3)

# 첫 접속
# 3. SQL문 실행
    sql="""insert into events(title,sub_img,brand_name,main_img)
        values(%s,%s,%s,%s)"""

    #1. 제목
    title=driver.find_element(By.XPATH,"//*[@id='content']/div/div[2]/div[2]/div/h4").text
    #3. 이벤트 서브이미지
    element=driver.find_element(By.XPATH, "//*[@id='content']/div/div[3]/div[2]/div/img").get_attribute("src")
    # 이벤트 메인이미지
    # main_img=driver.find_element(By.XPATH, "//*[@id='content']/div/div[2]/div[2]/a/img").get_attribute("src")

    #5. 브랜드 이름
    brandName="lotteria"
    pprint(title)
    pprint(element)
    pprint(main_element)
    curs.execute(sql,(title,element,brandName,main_element))
    conn.commit()


    driver.find_element(By.XPATH,"//*[@id='content']/div/div[5]/div/a/img").click()






time.sleep(0.3)


# for i in range(1,20):
#     try:
#         sql="""insert into events(title,sub_img,brand_name,main_img)
#         values(%s,%s,%s)"""
#         title=driver.find_element(By.XPATH,"//*[@id='content']/div/div[2]/div[2]/div/h4").text
#         # paging=driver.find_element(By.XPATH,"//*[@id='content']/div/div[4]/div[2]/table/tbody/tr[1]/td[1]/a")

#          # 서브 이미지
#         element = driver.find_element(By.XPATH, "//*[@id='content']/div/div[3]/div[2]/div/img").get_attribute("src")
#         pprint(title)
#         pprint(element)

#         curs.execute(sql,(title,element,brandName))
#         conn.commit()

#         # if paging:
#         driver.find_element(By.XPATH,"//*[@id='content']/div/div[4]/div[2]/table/tbody/tr[1]/td[1]/a").click()

#     except:    
#         break
    
print("--------------------------------------------------")
