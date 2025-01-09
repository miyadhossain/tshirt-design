"use client";

import { ApiResponse } from "@/app/page";
import { formatDateTime } from "@/utils/formatDateTime";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import RowsPerPage from "./RowsPerPage";

type CustomTableProps = {
  result: ApiResponse; // Use the ApiResponse type for the result prop
};

const CustomTable: React.FC<CustomTableProps> = ({ result }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string | null>(null); // Start with no sorting
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params}`);
    setCurrentPage(page);
  };

  const handleSelectPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("paginate", e.target.value);
    router.push(`${pathname}?${params}`);
  };

  // Handle sorting
  const handleSort = (column: string) => {
    if (sortBy === column) {
      // Toggle sort direction if the same column is clicked
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new column and reset direction to ascending
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  // Helper function to compare dates
  const compareDates = (a: string, b: string) => {
    return new Date(a).getTime() - new Date(b).getTime();
  };

  // Filter and sort data
  const filteredData = result?.data.sort((a, b) => {
    if (!sortBy) return 0; // No sorting applied if sortBy is null

    let compare = 0;

    // If sorting by date fields (Email Verified At, Created At, Updated At)
    if (
      sortBy === "email_verified_at" ||
      sortBy === "created_at" ||
      sortBy === "updated_at"
    ) {
      // Ensure the value is a string that can be parsed as a date
      const dateA = a[sortBy as keyof typeof a] as string | null;
      const dateB = b[sortBy as keyof typeof b] as string | null;

      if (dateA && dateB) {
        compare = compareDates(dateA, dateB);
      } else {
        compare = 0; // Treat null values as equal
      }
    } else {
      // Default string comparison (make sure the value is a string)
      const valA = a[sortBy as keyof typeof a];
      const valB = b[sortBy as keyof typeof b];

      if (typeof valA === "string" && typeof valB === "string") {
        compare = valA.localeCompare(valB);
      } else if (typeof valA === "number" && typeof valB === "number") {
        compare = valA - valB; // Numeric comparison
      } else {
        compare = 0; // If values are not comparable, treat them as equal
      }
    }

    return sortDirection === "asc" ? compare : -compare;
  });

  const handleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((row) => row.id));
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (search) {
        // Update the URL searchParams after 1 second if search value exists
        const newSearchParams = new URLSearchParams();
        newSearchParams.set("search", search);
        router.push(`${pathname}?${newSearchParams}`);
      } else {
        // If search field is cleared, remove the search parameter from the URL
        const newSearchParams = new URLSearchParams(window.location.search);
        newSearchParams.delete("search"); // Remove the "search" query param
        router.push(`${pathname}?${newSearchParams}`);
      }
    }, 500); // Delay of 1 second

    // Cleanup the timeout if the user types again before 1 second
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [search, router, pathname]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value); // Update the state when the input changes
  };

  const paginateRowsData = {
    current_page: result?.current_page,
    per_page: result?.per_page,
    total: result?.total,
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">User Information</h1>
      {/* Search Bar */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          {/* Table Head */}
          <thead className="bg-gray-50 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedRows.length === filteredData.length}
                  onChange={handleSelectAll}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </th>
              <th className="px-4 py-3">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center group"
                >
                  Name
                  <svg
                    className={`w-4 h-4 ml-1 text-gray-400 group-hover:text-gray-700 transform ${
                      sortBy === "name" && sortDirection === "asc"
                        ? "rotate-180"
                        : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>
              </th>
              <th className="px-4 py-3">
                <button
                  onClick={() => handleSort("email")}
                  className="flex items-center group"
                >
                  Email
                  <svg
                    className={`w-4 h-4 ml-1 text-gray-400 group-hover:text-gray-700 transform ${
                      sortBy === "email" && sortDirection === "asc"
                        ? "rotate-180"
                        : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>
              </th>
              <th className="px-4 py-3">
                <button
                  onClick={() => handleSort("email_verified_at")}
                  className="flex items-center group"
                >
                  Email Verified At
                  <svg
                    className={`w-4 h-4 ml-1 text-gray-400 group-hover:text-gray-700 transform ${
                      sortBy === "email_verified_at" && sortDirection === "asc"
                        ? "rotate-180"
                        : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>
              </th>
              <th className="px-4 py-3">
                <button
                  onClick={() => handleSort("created_at")}
                  className="flex items-center group"
                >
                  Created At
                  <svg
                    className={`w-4 h-4 ml-1 text-gray-400 group-hover:text-gray-700 transform ${
                      sortBy === "created_at" && sortDirection === "asc"
                        ? "rotate-180"
                        : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>
              </th>
              <th className="px-4 py-3">
                <button
                  onClick={() => handleSort("updated_at")}
                  className="flex items-center group"
                >
                  Updated At
                  <svg
                    className={`w-4 h-4 ml-1 text-gray-400 group-hover:text-gray-700 transform ${
                      sortBy === "updated_at" && sortDirection === "asc"
                        ? "rotate-180"
                        : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id}>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </td>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.email}</td>
                <td className="px-4 py-3">
                  {formatDateTime(row.email_verified_at || "")}
                </td>
                <td className="px-4 py-3">{formatDateTime(row.created_at)}</td>
                <td className="px-4 py-3">{formatDateTime(row.updated_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex space-x-6 justify-end items-center my-4">
        <RowsPerPage
          paginateRowsData={paginateRowsData}
          perPage={currentPage}
          handleSelectPerPage={handleSelectPerPage}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={result?.last_page}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CustomTable;
