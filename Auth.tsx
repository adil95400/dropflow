export const triggerZap = async (event: string, payload: any) => {
  await fetch('/api/zapier', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, payload })
  })
}