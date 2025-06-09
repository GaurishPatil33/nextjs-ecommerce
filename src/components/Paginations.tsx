import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Paginations: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
      <button
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {"< "}Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next{" >"}
      </button>
    </div>
  );
};

export default Paginations;
