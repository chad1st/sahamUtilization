import { useState } from "react";
import uwData from "../data/uw_track_record.json";

export default function UnderwriterTrackRecord() {
    const [search, setSearch] = useState("");
    const [filterMode, setFilterMode] = useState("UW"); // UW or Code

    // Group by UW
    const grouped = uwData.reduce((acc, item) => {
        const uw = item.UW || "Unknown";
        if (!acc[uw]) acc[uw] = [];
        acc[uw].push(item);
        return acc;
    }, {});

    const sortedUW = Object.keys(grouped).sort();

    // Filtering based on selected mode
    const filteredUW = sortedUW.filter((uw) => {
        if (!search.trim()) return true;

        const needle = search.toLowerCase();

        if (filterMode === "UW") {
            return uw.toLowerCase().includes(needle);
        }

        if (filterMode === "Code") {
            return grouped[uw].some((item) =>
                item.Code?.toLowerCase().includes(needle)
            );
        }

        return true;
    });

    const getBadgeColor = (record) => {
        if (!record) return "bg-gray-300 text-gray-800";
        if (record.toLowerCase().includes("hijau"))
            return "bg-green-200 text-green-900";
        if (record.toLowerCase().includes("merah"))
            return "bg-red-200 text-red-900";
        return "bg-blue-200 text-blue-900";
    };

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold mb-2">Underwriter Track Record</h1>

            {/* --- Filter Buttons --- */}
            <div className="flex gap-3 mb-3">
                <button
                    onClick={() => setFilterMode("UW")}
                    className={`px-4 py-2 rounded-lg border shadow-sm ${filterMode === "UW"
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700"
                        }`}
                >
                    Filter by Underwriter
                </button>

                <button
                    onClick={() => setFilterMode("Code")}
                    className={`px-4 py-2 rounded-lg border shadow-sm ${filterMode === "Code"
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700"
                        }`}
                >
                    Filter by Stock Code
                </button>
            </div>

            {/* Search bar (based on mode) */}
            <input
                type="text"
                placeholder={
                    filterMode === "UW"
                        ? "Search Underwriter..."
                        : "Search Stock Code..."
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            />

            {filteredUW.length === 0 && (
                <p className="text-gray-500 text-center mt-6">No results found.</p>
            )}

            {/* UW Groups */}
            <div className="space-y-6">
                {filteredUW.map((uw) => (
                    <div key={uw} className="bg-white rounded-xl shadow p-4">
                        <h2 className="text-xl font-semibold text-blue-700 mb-3">
                            Underwriter: {uw}
                        </h2>

                        {grouped[uw].map((item, idx) => (
                            <div
                                key={idx}
                                className="border rounded-lg p-4 shadow-sm bg-gray-50 mb-3"
                            >
                                <p>
                                    <strong>Code:</strong> {item.Code}
                                </p>
                                <p>
                                    <strong>Company:</strong> {item["Company Name"]}
                                </p>
                                <p>
                                    <strong>IPO Price:</strong> {item["IPO Price"]}
                                </p>

                                {/* Returns */}
                                <div className="mt-2">
                                    <p className="font-medium">Returns:</p>
                                    <div className="grid grid-cols-3 gap-1 text-sm mt-1 ml-1">
                                        {Array.from({ length: 7 }).map((_, i) => {
                                            const field = `Return D${i + 1}`;
                                            return (
                                                <div key={field} className="text-gray-700">
                                                    D{i + 1}: {item[field]}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Record Badge */}
                                <div className="mt-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(
                                            item.Record
                                        )}`}
                                    >
                                        {item.Record || "No Record"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
