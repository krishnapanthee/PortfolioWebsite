import { ArrowUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const BackToTop = ({ show }) => {
  const { theme } = useTheme();

  if (!show) return null;

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 bg-[#ff9800] w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center shadow-lg shadow-[#ff9800]/50 transition-all duration-300 hover:scale-110 hover:bg-[#e68a00] hover:shadow-xl z-[1000] ${
        theme === 'dark' ? '' : 'ring-2 ring-gray-200'
      }`}
      aria-label="Back to top"
    >
      <ArrowUp size={18} className={`${
        theme === 'dark' ? 'text-black' : 'text-white'
      } sm:w-5 sm:h-5 md:w-6 md:h-6 transition-colors duration-300`} />
    </button>
  );
};

export default BackToTop;