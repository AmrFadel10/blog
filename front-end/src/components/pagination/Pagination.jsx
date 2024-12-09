import React from "react";

function Pagination({ setCurrentPage, pageCount, currentPage }) {
  let pagesArr = [];
  for (let i = 1; i <= pageCount; i++) {
    pagesArr.push(i);
  }
  return (
    <div className="flex gap-3 items-center justify-center my-6">
      <button
        className={`${
          currentPage === 1
            ? "cursor-not-allowed pointer-events-none  bg-zinc-400"
            : "cursor-pointer bg-zinc-800 hover:bg-zinc-950"
        }  text-zinc-50 rounded-md py-1 px-6 text-sm`}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((num) => num - 1)}
      >
        Prev
      </button>
      {pagesArr.map((num) => (
        <div
          className={
            num === currentPage
              ? "bg-zinc-800 hover:bg-zinc-950 text-zinc-50 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer text-sm"
              : "bg-zinc-50 hover:bg-zinc-200 text-zinc-800 hover:text-zinc-800 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer text-sm border"
          }
          onClick={() => setCurrentPage(num)}
          key={num}
        >
          {num}
        </div>
      ))}
      <button
        className={`${
          currentPage === pageCount
            ? "cursor-not-allowed pointer-events-none  bg-zinc-400"
            : "cursor-pointer bg-zinc-800 hover:bg-zinc-950"
        }  text-zinc-50 rounded-md py-1 px-6 text-sm`}
        disabled={currentPage === pageCount}
        onClick={() => setCurrentPage((num) => num + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
