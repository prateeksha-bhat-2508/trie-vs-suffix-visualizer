"use client";

import Tree from "react-d3-tree";

export default function TreeVisualizer({ data }: { data: any }) {
  const containerStyles = {
    width: "100%",
    height: "600px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    background: "white",
    padding: "10px",
  };

  return (
    <div style={containerStyles}>
      <Tree
        data={data}
        orientation="vertical"
        collapsible={false}
        translate={{ x: 300, y: 50 }}
      />
    </div>
  );
}
