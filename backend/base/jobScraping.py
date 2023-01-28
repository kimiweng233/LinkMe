from bs4 import BeautifulSoup
from selenium import webdriver
import time

url =  "https://www.linkedin.com/jobs/search/?currentJobId=3453728007&geoId=100025096&keywords=Data%20Scientist&location=Toronto%2C%20Ontario%2C%20Canada"
browser = webdriver.Chrome()
browser.get(url)
time.sleep(10)
source = browser.page_source
print(source)
# mydivs = soup.find_all("div", {"class": "stylelistrow"})