import { useState } from "react";
import "./index.css";

// Import product logos
import ylabs from "./assets/ylabs.png";
import ymeets from "./assets/ymeetslogo.png";
import yims from "./assets/yims.png";
import yalies from "./assets/yalies.png";
import yaleclubs from "./assets/yaleclubs.svg";
import majoraudit from "./assets/majoraudit.png";
import coursetable from "./assets/coursetable.png";

const products = [
  { name: "Y Labs", logo: ylabs, url: "https://ylabs.yale.edu" },
  { name: "Y Meets", logo: ymeets, url: "https://ymeets.yale.edu" },
  { name: "Y IMS", logo: yims, url: "https://yims.yale.edu" },
  { name: "Yalies", logo: yalies, url: "https://yalies.io" },
  { name: "Yale Clubs", logo: yaleclubs, url: "https://clubs.yale.edu" },
  { name: "Major Audit", logo: majoraudit, url: "https://majoraudit.yale.edu" },
  { name: "CourseTable", logo: coursetable, url: "https://coursetable.com" },
];

export const HeaderModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Grid Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="YCS Products Menu"
      >
        <div className="grid grid-cols-3 gap-1 w-6 h-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-gray-600 rounded-sm" />
          ))}
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="fixed top-16 right-4 bg-white rounded-lg shadow-xl p-4 z-50 w-80">
            <div className="grid grid-cols-3 gap-4">
              {products.map((product) => (
                <a
                  key={product.name}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <img
                    src={product.logo}
                    alt={product.name}
                    className="w-10 h-10 object-contain mb-1"
                  />
                  <span className="text-xs text-center text-gray-700">
                    {product.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
