# ------------------------------
# COMPRESSED SUFFIX TREE (named SuffixTrie for compatibility)
# ------------------------------


class SuffixTreeNode:
    def __init__(self):
        # edge_label -> child node
        self.children: dict[str, "SuffixTreeNode"] = {}
        # list of suffix starting indices (for leaves, can be >1 if merged)
        self.indices: list[int] = []


class SuffixTrie:   # this is actually a compressed suffix tree
    def __init__(self):
        self.root = SuffixTreeNode()
        self.text = ""

    # Build compressed suffix tree for a given text
    def build(self, text: str):
        self.text = text
        self.root = SuffixTreeNode()
        n = len(text)
        for i in range(n):
            self._insert_suffix(text[i:], i)

    def _insert_suffix(self, suffix: str, index: int):
        node = self.root
        s = suffix

        while True:
            # Try to find an edge with common prefix
            for edge_label, child in list(node.children.items()):
                # compute longest common prefix length
                lcp_len = 0
                max_len = min(len(s), len(edge_label))
                while lcp_len < max_len and s[lcp_len] == edge_label[lcp_len]:
                    lcp_len += 1

                if lcp_len == 0:
                    # no common prefix with this edge, try next
                    continue

                if lcp_len == len(edge_label):
                    # full match of edge label: go down
                    node = child
                    s = s[lcp_len:]
                    if not s:
                        # suffix ends exactly here
                        child.indices.append(index)
                        return
                    # continue outer while with new node & remaining s
                    break

                # Partial match: need to split the edge
                # edge_label = prefix + remaining_edge
                prefix = edge_label[:lcp_len]
                remaining_edge = edge_label[lcp_len:]

                # Create a middle node for the prefix
                mid = SuffixTreeNode()

                # The existing child becomes child of this mid node
                mid.children[remaining_edge] = child
                mid.indices.extend(child.indices)

                # Replace old edge with prefix -> mid
                node.children[prefix] = mid
                del node.children[edge_label]

                # Now handle the remaining part of the suffix
                remaining_suffix = s[lcp_len:]
                if remaining_suffix:
                    leaf = SuffixTreeNode()
                    leaf.indices.append(index)
                    mid.children[remaining_suffix] = leaf
                else:
                    # suffix ends exactly at mid
                    mid.indices.append(index)
                return

            else:
                # No matching edge at all: create new leaf edge with full s
                leaf = SuffixTreeNode()
                leaf.indices.append(index)
                node.children[s] = leaf
                return

    # Search for a pattern in the suffix tree
    # Returns True if pattern appears as a substring
    def search(self, pattern: str) -> bool:
        node = self.root
        s = pattern

        while s:
            found_edge = False
            for edge_label, child in node.children.items():
                # find LCP of s and edge_label
                lcp_len = 0
                max_len = min(len(s), len(edge_label))
                while lcp_len < max_len and s[lcp_len] == edge_label[lcp_len]:
                    lcp_len += 1

                if lcp_len == 0:
                    continue

                # Fully consumed pattern
                if lcp_len == len(s):
                    return True

                # Edge completely matches prefix of pattern, continue deeper
                if lcp_len == len(edge_label):
                    node = child
                    s = s[lcp_len:]
                    found_edge = True
                    break

                # pattern ends in the middle of an edge but we already
                # handled full pattern case above, so here it must fail
                return False

            if not found_edge:
                return False

        return True

    # Convert to JSON for react-d3-tree visualization
    # Each node: { "name": "label [indices]", "children": [...] }
    def to_json(self):
        def build(node: SuffixTreeNode, label: str):
            children_list = [
                build(child, edge_label)
                for edge_label, child in sorted(node.children.items())
            ]

            # Build node name
            if label == "root":
                name = "root"
            else:
                name = label

            if node.indices:
                idx_str = ",".join(str(i) for i in node.indices)
                if label == "root":
                    name = f"root [{idx_str}]"
                elif label:
                    name = f"{label} [{idx_str}]"
                else:
                    name = f"[{idx_str}]"

            return {
                "name": name,
                "children": children_list
            }

        return build(self.root, "root")
