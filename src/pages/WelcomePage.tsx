import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <div className="welcome-page flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-5xl font-bold mb-6">Welcome to SAS Hero</h1>
      <h2 className="text-2xl font-light mb-8">
        SAS Hero integrates LLMs and Graphs to change how you interact with your data.
      </h2>
      <p className="text-lg mb-12 max-w-2xl">
        We aim to improve the information catalog search function by
        leveraging the relationships between files and models found in SAS Metadata to
        give you the most relevant assets for you to tackle your data analytics problems.
      </p>
      <Link to="/catalog">
        <button className="bg-primary text-white px-8 py-4 rounded-full text-xl hover:bg-secondary transition duration-300">
          Explore Now
        </button>
      </Link>
    </div>
  );
}
