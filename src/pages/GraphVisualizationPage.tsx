// src/pages/GraphVisualizationPage.tsx

export default function GraphVisualizationPage() {
  return (
    <div className="graph-page">
      <h1 className="text-3xl font-bold mb-6">アセット関係グラフ</h1>
      <h2 className="text-xl font-bold mb-6">
        ノードをダブルクリックしてドラッグすると検査できます。
        <br />
        2本の指でズームイン・ズームアウトします。
      </h2>
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
