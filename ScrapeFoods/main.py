import requests, time
import json
from bs4 import BeautifulSoup

url = 'https://www.nutritionvalue.org/'
user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36'
headers = {'User-Agent': user_agent}
source = requests.get(url, headers=headers).text


def get_links(html):
    soup = BeautifulSoup(html, 'html.parser')
    links = soup.find_all('a', {'class': 'l alphabet'})
    return [url + link['href'] for link in links]


def get_food_links(link):
    print(link)
    html = requests.get(link, headers=headers).text
    soup = BeautifulSoup(html, 'html.parser')
    food_links = [url + link['href'] for link in soup.find_all('a', {'class': 'table_item_name'})]
    next_page = soup.find('a', {'title': f'Page 2'})
    page = 1
    while next_page:
        page = page + 1
        time.sleep(5)
        print(page, end=' ')
        href = next_page['href']
        href = href[href.index('f') - 1:]
        html = requests.get(url + href, headers=headers).text
        soup = BeautifulSoup(html, 'html.parser')
        for food in [url + link['href'] for link in soup.find_all('a', {'class': 'table_item_name'})]:
            food_links.append(food)
        next_page = soup.find('a', {'title': f'Page {page + 1}'})
    print()
    return food_links


all_food_links = json.load(open('food_links.json', 'r'))

links = get_links(source)
links = links[30:]
for link in links:
    all_food_links += get_food_links(link)
    json.dump(all_food_links, open('food_links.json', 'w'))


















