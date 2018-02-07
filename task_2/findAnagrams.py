from collections import defaultdict

o = open("task_2_words_anagrams.csv", "w")


def load_dictionary(filename='dictionary.txt'):
	with open(filename) as f:
		for word in f:
			yield word.rstrip()

def load_words(filename='task_2_words.txt'):
	with open(filename) as f:
		for word in f:
			yield word.rstrip()

def get_anagrams(source):
	d = defaultdict(list)
	for word in source:
		key = "".join(sorted(word))
		d[key].append(word)
	return d

def print_anagrams(word_source, dictionary):
	d = get_anagrams(dictionary)
	i = 1
	for word in word_source:
		key = "".join(sorted(word))
		# o.write(word+","+str(len(d[key]))+","+str(d[key])+"\n")
		o.write(str(d[key])+"\n")


word_source = load_words()
dictionary = load_dictionary()
print_anagrams(word_source, dictionary)
o.close()