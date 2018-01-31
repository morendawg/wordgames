from flask import Flask, render_template, request
import string
import random
import numpy 


app = Flask(__name__)


@app.route('/')
def hello():
    return "Hello World!"

def generate_scrambled(num):
	alphabet = string.ascii_lowercase
	strLength = 6
	entries = []
	for x in range (0, num) :
		swaps = numpy.random.choice(numpy.arange(0,2), p=[0.07, 0.93])

		i = random.randint(0, 26-strLength)

		chunk = alphabet[i : i+strLength]

		for x in range (0, swaps) :
			i = random.randint(0, strLength-2)
			j = i +1
			chunk = list(chunk)
			chunk[i], chunk[j] = chunk[j], chunk[i]
			chunk = ''.join(chunk)

		print "{} swaps -> {}".format(swaps, chunk)
		entries.append(chunk)
	return entries


@app.route('/task1')
def show_task_1():
	entries = generate_scrambled(234)
	return render_template('task_1.html', entries = entries)

if __name__ == '__main__':
    app.run(debug=True)