from __future__ import print_function
import os
import requests
from bs4 import BeautifulSoup
import csv
import time

RESULTS = "results.csv"
URL = "https://etherscan.io/token/generic-tokenholders2?a=0x6425c6be902d692ae2db752b3c268afadb099d3b&s=0&p="

def getData(sess, page):
    url = URL + page
    print("Retrieving page", page)
    return BeautifulSoup(sess.get(url).text, 'html.parser')

def getPage(sess, page):
    table = getData(sess, str(int(page))).find('table')
    return [[X.text.strip() for X in row.find_all('td')] for row in table.find_all('tr')]

def main():
    resp = requests.get(URL)
    sess = requests.Session()

    with open(RESULTS, 'wb') as f:
        wr = csv.writer(f, quoting=csv.QUOTE_ALL)
        wr.writerow(map(str, "Rank Address Quantity Percentage".split()))
        page = 0
        while True:
            page += 1
            data = getPage(sess, page)
            # Even pages that don't contain the data we're after still contain a table.
            if len(data) < 4:
                break
            else:
                for row in data:
                    wr.writerow(row)
                time.sleep(1)

if __name__ == "__main__":
    main()