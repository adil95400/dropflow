export async function syncProductsToShopify() {
  const response = await fetch("/api/sync_product", {
    method: "POST",
  });

  return await response.json();
}
