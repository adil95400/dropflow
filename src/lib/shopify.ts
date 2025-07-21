export async function syncShopifyStore(): Promise<any> {
  const response = await fetch('/api/shopify')
  return response.json()
}

