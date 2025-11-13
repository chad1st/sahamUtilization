import { useState } from "react";

export default function RightIssueCalculator() {
    // --- State declarations ---
    const [hargaHariIni, setHargaHariIni] = useState(0);
    const [hargaCumDate, setHargaCumDate] = useState(0);
    const [hargaRight, setHargaRight] = useState(0);
    const [ratio1, setRatio1] = useState(0);
    const [ratio2, setRatio2] = useState(0);
    const [jumlahPembelian, setJumlahPembelian] = useState(0);
    const [hargaLotPembelian, setHargaLotPembelian] = useState(0);


    // --- Derived Calculations (sample placeholder formulas) ---
    const hargaTeoretis =
        hargaCumDate && hargaRight && ratio1 && ratio2
            ? Math.round(
                (parseFloat(hargaCumDate) * ratio1 +
                    parseFloat(hargaRight) * ratio2) /
                (parseFloat(ratio1) + parseFloat(ratio2))
            ).toFixed(2)
            : 0;

    const jumlahLembar = jumlahPembelian * 100;
    const hmetd = (jumlahLembar ? Math.floor((jumlahLembar) * ratio2 / ratio1) : 0);
    const hmetdLot = Math.floor(hmetd / 100);
    const formatterUS = new Intl.NumberFormat('en-US');
    const formatterCurrency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    });
    const hargaKenaikan = (hargaTeoretis * jumlahLembar) - (jumlahLembar * hargaLotPembelian);
    const capitalGain1 = (jumlahLembar * (hargaHariIni - hargaTeoretis));
    const capitalGain2 = (hmetd * (hargaHariIni - hargaRight));

    return (
        <div className="flex flex-col items-center min-h-screen p-6 bg-gray-50 text-gray-800">
            <h1 className="text-4xl font-bold mb-10">Right Issue Calculator</h1>

            <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
                {/* Section 1: Harga */}
                <div className="col-span-2 bg-white shadow p-5 rounded-2xl">
                    <h2 className="text-xl font-semibold mb-4">Harga</h2>
                    <div className="space-y-3">
                        <Input label="Harga Hari Ini" value={hargaHariIni} onChange={setHargaHariIni} isMoney={true} />
                        <Input label="Harga Cum Date" value={hargaCumDate} onChange={setHargaCumDate} isMoney={true} />
                        <Input label="Harga Right Issues" value={hargaRight} onChange={setHargaRight} isMoney={true} />

                        <div className="flex items-center">
                            <p className="text-sm text-gray-600 mr-3 w-32">Rasio Right Issues</p>
                            <input
                                type="number"
                                placeholder="0"
                                className="w-1/3 p-2 border border-gray-300 rounded-l-md"
                                onChange={(e) => setRatio1(e.target.value)}
                            />
                            <span className="p-2 bg-gray-100 border border-gray-300">:</span>
                            <input
                                type="number"
                                placeholder="0"
                                className="w-1/3 p-2 border border-gray-300 rounded-r-md"
                                onChange={(e) => setRatio2(e.target.value)}
                            />
                        </div>

                        <Input label="Jumlah Lot Pembelian" value={jumlahPembelian} onChange={setJumlahPembelian} />
                        <Input label="Harga Lot Pembelian" value={hargaLotPembelian} onChange={setHargaLotPembelian} isMoney={true} />
                    </div>
                </div>

                {/* Section 2: Kepemilikan */}
                <div className="bg-white shadow p-5 rounded-2xl">
                    <h2 className="text-xl font-semibold mb-4">Jumlah Kepemilikan</h2>

                    <div className="space-y-3">
                        <CalculatedLabel label="Jumlah Lembar Saham" value={jumlahLembar} />
                        <CalculatedLabel label="HMETD" value={hmetd} />
                        <CalculatedLabel label="HMETD (Lot)" value={hmetdLot} />
                    </div>
                </div>

                {/* Section 3: Harga Teoretis */}
                <div className="bg-white shadow p-5 rounded-2xl">
                    <h2 className="text-xl font-semibold mb-4">Harga Teoretis</h2>
                    <p className="text-lg font-bold text-green-700">Rp{hargaTeoretis}</p>
                </div>

                {/* Section 4: Nilai Tebus & Pasca Tebus */}
                <div className="col-span-2 bg-white shadow p-5 rounded-2xl">
                    <h2 className="text-xl font-semibold mb-4">Nilai Tebus & Kepemilikan Pasca Tebus</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <CalculatedLabel label="Nilai Tebus" value={formatterCurrency.format(hargaRight * hmetd)} />
                        <CalculatedLabel label="Kepemilikan Pasca Tebus" value={formatterUS.format(jumlahLembar + hmetd)} />
                    </div>
                </div>

                {/* Section 5: Nilai Kepemilikan */}
                <div className="col-span-2 bg-white shadow p-5 rounded-2xl">
                    <h2 className="text-xl font-semibold mb-4">Nilai Kepemilikan</h2>
                    <div className="grid grid-cols-2 gap-2">
                        <CalculatedLabel
                            label="Nilai Kepemilikan Awal (Estimasi)"
                            value={formatterCurrency.format(jumlahLembar * hargaLotPembelian)}
                        />

                        <CalculatedLabel
                            label="Nilai Penyesuaian Setelah Harga Teoretis (Estimasi)"
                            value={formatterCurrency.format(hargaTeoretis * jumlahLembar)}
                        />

                        <CalculatedLabel
                            label="Kenaikan (Kerugian) Penyesuaian"
                            value={formatterCurrency.format(hargaKenaikan)}
                        />

                        <CalculatedLabel
                            label="Capital Gain dari Kepemilikan Awal (Pasca Penyesuaian Harga)"
                            value={formatterCurrency.format(
                                capitalGain1
                            )}
                        />

                        <CalculatedLabel
                            label="Capital Gain dari Kepemilikan Awal (Pasca Penyesuaian Harga)"
                            value={formatterCurrency.format(
                                capitalGain2
                            )}
                        />
                    </div>
                </div>

                {/* Section 6: Keuntungan / Kerugian */}
                <div className="col-span-2 bg-green-50 border border-green-300 p-5 rounded-2xl">
                    <h2 className="text-xl font-semibold mb-4 text-green-800">Keuntungan / Kerugian</h2>
                    <p className="text-2xl font-bold text-green-700">{formatterCurrency.format(hargaKenaikan+capitalGain1+capitalGain2)}</p>
                </div>
            </div>
        </div>
    );
}

// --- Reusable Input Component ---
function Input({ label, value, onChange, disabled, isMoney }) {
    const handleChange = (e) => {
        const raw = e.target.value;

        // Allow clearing the input
        if (raw === "") {
            onChange("");
            return;
        }

        // Store only numeric value
        onChange(Number(raw));
    };

    return (
        <div className="flex items-center">
            <label className="w-40 text-sm text-gray-700">{label}</label>

            <div className="relative flex-1">
                {isMoney && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
                        Rp
                    </span>
                )}

                <input
                    type="number"
                    value={value === 0 || value === "" ? value : value}
                    disabled={disabled}
                    onChange={handleChange}
                    placeholder="0"
                    className={`w-full p-2 border rounded-md ${isMoney ? "pl-8" : ""
                        } ${disabled
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                            : "focus:ring-blue-500 focus:border-blue-500"
                        }`}
                />
            </div>
        </div>
    );
}


function CalculatedLabel({ label, value }) {
    return (
        <div className="flex items-center">
            <label className="w-40 text-sm text-gray-700">{label}</label>
            <div className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 text-right select-none">
                {value !== undefined && value !== null && value !== "" ? value : "0"}
            </div>
        </div>
    );
}
