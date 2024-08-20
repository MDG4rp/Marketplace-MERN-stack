import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login'); // Modifica il percorso se necessario
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center">
      <div className="p-8">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to my app
        </h1>
        <p className="text-lg mb-8">
          Test Description
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-white text-blue-500 px-6 py-3 rounded-lg shadow-lg font-semibold hover:bg-gray-100 transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;