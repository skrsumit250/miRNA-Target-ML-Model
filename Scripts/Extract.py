"""
Author: BlueSkull

Description:
This script performs custom web scraping to extract relevant data from an HTML file. 
It parses the HTML content using BeautifulSoup, extracts the 'value' attributes and writes them into a CSV file.

Output:
- A CSV file named 'Data.csv' containing structured rows of extracted hidden values.

Dependencies:
- BeautifulSoup4 (bs4)
"""

import csv
from bs4 import BeautifulSoup

# Load the HTML content
with open('index.html', 'r', encoding='utf-8') as file:
    html_content = file.read()

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(html_content, 'html.parser')

# Initialize a list to store the extracted data
data = []

# Find all the form elements
forms = soup.find_all('input', type='hidden')

values = [form['value'] for form in forms] #get all values into a list

row = []
for i, value in enumerate(values):
    row.append(value)
    if (i + 1) % 8 == 0 or i == len(values) - 1: # check if 8 elements or last element
        data.append(row)
        row = [] #reset row

# Write the data to a CSV file
with open('Data.csv', 'a', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(data)

print("Data written to output.csv")