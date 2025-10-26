import { useTheme } from "../context/ThemeContext";

const About = () => {
  const { theme } = useTheme();

  return (
    <div
      id="about"
      className={`flex flex-col items-center justify-center py-16 sm:py-20 md:py-24 px-6 sm:px-8 ${
        theme === "dark" ? "bg-black" : "bg-white"
      } transition-colors duration-300`}
    >
      {/* Section Title */}
      <div className="mb-8 sm:mb-10 md:mb-12">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          } transition-colors duration-300`}
        >
          About <span className="text-orange-500">Me</span>
        </h2>
        <div className="w-20 h-1 bg-orange-500 mx-auto mt-3"></div>
      </div>

      {/* Content Container */}
      <div className="max-w-3xl w-full">
        <p
          className={`text-base sm:text-lg md:text-xl leading-relaxed ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          } text-center transition-colors duration-300`}
        >
          I'm a web developer from Nepal who enjoys building websites. I work
          with the MERN stack, TypeScript, and Next.js to create clean and
          functional projects.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12">
          <div
            className={`text-center p-4 rounded-lg ${
              theme === "dark" ? "bg-gray-900" : "bg-gray-50"
            } transition-colors duration-300`}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-2">
              5+
            </h3>
            <p
              className={`text-sm sm:text-base ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Technologies
            </p>
          </div>

          <div
            className={`text-center p-4 rounded-lg ${
              theme === "dark" ? "bg-gray-900" : "bg-gray-50"
            } transition-colors duration-300`}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-2">
              1+
            </h3>
            <p
              className={`text-sm sm:text-base ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Projects
            </p>
          </div>

          <div
            className={`text-center p-4 rounded-lg ${
              theme === "dark" ? "bg-gray-900" : "bg-gray-50"
            } transition-colors duration-300`}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-2">
              100%
            </h3>
            <p
              className={`text-sm sm:text-base ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Commitment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
