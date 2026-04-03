import { useEffect, useState } from "react";
import { getStocks, deleteStock, createStock } from "../services/stocks";

export default function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    code: "",
    targetPrice: "",
    signalBy: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getStocks()
      .then(data => setStocks(data))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    await deleteStock(id);
    setStocks(prev => prev.filter(stock => stock.id !== id));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      code: form.code.toUpperCase(),
      targetPrice: Number(form.targetPrice),
      signalBy: form.signalBy
    };

    try {
      const saved = await createStock(payload);
      setStocks(prev => [...prev, saved]);
      setForm({ code: "", targetPrice: "", signalBy: "" });
    } finally {
      setSubmitting(false);
    }
  }

  const formatPrice = price =>
    new Intl.NumberFormat("id-ID").format(price);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">

      {/* Add Stock Form */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Stock Code"
            value={form.code}
            onChange={e => setForm({ ...form, code: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="number"
            placeholder="Target Price"
            value={form.targetPrice}
            onChange={e => setForm({ ...form, targetPrice: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            placeholder="Signal By"
            value={form.signalBy}
            onChange={e => setForm({ ...form, signalBy: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-md px-4 py-2 text-sm font-medium"
          >
            {submitting ? "Adding..." : "Add Stock"}
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Code
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Target Price
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Signal By
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Created At
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {stocks.map(stock => (
              <tr
                key={stock.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2 text-sm text-gray-800">
                  {stock.code}
                </td>

                <td className="px-4 py-2 text-sm text-gray-800">
                  {formatPrice(stock.targetPrice)}
                </td>

                <td className="px-4 py-2 text-sm text-gray-800">
                  {stock.signalBy}
                </td>

                <td className="px-4 py-2 text-sm text-gray-600">
                  {new Date(stock.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-2">
                  <button
                    onClick={() =>
                      confirm("Delete this stock?") &&
                      handleDelete(stock.id)
                    }
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
