export async function fetchSEOInfo(): Promise<any> {
  const response = await fetch('/api/seo')
  return response.json()
}

