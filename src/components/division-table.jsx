import React from "react";
import Pagination from "./pagination";
import { useState, useEffect } from "react";
import SearchBar from "./search-bar";
import { useSearchParams } from "react-router-dom";

const divisionsData = [
  {
    id: "1",
    name: "Full Stack",
    created_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    name: "Frontend",
    created_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: "3",
    name: "Backend",
    created_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: "4",
    name: "UI/UX Designer",
    created_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: "5",
    name: "Mobile Apps",
    created_at: "2022-01-01T00:00:00.000Z",
  },
  {
    id: "6",
    name: "QA",
    created_at: "2022-01-01T00:00:00.000Z",
  },
];

const DivisionTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [divisions] = useState(() => {
    const storedDivisions = localStorage.getItem("divisions");
    return storedDivisions ? JSON.parse(storedDivisions) : [];
  });

  useEffect(() => {
    if (!localStorage.getItem("divisions")) {
      localStorage.setItem("divisions", JSON.stringify(divisionsData));
    }
  }, []);

  const itemsPerPage = 5;

  const filteredEmployees = divisions.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const currentData = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ search: searchTerm, page });
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setSearchParams({ search: term, page: 1 });
    setCurrentPage(1);
  };

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setCurrentPage(parseInt(searchParams.get("page")) || 1);
  }, [searchParams]);
  return (
    <div className="p-6 bg-white dark:bg-black">
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <div className="overflow-x-auto bg-white dark:bg-black shadow-md rounded-lg">
        <table className="min-w-full table-auto text-left border-collapse">
          <thead className="bg-gray-50 dark:bg-gray-800 dark:text-white text-gray-600">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Created At</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 dark:text-white">
            {currentData.map((employee, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td className="py-3 px-4">{employee.name}</td>
                <td className="py-3 px-4">
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(new Date(employee.created_at))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DivisionTable;
