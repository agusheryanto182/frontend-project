import Navbar from "../components/navbar";
import AddEmployee from "../components/add-employee";
import Tab from "../components/tab";
import EmployeeTable from "../components/employee-table";
import { useState, useEffect } from "react";
import DivisionTable from "../components/division-table";

export default function Homepage() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "all";
  });

  const [employees, setEmployees] = useState(() => {
    const storedEmployees = localStorage.getItem("employees");
    return storedEmployees ? JSON.parse(storedEmployees) : [];
  });

  const [totalEmployees, setTotalEmployees] = useState(() => {
    const storedEmployees = localStorage.getItem("employees");
    return storedEmployees ? JSON.parse(storedEmployees).length : 0;
  });

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  const handleAddEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees(updatedEmployee);
  };

  const handleSetTotalEmployees = (updatedTotalEmployee) => {
    setTotalEmployees(updatedTotalEmployee);
  };

  return (
    <div className="mx-auto max-w-screen-xl">
      <Navbar />
      <br />
      <main>
        <div>
          <AddEmployee
            onAddEmployee={handleAddEmployee}
            onTotalEmployees={handleSetTotalEmployees}
            totalEmployees={totalEmployees}
          />
        </div>
        <div>
          <Tab activeTab={activeTab} setActiveTab={handleTabChange} />
        </div>
        <div>
          {activeTab === "all" && (
            <EmployeeTable
              employees={employees}
              onUpdateEmployee={handleUpdateEmployee}
              onUpdateTotalEmployees={handleSetTotalEmployees}
            />
          )}
          {activeTab === "divisions" && <DivisionTable />}
        </div>
      </main>
    </div>
  );
}
