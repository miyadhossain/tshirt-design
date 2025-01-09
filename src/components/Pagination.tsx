const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
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
        &lt;
      </button>

      {/* Page Numbers */}
      {generatePages().map((page) =>
        page === 1 ||
        page === totalPages ||
        Math.abs(currentPage - page) <= 1 ? (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center ${
              page === currentPage
                ? "bg-black text-white rounded-md"
                : "text-black hover:bg-gray-200 rounded-md"
            }`}
          >
            {page}
          </button>
        ) : page === currentPage + 2 || page === currentPage - 2 ? (
          <span key={page} className="w-8 h-8 flex items-center justify-center">
            ...
          </span>
        ) : null
      )}

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
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
