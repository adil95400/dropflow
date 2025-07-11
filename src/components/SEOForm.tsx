// src/components/SEOForm.tsx
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function SEOForm() {
  const [title, setTitle] = useState('')
  const [result, setResult] = useState<{
    title?: string
    description?: string
    keywords?: string
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/seo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })

    const data = await res.json()
    const content = data?.result?.content || ''
    const lines = content.split('\n')

    const titleMatch = lines.find((line) => line.startsWith('<title>')) || ''
    const descriptionMatch = lines.find((line) => line.includes('meta description')) || ''
    const keywordsMatch = lines.find((line) => line.includes('meta keywords')) || ''

    setResult({
      title: titleMatch.trim(),
      description: descriptionMatch.trim(),
      keywords: keywordsMatch.trim(),
    })

    setLoading(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="space-y-4 p-6">
        <h2 className="text-xl font-semibold">Générateur IA de balises SEO</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="Entrez le titre du produit..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Génération en cours...' : 'Générer les balises'}
          </Button>
        </form>

        {result && (
          <div className="space-y-2 mt-4">
            <p className="text-sm font-medium">Résultat :</p>
            <pre className="text-sm bg-muted p-4 rounded-md whitespace-pre-wrap">{`
${result.title}
${result.description}
${result.keywords}
            `.trim()}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
