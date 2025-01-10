import React from "react";
import Pagination from "./pagination";
import { useState, useEffect, useRef } from "react";
import SearchBar from "./search-bar";
import { useSearchParams } from "react-router-dom";
import CustomAlert from "./custom-alert";

const EmployeeTable = ({
  employees,
  onUpdateEmployee,
  onUpdateTotalEmployees,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [typeAlert, setTypeAlert] = useState("");
  const divisions = JSON.parse(localStorage.getItem("divisions")) || [];

  const closeAlert = () => {
    setAlertMessage(null);
    setTypeAlert("");
  };

  const toggleDropdown = (employeeId) => {
    setActiveDropdown((prev) => (prev === employeeId ? null : employeeId));
  };

  const itemsPerPage = 5;

  const filteredEmployees = Array.isArray(employees)
    ? employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const currentData = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteEmployee = (employee) => {
    const updatedEmployees = employees.filter((emp) => emp.id !== employee.id);

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setAlertMessage("Deleted successfully");
    setTypeAlert("success");

    onUpdateEmployee(updatedEmployees);
    onUpdateTotalEmployees(updatedEmployees.length);

    closePopup();
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    if (
      !updatedEmployee.name ||
      !updatedEmployee.email ||
      !updatedEmployee.phone ||
      !updatedEmployee.division ||
      !updatedEmployee.position
    ) {
      setAlertMessage("Please fill in all required fields.");
      setShowEditPopup(false);
      return;
    }

    const updatedEmployees = employees.map((employee) =>
      employee.id === updatedEmployee.id
        ? {
            ...employee,
            name: updatedEmployee.name,
            phone: updatedEmployee.phone,
            email: updatedEmployee.email,
            division: updatedEmployee.division,
            position: updatedEmployee.position,
            image: updatedEmployee.image || employee.image,
          }
        : employee
    );

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));

    onUpdateEmployee(updatedEmployees);

    setAlertMessage("Data has been updated");
    setTypeAlert("success");
    setShowEditPopup(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ search: searchTerm, page });
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setSearchParams({ search: term, page: 1 });
    setCurrentPage(1);
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEditPopup(true);
    setActiveDropdown(null);
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDeletePopup(true);
    setActiveDropdown(null);
  };

  const closePopup = () => {
    setShowEditPopup(false);
    setShowDeletePopup(false);
    setSelectedEmployee(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    const currentPage = parseInt(searchParams.get("page")) || 1;
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
      setSearchParams({ search: searchTerm, page: totalPages });
    }
  }, [searchParams]);
  return (
    <div className="p-6 bg-white dark:bg-black">
      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          type={typeAlert}
          onClose={closeAlert}
        />
      )}
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <div className="overflow-x-auto bg-white dark:bg-black shadow-md rounded-lg">
        <table className="min-w-full table-auto text-left border-collapse">
          <thead className="bg-gray-50 dark:bg-gray-800 dark:text-white text-gray-600">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Division</th>
              <th className="py-3 px-4">Position</th>
              <th className="py-3 px-4">Created At</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 dark:text-white">
            {currentData.map((employee) => (
              <tr
                key={employee.id}
                className="border-b hover:bg-gray-50 dark:hover:bg-gray-900"
                // onClick={() => toggleDropdown(employee.id)}
              >
                <td className="py-3 px-4 flex items-center">
                  <span className="h-8 w-8 bg-gray-200 dark:bg-white dark:text-black rounded-full flex items-center justify-center text-sm font-medium text-white mr-3">
                    {employee.image ? (
                      <img
                        src={employee.image}
                        alt={employee.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      employee.name.charAt(0).toUpperCase()
                    )}
                  </span>
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-gray-500 dark:text-white text-xs">
                      {employee.email}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-4">{employee.division}</td>
                <td className="py-3 px-4">{employee.position}</td>
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
                <td className="py-3 px-4 text-right relative">
                  <button
                    className="text-gray-600 dark:text-white hover:text-gray-900"
                    onClick={() => toggleDropdown(employee.id)}
                  >
                    •••
                  </button>
                  {activeDropdown === employee.id && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 -top-5 w-32 z-10  bg-white dark:bg-gray-800 shadow-lg rounded-md"
                    >
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white dark:hover:bg-white dark:hover:text-gray-900 hover:bg-gray-100"
                        onClick={() => handleEditClick(employee)}
                      >
                        Edit
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                        onClick={() => handleDeleteClick(employee)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {currentData.length === 0 && (
        <p className="text-center text-black dark:text-white my-4">
          {searchTerm !== "" ? "Employees not found" : "No employees yet"}
        </p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {showEditPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-md w-1/3">
            <h2 className="text-xl font-semibold ">Edit Employee</h2>
            <form>
              <label className="block mt-4 ">
                Name:
                <input
                  type="text"
                  value={selectedEmployee?.name}
                  className="w-full mt-2 p-2 border rounded dark:text-black "
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      name: e.target.value,
                    })
                  }
                />
              </label>
              <label className="block mt-4 ">
                Image:
                <input
                  type="file"
                  className="w-full mt-2 p-2 border rounded "
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      image: URL.createObjectURL(e.target.files[0]),
                    })
                  }
                />
              </label>
              <label className="block mt-4 ">
                Phone:
                <input
                  type="text"
                  value={selectedEmployee?.phone}
                  className="w-full mt-2 p-2 border rounded dark:text-black"
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      phone: e.target.value,
                    })
                  }
                />
              </label>
              <label className="block mt-4 ">
                Division:
                <select
                  value={selectedEmployee?.division}
                  className="w-full mt-2 p-2 border rounded dark:text-black "
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      division: e.target.value,
                    })
                  }
                >
                  <option value="">{selectedEmployee?.division}</option>
                  {divisions.map((division) => (
                    <option key={division.id} value={division.name}>
                      {division.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mt-4 ">
                Position:
                <input
                  type="text"
                  value={selectedEmployee?.position}
                  className="w-full mt-2 p-2 border rounded dark:text-black"
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      position: e.target.value,
                    })
                  }
                />
              </label>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 mr-2 bg-gray-200 dark:bg-gray-800 rounded"
                  onClick={closePopup}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-[var(--maroon)] text-white rounded mr-2"
                  onClick={() => {
                    if (selectedEmployee) {
                      handleUpdateEmployee(selectedEmployee);
                      closePopup();
                    }
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-md w-1/3">
            <h2 className="text-xl font-semibold">Confirm Delete</h2>
            <p className="mt-4">
              Are you sure you want to delete{" "}
              <span className="font-bold">{selectedEmployee?.name}?</span>
            </p>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="px-4 py-2 mr-2 bg-gray-200 rounded dark:text-black"
                onClick={closePopup}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={() => handleDeleteEmployee(selectedEmployee)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
