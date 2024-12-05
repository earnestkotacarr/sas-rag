import { Link, Routes, Route } from "react-router-dom";

// Correct imports
import WelcomePage from './pages/WelcomePage';
import InformationCatalogPage from './pages/InformationCatalogPage';
import GraphVisualizationPage from './pages/GraphVisualizationPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-primary text-white p-4">
        <div className="container mx-auto flex flex-row items-center">
          <h2 className="text-xl font-semibold mr-6">SAS HERO</h2>
          <Link to="/" className="mr-4 hover:underline">
            ホーム
          </Link>
          <Link to="/catalog" className="mr-4 hover:underline">
            データー
          </Link>
          <Link to="/graph" className="mr-4 hover:underline">
            グラフ
          </Link>
          <Link to="/search" className="mr-4 hover:underline">
            サーチ
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/catalog" element={<InformationCatalogPage />} />
          <Route path="/graph" element={<GraphVisualizationPage />} />
          <Route path="/search" element={<SearchPage />} />
          {/* Optional: Catch-all route for undefined paths */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white p-4 text-center">
        SAS Hero runs on{' '}
        <a
          href="https://github.com/HKUDS/LightRAG"
          className="text-blue-300 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          LightRAG
        </a>.
      </footer>
    </div>
  );
}

export default App;
