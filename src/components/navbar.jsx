import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CustomAlert from "./custom-alert";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    const osPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return osPrefersDark ? "dark" : "light";
  });
  const [userShowDropdown, setUserShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [themeShowDropdown, setThemeShowDropdown] = useState(false);
  const [adminName, setAdminName] = useState(
    localStorage.getItem("adminName") || ""
  );
  const [showPopup, setShowPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleUpdateAdminName = () => {
    if (adminName === "") {
      setAlertMessage("Name is required");
      setAlertType("error");
      setShowPopup(false);
      return;
    } else if (adminName.length > 25) {
      setAlertMessage("Name is to long");
      setAlertType("error");
      setShowPopup(false);
      return;
    }
    localStorage.setItem("adminName", adminName);

    setAlertMessage("Data successfully updated");
    setAlertType("success");
    setShowPopup(false);
  };

  const handleAdminNameChange = (e) => {
    const { value } = e.target;
    setAdminName(value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserShowDropdown(false);
        setThemeShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      const osPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

      const updateSystemTheme = () => {
        if (osPrefersDark.matches) {
          root.classList.add("dark");
          root.classList.remove("light");
        } else {
          root.classList.add("light");
          root.classList.remove("dark");
        }
      };

      updateSystemTheme();
      osPrefersDark.addEventListener("change", updateSystemTheme);

      return () => {
        osPrefersDark.removeEventListener("change", updateSystemTheme);
      };
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (mode) => {
    setTheme(mode);
  };

  const closeAlert = () => {
    setAlertMessage(null);
    setAlertType("");
  };

  return (
    <nav className="flex items-center justify-between h-[100px] px-5 w-full shadow-sm bg-white text-black relative dark:bg-black dark:text-white">
      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          type={alertType}
          onClose={closeAlert}
        />
      )}
      <Link
        to="/"
        className="font-bold cursor-pointer text-[var(--hover-maroon)]"
      >
        E-Manage
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <div
            className="cursor-pointer hover:text-[var(--hover-maroon)]"
            onClick={() => setThemeShowDropdown(!themeShowDropdown)}
          >
            {theme === "light" ? (
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  clipPath="url(#a)"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                >
                  <path
                    d="M5 12H1M23 12h-4M7.05 7.05 4.222 4.222M19.778 19.778 16.95 16.95M7.05 16.95l-2.828 2.828M19.778 4.222 16.95 7.05"
                    strokeLinecap="round"
                  />

                  <path
                    d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                    fill="currentColor"
                    fillOpacity=".16"
                  />

                  <path d="M12 19v4M12 1v4" strokeLinecap="round" />
                </g>

                <defs>
                  <clipPath id="a">
                    <path fill="#ffffff" d="M0 0h24v24H0z" />
                  </clipPath>
                </defs>
              </svg>
            ) : theme === "dark" ? (
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z"
                  fill="currentColor"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 1024 1024"
                class="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M772.672 575.808V448.192l70.848-70.848a370.688 370.688 0 0 0-56.512-97.664l-96.64 25.92-110.528-63.808-25.92-96.768a374.72 374.72 0 0 0-112.832 0l-25.92 96.768-110.528 63.808-96.64-25.92c-23.68 29.44-42.816 62.4-56.576 97.664l70.848 70.848v127.616l-70.848 70.848c13.76 35.264 32.832 68.16 56.576 97.664l96.64-25.92 110.528 63.808 25.92 96.768a374.72 374.72 0 0 0 112.832 0l25.92-96.768 110.528-63.808 96.64 25.92c23.68-29.44 42.816-62.4 56.512-97.664l-70.848-70.848z m39.744 254.848l-111.232-29.824-55.424 32-29.824 111.36c-37.76 10.24-77.44 15.808-118.4 15.808-41.024 0-80.768-5.504-118.464-15.808l-29.888-111.36-55.424-32-111.168 29.824A447.552 447.552 0 0 1 64 625.472L145.472 544v-64L64 398.528A447.552 447.552 0 0 1 182.592 193.28l111.168 29.824 55.424-32 29.888-111.36A448.512 448.512 0 0 1 497.472 64c41.024 0 80.768 5.504 118.464 15.808l29.824 111.36 55.424 32 111.232-29.824c56.32 55.68 97.92 126.144 118.592 205.184L849.472 480v64l81.536 81.472a447.552 447.552 0 0 1-118.592 205.184zM497.536 627.2a115.2 115.2 0 1 0 0-230.4 115.2 115.2 0 0 0 0 230.4z m0 76.8a192 192 0 1 1 0-384 192 192 0 0 1 0 384z"
                  fill="currentColor"
                />
              </svg>
            )}
          </div>
          {themeShowDropdown && (
            <div
              ref={dropdownRef}
              className="absolute z-50 right-36 mt-8 w-48 bg-white rounded-md shadow-lg dark:bg-gray-800"
            >
              <ul>
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center gap-2 hover:rounded-md cursor-pointer text-black dark:text-white"
                  onClick={() => handleThemeChange("light")}
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      clipPath="url(#a)"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                    >
                      <path
                        d="M5 12H1M23 12h-4M7.05 7.05 4.222 4.222M19.778 19.778 16.95 16.95M7.05 16.95l-2.828 2.828M19.778 4.222 16.95 7.05"
                        strokeLinecap="round"
                      />

                      <path
                        d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                        fill="currentColor"
                        fillOpacity=".16"
                      />

                      <path d="M12 19v4M12 1v4" strokeLinecap="round" />
                    </g>

                    <defs>
                      <clipPath id="a">
                        <path fill="#ffffff" d="M0 0h24v24H0z" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Light</span>
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 dark:hover:bg-gray-900 hover:rounded-md cursor-pointer text-black dark:text-white"
                  onClick={() => handleThemeChange("dark")}
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z"
                      fill="currentColor"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Dark</span>
                </li>
                <li
                  className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-900 hover:rounded-md cursor-pointer text-black dark:text-white"
                  onClick={() => handleThemeChange("system")}
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 1024 1024"
                    class="icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M772.672 575.808V448.192l70.848-70.848a370.688 370.688 0 0 0-56.512-97.664l-96.64 25.92-110.528-63.808-25.92-96.768a374.72 374.72 0 0 0-112.832 0l-25.92 96.768-110.528 63.808-96.64-25.92c-23.68 29.44-42.816 62.4-56.576 97.664l70.848 70.848v127.616l-70.848 70.848c13.76 35.264 32.832 68.16 56.576 97.664l96.64-25.92 110.528 63.808 25.92 96.768a374.72 374.72 0 0 0 112.832 0l25.92-96.768 110.528-63.808 96.64 25.92c23.68-29.44 42.816-62.4 56.512-97.664l-70.848-70.848z m39.744 254.848l-111.232-29.824-55.424 32-29.824 111.36c-37.76 10.24-77.44 15.808-118.4 15.808-41.024 0-80.768-5.504-118.464-15.808l-29.888-111.36-55.424-32-111.168 29.824A447.552 447.552 0 0 1 64 625.472L145.472 544v-64L64 398.528A447.552 447.552 0 0 1 182.592 193.28l111.168 29.824 55.424-32 29.888-111.36A448.512 448.512 0 0 1 497.472 64c41.024 0 80.768 5.504 118.464 15.808l29.824 111.36 55.424 32 111.232-29.824c56.32 55.68 97.92 126.144 118.592 205.184L849.472 480v64l81.536 81.472a447.552 447.552 0 0 1-118.592 205.184zM497.536 627.2a115.2 115.2 0 1 0 0-230.4 115.2 115.2 0 0 0 0 230.4z m0 76.8a192 192 0 1 1 0-384 192 192 0 0 1 0 384z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>System</span>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div
          className="font-bold cursor-pointer hover:text-[var(--hover-maroon)]"
          onClick={() => setUserShowDropdown(!userShowDropdown)}
          tabIndex={0}
          role="button"
          aria-expanded={userShowDropdown}
          aria-haspopup="true"
          aria-label="Toggle dropdown menu"
        >
          {adminName}
        </div>
        {userShowDropdown && (
          <div
            ref={dropdownRef}
            className="absolute z-50 right-0 mt-32 w-48 bg-white rounded-md shadow-lg dark:bg-gray-800"
          >
            <ul>
              <li
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 hover:rounded-md cursor-pointer text-black dark:text-white"
                tabIndex={0}
                role="menuitem"
                onClick={() => setShowPopup(true)}
              >
                Edit
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 hover:rounded-md cursor-pointer text-red-500"
                tabIndex={0}
                role="menuitem"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}

        {showPopup && (
          <div className="fixed px-4 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-900 p-5 rounded shadow-lg w-[400px]">
              <h2 className="text-xl font-bold mb-3">Update data user</h2>
              <div className="mb-2">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={adminName}
                  onChange={handleAdminNameChange}
                  className="w-full border p-2 rounded dark:text-black"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[var(--maroon)] text-white rounded"
                  onClick={handleUpdateAdminName}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
