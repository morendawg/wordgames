from flask import Flask, render_template, request
import string
import random
import numpy 


app = Flask(__name__)


@app.route('/')
def hello():
    return "Hello World!"

def parse_scrambled(file):
	file = open(file, "r")
	lines = [line.rstrip('\n') for line in file]
	entries = []
	answers = []
	for line in lines:
		split = line.split(',')
		entries.append(split[0])
		answers.append(split[1])
	return entries, answers


@app.route('/task1')
def show_task_1():
	entries, answers = parse_scrambled('task_1_words.txt')

	return render_template('task_1.html', entries = entries)

if __name__ == '__main__':
    app.run(debug=True)