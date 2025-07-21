export async function getBigBuyInfo(): Promise<any> {
  const response = await fetch('/api/bigbuy')
  return response.json()
}

