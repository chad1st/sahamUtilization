import { useState } from "react";
import RightIssueCalculator from "./RightIssueCalculator";
import BrokerFilterPage from "./BrokerFilter";

function HomePage() {
  const [activeMenu, setActiveMenu] = useState("Right Issue Calculator");

  const menus = [
    "Right Issue Calculator",
    "Bandarmology",
    "Tips and Tricks",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 p-6">
      {/* Navbar */}
      <nav className="max-w-4xl mx-auto mb-6 bg-white shadow-md rounded-xl">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-bold text-blue-700">BY Saham Utilization</h1>
          <ul className="flex space-x-4">
            {menus.map((menu) => (
              <li
                key={menu}
                onClick={() => setActiveMenu(menu)}
                className={`cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition ${
                  activeMenu === menu
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                }`}
              >
                {menu}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {activeMenu === "Right Issue Calculator" && <RightIssueCalculator />}
        {activeMenu === "Bandarmology" && ( <BrokerFilterPage />)}
        {activeMenu === "Stock Split Estimator" && (
          <div className="text-center text-gray-500 py-10">
            🧮 Stock Split Estimator coming soon...
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
