export async function syncAllProductsToShopify() {
  const response = await fetch("/api/sync_products_bulk", {
    method: "POST",
  });
  return await response.json();
}
