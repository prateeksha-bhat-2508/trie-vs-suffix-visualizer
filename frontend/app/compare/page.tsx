"use client";

import { useEffect, useState } from "react";
import TreeVisualizer from "@/components/TreeVisualizer";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function ComparePage() {
  const [input, setInput] = useState("");
  const [trieData, setTrieData] = useState(null);
  const [suffixData, setSuffixData] = useState(null);
  const [stats, setStats] = useState(null);

  const backend = "http://127.0.0.1:8000";

  async function buildStructures() {
    // Build Trie
    await fetch(`${backend}/trie/insert/${input}`, { method: "POST" });
    const trieRes = await fetch(`${backend}/trie/visualize`);
    setTrieData(await trieRes.json());

    // Build Suffix Tree
    await fetch(`${backend}/suffix/build/${input}`, { method: "POST" });
    const suffixRes = await fetch(`${backend}/suffix/visualize`);
    setSuffixData(await suffixRes.json());
  }

  async function loadStats() {
    const res = await fetch(`${backend}/compare/stats`);
    setStats(await res.json());
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold mb-6">Trie vs Suffix Tree Comparison</h1>

      <input
        type="text"
        className="border p-2 mr-4 bg-white text-black rounded"
        placeholder="Enter text to visualize"
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={buildStructures}
        className="px-4 py-2 bg-blue-600 text-white mt-4"
      >
        Build Both Structures
      </button>

      <h2 className="text-2xl mt-10 mb-4">Visual Comparison</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl mb-3">Trie</h3>
          {trieData && <TreeVisualizer data={trieData} />}
        </div>

        <div>
          <h3 className="text-xl mb-3">Suffix Tree</h3>
          {suffixData && <TreeVisualizer data={suffixData} />}
        </div>
      </div>

      <h2 className="text-2xl mt-10 mb-4">Time Complexity Graphs</h2>
      {stats && (
        <Line
          data={{
            labels: stats.sizes,
            datasets: [
              {
                label: "Trie Insert Time (ms)",
                data: stats.trie_insert,
                borderColor: "rgb(75, 192, 192)"
              },
              {
                label: "Suffix Tree Build Time (ms)",
                data: stats.suffix_build,
                borderColor: "rgb(255, 99, 132)"
              }
            ]
          }}
        />
      )}
    </div>
  );
}
