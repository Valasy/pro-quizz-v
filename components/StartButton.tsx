// StartButton.tsx

const StartButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-8 py-2 px-4 border-2 border-black bg-transparent text-black rounded hover:bg-gray-200"
    >
      Comenzar
    </button>
  );
};

export default StartButton;

