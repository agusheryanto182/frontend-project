import { useEffect } from "react";

const CustomAlert = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    const handleClickOutside = (event) => {
      if (!event.target.closest(".alert-container")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center mt-10">
      <div
        className={`alert-container ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        } text-white p-4 rounded-md shadow-lg max-w-sm w-full flex items-center`}
      >
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 bg-transparent text-white font-bold"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
