# ------------------------------
# TRIE DATA STRUCTURE
# ------------------------------


class TrieNode:
    def __init__(self):
        self.children = {}   # dictionary: character -> TrieNode
        self.is_end = False  # marks end of a word


class Trie:
    def __init__(self):
        self.root = TrieNode()

    # Insert a word
    def insert(self, word: str):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    # Search a word
    def search(self, word: str) -> bool:
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end

    # Delete a word
    def delete(self, word: str):
        # helper recursive function
        def remove(node, word, index):
            if index == len(word):
                if not node.is_end:
                    return False
                node.is_end = False
                return len(node.children) == 0

            char = word[index]
            if char not in node.children:
                return False

            should_delete_child = remove(node.children[char], word, index + 1)

            if should_delete_child:
                del node.children[char]
                return len(node.children) == 0

            return False

        remove(self.root, word, 0)

    # Convert Trie to JSON structure for visualization
    def to_json(self):
        def build(node, label):
            children_list = [
                build(child, char)
                for char, child in sorted(node.children.items())
            ]
            return {
                "name": label,
                "children": children_list
            }

        return build(self.root, "root")

