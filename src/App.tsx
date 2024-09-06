import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-primary text-white p-4">
        <div className="container mx-auto flex flex-row space-x-4">
          <h2>SAS HERO (Smart Search Demo)</h2>
          <Link to="/" className="mr-4">
            Home
          </Link>
        </div>
      </nav>
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
      <footer className="bg-primary text-white p-4 text-center">
        Footer content here
      </footer>
    </div>
  );
}

export default App;
