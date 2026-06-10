"use client";

import { useState } from "react";
import TreeVisualizer from "@/components/TreeVisualizer";

export default function TriePage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [treeData, setTreeData] = useState(null);

  const backend = "http://127.0.0.1:8000";
  console.log("Backend URL being used:", backend);



  async function handleInsert() {
    const res = await fetch(`${backend}/trie/insert/${input}`, { method: "POST" });
    setResponse(JSON.stringify(await res.json(), null, 2));
  }

  async function handleSearch() {
    const res = await fetch(`${backend}/trie/search/${input}`);
    setResponse(JSON.stringify(await res.json(), null, 2));
  }

  async function handleDelete() {
    const res = await fetch(`${backend}/trie/delete/${input}`, { method: "DELETE" });
    setResponse(JSON.stringify(await res.json(), null, 2));
  }

  async function handleVisualize() {
    const res = await fetch(`${backend}/trie/visualize`);
    const data = await res.json();
    setTreeData(data);     // <-- THIS IS THE MOST IMPORTANT LINE
    setResponse("Trie visualization updated below.");
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Trie Operations</h1>
<input
  type="text"
  className="border p-2 mr-4 bg-white text-black rounded"
  placeholder="Enter word"
  onChange={(e) => setInput(e.target.value)}
/>


      <div className="flex gap-3 mt-4">
        <button
          onClick={handleInsert}
          className="px-4 py-2 bg-blue-600 text-white"
        >
          Insert
        </button>

        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-yellow-600 text-white"
        >
          Search
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white"
        >
          Delete
        </button>

        <button
          onClick={handleVisualize}
          className="px-4 py-2 bg-purple-600 text-white"
        >
          Visualize
        </button>
      </div>

      {/* JSON Response */}
      <pre className="mt-6 bg-gray-900 text-green-300 p-4 rounded overflow-x-auto">
        {response}
      </pre>

      {/* TREE VISUALIZATION */}
      {treeData && (
        <div className="mt-10">
          <TreeVisualizer data={treeData} />
        </div>
      )}
    </div>
  );
}
