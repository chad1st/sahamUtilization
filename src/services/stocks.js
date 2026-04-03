const BASE_URL = import.meta.env.VITE_API_URL;

export async function getStocks() {
  const res = await fetch(`/api/stocks`);
  if (!res.ok) throw new Error("Failed to fetch stocks");
  return res.json();
}

export async function deleteStock(id) {
  const res = await fetch(`/api/stocks/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete stock");
}

export async function createStock(data) {
  const res = await fetch(`/api/stocks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create stock");
  }

  return res.json();
}
