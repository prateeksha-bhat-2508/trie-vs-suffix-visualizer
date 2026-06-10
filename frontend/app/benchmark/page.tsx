"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";

// Register chart components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

export default function BenchmarkPage() {
  const [results, setResults] = useState<any>(null);

  const backend = "http://127.0.0.1:8000";

  async function runBenchmark() {
    const res = await fetch(`${backend}/benchmark`);
    const data = await res.json();
    setResults(data);
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Trie vs Suffix Trie Performance</h1>

      <button
        onClick={runBenchmark}
        className="px-6 py-3 bg-blue-600 text-white rounded"
      >
        Run Benchmark
      </button>

      {results && (
        <div className="mt-10">
          <Line
            data={{
              labels: results.sizes,
              datasets: [
                {
                  label: "Trie Insert Time (ms)",
                  data: results.trie_insert,
                  borderColor: "blue",
                },
                {
                  label: "Suffix Trie Build Time (ms)",
                  data: results.suffix_build,
                  borderColor: "red",
                },
              ],
            }}
          />
        </div>
      )}
    </div>
  );
}
