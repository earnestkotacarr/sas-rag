// src/pages/GraphVisualizationPage.tsx

export default function GraphVisualizationPage() {
  return (
    <div className="graph-page">
      <h1 className="text-3xl font-bold mb-6">MetaData Relationship Graph</h1>
      <h1 className="text-xl font-bold mb-6">Double Click & Drag on an element to Inspect; Use two fingers to zoom in & out</h1>
      <div className="iframe-container" style={{ width: '100%', height: '80vh' }}>
        <iframe
          src="/knowledge_graph.html"
          title="Graph Visualization"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        ></iframe>
      </div>
    </div>
  );
}
