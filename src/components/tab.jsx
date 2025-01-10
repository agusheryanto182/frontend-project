export default function Tab({ activeTab, setActiveTab }) {
  return (
    <div className="flex items-center gap-3 h-[100px] px-5 w-full bg-white text-black relative dark:bg-black dark:text-white">
      <div
        onClick={() => setActiveTab("all")}
        className={`cursor-pointer ${
          activeTab === "all"
            ? "text-[var(--maroon)] font-medium"
            : "hover:text-[var(--hover-maroon)]"
        }`}
      >
        <h1>All Employees</h1>
        <div
          className={`h-1 w-full mt-4 ${
            activeTab === "all"
              ? "bg-[var(--maroon)]"
              : "bg-white dark:bg-black"
          }`}
        ></div>
      </div>
      <div
        onClick={() => setActiveTab("divisions")}
        className={`cursor-pointer ${
          activeTab === "divisions"
            ? "text-[var(--maroon)] font-medium"
            : "hover:text-[var(--hover-maroon)]"
        }`}
      >
        <h1>Divisions</h1>
        <div
          className={`h-1 w-full mt-4 ${
            activeTab === "divisions"
              ? "bg-[var(--maroon)]"
              : "bg-white dark:bg-black"
          }`}
        ></div>
      </div>
    </div>
  );
}
