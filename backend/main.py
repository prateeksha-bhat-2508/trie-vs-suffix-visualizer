
import time
import random
import string

from trie import Trie
from suffix_trie import SuffixTrie


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# Create an API app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],     # allow ALL domains (frontend)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

trie = Trie()
suffix_trie = SuffixTrie()


# Create a basic route
@app.get("/")
def home():
    return {"message": "Backend running!"}
@app.post("/trie/insert/{word}")
def trie_insert(word: str):
    trie.insert(word)
    return {"status": "inserted", "word": word}


@app.get("/trie/search/{word}")
def trie_search(word: str):
    found = trie.search(word)
    return {"word": word, "found": found}


@app.delete("/trie/delete/{word}")
def trie_delete(word: str):
    trie.delete(word)
    return {"status": "deleted", "word": word}


@app.get("/trie/visualize")
def trie_visualize():
    return trie.to_json()

# Build suffix trie from text
@app.post("/suffix/build/{text}")
def suffix_build(text: str):
    suffix_trie.build(text)
    return {"status": "suffix trie built", "text": text}

# Search in suffix trie
@app.get("/suffix/search/{pattern}")
def suffix_search(pattern: str):
    found = suffix_trie.search(pattern)
    return {"pattern": pattern, "found": found}

# Visualize suffix trie
@app.get("/suffix/visualize")
def suffix_visualize():
    return suffix_trie.to_json()
@app.get("/compare/stats")
def compare_stats():
    import time
    import random
    import string

    sizes = [10, 20, 40, 80, 160]

    trie_insert_times = []
    suffix_build_times = []

    for n in sizes:
        text = ''.join(random.choice(string.ascii_lowercase) for _ in range(n))

        # Measure Trie insert
        new_trie = Trie()
        start = time.time()
        new_trie.insert(text)
        trie_insert_times.append((time.time() - start) * 1000)

        # Measure Suffix Tree build
        new_suffix = SuffixTrie()
        start = time.time()
        new_suffix.build(text)
        suffix_build_times.append((time.time() - start) * 1000)

    return {
        "sizes": sizes,
        "trie_insert": trie_insert_times,
        "suffix_build": suffix_build_times
    }


@app.get("/benchmark")
def run_benchmark():

    sizes = [5, 10, 20, 40, 80, 160]  # lengths of strings

    trie_insert_times = []
    suffix_build_times = []

    for n in sizes:
        test_string = ''.join(random.choice(string.ascii_lowercase) for _ in range(n))

        # Trie insert benchmark
        start = time.time()
        trie.insert(test_string)
        trie_insert_times.append((time.time() - start) * 1000)

        # Suffix trie build benchmark
        start = time.time()
        suffix_trie.build(test_string)
        suffix_build_times.append((time.time() - start) * 1000)

    return {
        "sizes": sizes,
        "trie_insert": trie_insert_times,
        "suffix_build": suffix_build_times
    }


