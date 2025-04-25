import { useState, useRef, useEffect } from "react";
import "./index.css";

// Import product logos
import ylabs from "./assets/ylabs.png";
import ymeets from "./assets/ymeetslogo.png";
import yims from "./assets/yims.png";
import yalies from "./assets/yalies.png";
import yaleclubs from "./assets/yaleclubs.svg";
import majoraudit from "./assets/majoraudit.png";
import coursetable from "./assets/coursetable.png";
import ycsLogo from "./assets/blackLogo.png";

const products = [
  { name: "CourseTable", logo: coursetable, url: "https://coursetable.com" },
  { name: "Yalies", logo: yalies, url: "https://yalies.io" },
  { name: "YaleClubs", logo: yaleclubs, url: "https://yaleclubs.io" },
  { name: "ymeets", logo: ymeets, url: "https://ymeets.com" },
  { name: "YaleIMs", logo: yims, url: "https://yaleims.com" },
  { name: "YLabs", logo: ylabs, url: "https://yalelabs.io" },
];

const inDevelopment = [
  { name: "MajorAudit", logo: majoraudit, url: "https://majoraudit.web.app/" },
];

export const HeaderModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<"left" | "right">("right");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const menuWidth = 288; // w-72 = 20rem = 320px
      const spaceOnRight = window.innerWidth - buttonRect.right;
      console.log(window.innerWidth, buttonRect.right, spaceOnRight);
      setPosition(spaceOnRight >= menuWidth ? "left" : "right");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="YCS Products Menu"
      >
        <img src={ycsLogo} alt="YCS Logo" className="w-8 h-8" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute ${position}-0 mt-2 bg-gray-500/10 rounded-xl p-4 z-50 w-80`}
        >
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <a
                key={product.name}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-2 hover:bg-gray-500/20 rounded-lg transition-colors"
              >
                <img
                  src={product.logo}
                  alt={product.name}
                  className="w-12 h-12 object-contain"
                />
                <span className="text-sm text-center text-gray-700 mt-2 font-semibold">
                  {product.name}
                </span>
              </a>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="mb-2 text-center text-gray-700">------ In Development ------</h3>
            <div className="grid grid-cols-3 gap-4">
            {inDevelopment.map((product) => (
              <div key={product.name} className="flex flex-col items-center p-2 hover:bg-gray-500/20 rounded-lg transition-colors">
                <img src={product.logo} alt={product.name} className="w-12 h-12 object-contain" />
                <span className="text-sm text-center text-gray-700 mt-2 font-semibold">
                  {product.name}
                </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
