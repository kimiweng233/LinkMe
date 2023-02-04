from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import os
from dotenv import load_dotenv

def getJobDescription(URL):
    load_dotenv()
    USERNAME = os.getenv('LINKEDIN_USERNAME')
    PWD = os.getenv('LINKEDIN_PWD')

    driver = webdriver.Chrome()
    driver.get("https://www.linkedin.com/login")
    time.sleep(2)
    driver.find_element(By.ID, "username").send_keys(USERNAME)
    driver.find_element(By.ID, "password").send_keys(PWD)
    time.sleep(1)
    driver.find_element(By.XPATH, "/html/body/div/main/div[2]/div[1]/form/div[3]/button").click()
    driver.implicitly_wait(30)
    driver.get(URL)
    time.sleep(1)
    jobDescription = driver.find_elements(By.CLASS_NAME, "jobs-description__content")
    output = ""
    for description in jobDescription:
        jobText = description.find_element(By.CLASS_NAME, "jobs-box__html-content").text
        output += jobText
    return output