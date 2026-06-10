"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        Trie vs Suffix Tree Visualizer
      </h1>

      <div className="flex flex-col items-center gap-6">

        {/* Row 1 – Visualizers */}
        <div className="flex gap-6">
          <Link
            href="/trie"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Go to Trie
          </Link>

          <Link
            href="/suffix"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            Go to Suffix Tree
          </Link>
        </div>

        {/* Row 2 – Compare Page */}
        <Link
          href="/compare"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
        >
          Compare Both
        </Link>

        {/* Row 3 – Benchmark Graphs */}
        <Link
          href="/benchmark"
          className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
        >
          Benchmark Graphs
        </Link>

      </div>
    </div>
  );
}
