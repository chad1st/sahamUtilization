import { useState } from "react";
import { calculateIpoResult } from "../utils/calculatorHelper";

export default function IPOCalculator() {
    // --- State declarations ---


    const [form, setForm] = useState({
        totalLotIpo: "0",
        ipoPrice: "0",
        estimasiSid: "0",
        oversub: "0",
    });

    function handleChange(e) {
        const { name, value } = e.target;

        // allow only numbers
        if (!/^\d*$/.test(value)) return;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const numericInput = {
        totalLotIpo: Number(form.totalLotIpo || 0),
        ipoPrice: Number(form.ipoPrice || 0),
        estimasiSid: Number(form.estimasiSid || 0),
        oversub: Number(form.oversub || 0),
    };

    const isValid =
        numericInput.totalLotIpo > 0 &&
        numericInput.ipoPrice > 0 &&
        numericInput.estimasiSid > 0;


    const result = isValid
        ? calculateIpoResult(numericInput)
        : null;

    const displayData = isValid
        ? [
            ["Total Lembar Saham", result.totalShares.toLocaleString("id-ID")],
            ["Nilai IPO (Rp)", result.ipoValue.toLocaleString("id-ID")],
            ["Golongan", result.golongan],
            ["Alokasi Normal", `${(result.alokasiNormal * 100).toFixed(2)}%`],
            ["Alokasi OverSub", `${(result.alokasiOversub * 100).toFixed(2)}%`],
            ["Alokasi Terpusat", `${(result.alokasiTerpusat * 100).toFixed(2)}%`],
            ["Total Lot Terpusat", `${result.totalLotTerpusat.toLocaleString("id-ID", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            })} Lot`],
            ["Lot Ritel", `${result.lotRitel.toLocaleString("id-ID", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            })} Lot`],
            ["Estimasi Investor Ritel", result.estimasiInvestor.toLocaleString("id-ID")],
        ]
        : [];

    // --- Derived Calculations (sample placeholder formulas) ---

    return (
        <div className="max-w-4xl mx-auto mt-12 px-4 space-y-10">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Input Data IPO
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Total Lot IPO
                        </label>
                        <input
                            type="text"
                            name="totalLotIpo"
                            value={form.totalLotIpo}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-md bg-white border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Harga IPO (Rp)
                        </label>
                        <input
                            type="text"
                            name="ipoPrice"
                            value={form.ipoPrice}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-md bg-white border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Jumlah Pemesan (Antrian Investor)
                        </label>
                        <input
                            type="text"
                            name="estimasiSid"
                            value={form.estimasiSid}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-md bg-white border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Oversub
                        </label>
                        <input
                            type="text"
                            name="oversub"
                            value={form.oversub}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-md bg-white border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">

                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-900">
                        Hasil Akhir Penjatahan
                    </h1>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                        {displayData.map(([label, value]) => (
                            <div
                                key={label}
                                className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2"
                            >
                                <span className="text-sm text-gray-600">
                                    {label}
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Highlight Result */}
                {isValid &&
                    <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            Allotment / Penjatahan
                        </span>
                        <span className="text-lg font-bold text-indigo-600">
                            {result.allotment}
                        </span>
                    </div>}

            </div>
        </div>
    );

}
