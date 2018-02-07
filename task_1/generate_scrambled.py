import string
import random
import numpy 

# print(string.ascii_lowercase)

alphabet = string.ascii_lowercase

# size of the words used in experiment will be 6

strLength = 6

# of swaps and corresponding probabilities
# 0 swaps -> 20%
# 1 swap -> 50%
# 2 swaps -> 30%

f = open("task_1_words.txt", "w")

for x in range (0, 234) :
	swaps = numpy.random.choice(numpy.arange(0,2), p=[0.07, 0.93])

	i = random.randint(0, 26-strLength)

	chunk = alphabet[i : i+strLength]


	for x in range (0, swaps) :
		i = random.randint(0, strLength-2)
		j = i +1
		chunk = list(chunk)
		chunk[i], chunk[j] = chunk[j], chunk[i]
		chunk = ''.join(chunk)
	
	if (swaps == 0):
		f.write(chunk+", 1\n")
	else :
		f.write(chunk+", 0\n")

f.close()