"use client";

import { useState } from "react";
import TreeVisualizer from "@/components/TreeVisualizer";

export default function SuffixPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [treeData, setTreeData] = useState<any>(null);

  const backend = "http://127.0.0.1:8000";

  async function handleBuild() {
    const res = await fetch(`${backend}/suffix/build/${input}`, { method: "POST" });
    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  }

  async function handleSearch() {
    const res = await fetch(`${backend}/suffix/search/${input}`);
    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  }

  async function handleVisualize() {
    const res = await fetch(`${backend}/suffix/visualize`);
    const data = await res.json();
    setTreeData(data);  // <-- IMPORTANT
    setResponse("Suffix tree visualization updated below.");
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Suffix Tree (Compressed)</h1>

      <input
        type="text"
        className="border p-2 mr-4 bg-white text-black rounded"
        placeholder="Enter text / pattern"
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex gap-3 mt-4">
        <button onClick={handleBuild} className="px-4 py-2 bg-blue-600 text-white">
          Build Tree
        </button>
        <button onClick={handleSearch} className="px-4 py-2 bg-yellow-600 text-white">
          Search Pattern
        </button>
        <button onClick={handleVisualize} className="px-4 py-2 bg-purple-600 text-white">
          Visualize
        </button>
      </div>

      <pre className="mt-6 bg-gray-900 text-green-300 p-4 rounded overflow-x-auto">
        {response}
      </pre>

      {treeData && (
        <div className="mt-10">
          <TreeVisualizer data={treeData} />
        </div>
      )}
    </div>
  );
}
