import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    pages.push(
      <button
        key={1}
        className={`px-2 py-1 ${
          currentPage === 1
            ? "text-gray-700 bg-gray-200"
            : "text-gray-500 hover:text-gray-700"
        } rounded`}
        onClick={() => onPageChange(1)}
      >
        1
      </button>
    );

    if (startPage > 2) {
      pages.push(<span key="start-ellipsis">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`px-2 py-1 ${
            currentPage === i
              ? "text-gray-700 bg-gray-200"
              : "text-gray-500 hover:text-gray-700"
          } rounded`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      pages.push(<span key="end-ellipsis">...</span>);
    }

    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          className={`px-2 py-1 ${
            currentPage === totalPages
              ? "text-gray-700 bg-gray-200"
              : "text-gray-500 hover:text-gray-700"
          } rounded`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        className={`text-gray-500 hover:text-gray-700 ${
          currentPage === 1 && "cursor-not-allowed text-gray-300"
        }`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <div className="flex space-x-2">{renderPageNumbers()}</div>
      <button
        className={`text-gray-500 hover:text-gray-700 ${
          currentPage === totalPages && "cursor-not-allowed text-gray-300"
        }`}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
