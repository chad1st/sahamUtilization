import { useState } from "react";

function BrokerFilterPage() {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const brokerGroups = {
    "Foreign / Asing (Mayoritas)": ["AI", "AK", "BK", "CG", "CS", "KZ", "MS", "RX", "ZP"],
    "Semi-Foreign / Semi-Domestic": ["CC", "YP", "KK", "DR", "YU", "LG", "SQ", "EP"],
    Retail: ["CC", "YP", "KK", "DR", "YU", "LG", "DH", "PD", "HP", "YB", "YJ", "SQ", "BQ", "AZ", "EP", "GR", "NI", "XC", "AT", "TP", "XL"],
    "Domestic Bandar": ["XA", "FZ", "FS", "IF", "MG", "IU", "RF", "CP", "CD", "OD", "AG", "KI", "AO", "HP"],
    "Bandar Kejam": ["MG", "YJ", "CP", "CD", "IF", "PO", "PC", "LS", "AK"],
    "Bandar Sadis": ["XA", "FZ", "FS", "YB", "KZ", "RX", "ZP"],
    "Bandar Santai": ["BK", "YU", "CS", "CG", "YP", "KK", "DR", "CC", "PD", "MS"],
  };

  const formattedQuery = query.trim().toUpperCase();

  const matchedGroups =
    formattedQuery === ""
      ? []
      : Object.entries(brokerGroups)
          .filter(([_, brokers]) => brokers.includes(formattedQuery))
          .map(([group]) => group);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Broker Filter</h1>
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition"
          >
            {showAll ? "🔍 Filter Mode" : "📋 Lihat Semua"}
          </button>
        </div>

        {/* Search Bar */}
        {!showAll && (
          <>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ketik kode broker (contoh: AK)"
              className="w-full p-3 border border-gray-300 rounded-md mb-6 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />

            {/* Search Result */}
            {formattedQuery === "" ? (
              <p className="text-gray-500 text-center">
                Masukkan kode broker di atas untuk melihat tipe-nya.
              </p>
            ) : matchedGroups.length === 0 ? (
              <p className="text-red-500 text-center">
                Tidak ditemukan broker dengan kode "{formattedQuery}".
              </p>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  Broker <span className="text-blue-600">{formattedQuery}</span>
                </h2>
                <p className="text-gray-600 mb-4">Termasuk dalam kategori:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {matchedGroups.map((group) => (
                    <span
                      key={group}
                      className="px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-full"
                    >
                      {group}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Show All Mode */}
        {showAll && (
          <div className="space-y-4">
            {Object.entries(brokerGroups).map(([group, brokers]) => (
              <div
                key={group}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
              >
                <h2 className="font-semibold text-blue-700 mb-2">{group}</h2>
                <div className="flex flex-wrap gap-2">
                  {brokers.map((code) => (
                    <span
                      key={code}
                      className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium"
                    >
                      {code}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BrokerFilterPage;
