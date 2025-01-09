import React from "react";

// Define the type for the props
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {/* First Page Button */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`w-8 h-8 flex items-center justify-center rounded border ${
          currentPage === 1
            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
            : "text-gray-600 bg-white hover:bg-gray-200"
        }`}
      >
        &#171; {/* Double left arrow for "First" */}
      </button>

      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-8 h-8 flex items-center justify-center rounded border ${
          currentPage === 1
            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
            : "text-gray-600 bg-white hover:bg-gray-200"
        }`}
      >
        &lt; {/* Single left arrow for "Previous" */}
      </button>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 flex items-center justify-center rounded border ${
          currentPage === totalPages
            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
            : "text-gray-600 bg-white hover:bg-gray-200"
        }`}
      >
        &gt; {/* Single right arrow for "Next" */}
      </button>

      {/* Last Page Button */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 flex items-center justify-center rounded border ${
          currentPage === totalPages
            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
            : "text-gray-600 bg-white hover:bg-gray-200"
        }`}
      >
        &#187; {/* Double right arrow for "Last" */}
      </button>
    </div>
  );
};

export default Pagination;
