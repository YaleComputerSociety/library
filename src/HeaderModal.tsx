import { useState, useRef, useEffect, useCallback } from "react";
import "./index.css";

// Import product logos
import ylabs from "./assets/ylabs.png";
import ymeets from "./assets/ymeetslogo.png";
import yims from "./assets/yims2.png";
import yalies from "./assets/yalies.png";
import yaleclubs from "./assets/yaleclubs.png";
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

export const HeaderModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuClass, setMenuClass] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const menuWidth = 280; // w-72 = 20rem = 320px
      const padding = 16; // 1rem padding from screen edge

      // Check if menu would overflow on either side
      const spaceOnLeft = buttonRect.left - padding;
      const spaceOnRight = window.innerWidth - buttonRect.right - padding;

      if (spaceOnLeft < menuWidth / 2 && spaceOnRight > menuWidth / 2) {
        // If we're hitting the left edge but have space on the right
        return "left-0";
      } else if (spaceOnRight < menuWidth / 2 && spaceOnLeft > menuWidth / 2) {
        // If we're hitting the right edge but have space on the left
        return "right-0";
      } else {
        // Otherwise center it
        return "left-1/2 -translate-x-1/2";
      }
    }
    return "left-1/2 -translate-x-1/2"; // Default to centered
  };

  const handleResize = useCallback(() => {
    if (isOpen) {
      setMenuClass(calculatePosition());
    }
  }, [isOpen]);

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
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const handleButtonClick = () => {
    const newPosition = calculatePosition();
    setMenuClass(newPosition);
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="YCS Products Menu"
      >
        <img src={ycsLogo} alt="YCS Logo" className="w-8 h-8" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute ${menuClass} mt-4 bg-gray-500/10 rounded-xl py-4 px-4 z-50 w-72`}
        >
          <div className="grid grid-cols-3 gap-2">
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
                  className="w-10 h-10 object-contain"
                />
                <span className="text-xs text-center text-gray-700 mt-2 font-semibold">
                  {product.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
