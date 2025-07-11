import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

type SEOResult = {
  title?: string
  description?: string
  keywords?: string
}

const SEOForm: React.FC = () => {
  const [title, setTitle] = useState('')
  const [result, setResult] = useState<SEOResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })

      const data = await res.json()

      if (res.ok) {
        setResult(data.result)
      } else {
        setResult({ title: 'Erreur', description: data.error })
      }
    } catch (err) {
      console.error(err)
      setResult({ title: 'Erreur', description: 'Erreur réseau' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <div>
        <Label htmlFor="title">Titre du produit</Label>
        <Input
          id="title"
          placeholder="Ex : Montre connectée fitness étanche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? '⏳ Génération...' : '✨ Générer SEO'}
      </Button>

      {result && (
        <div className="mt-6 space-y-4">
          <div>
            <Label>Titre SEO</Label>
            <Textarea value={result.title || ''} rows={2} readOnly />
          </div>
          <div>
            <Label>Méta Description</Label>
            <Textarea value={result.description || ''} rows={3} readOnly />
          </div>
          <div>
            <Label>Mots-clés</Label>
            <Textarea value={result.keywords || ''} rows={2} readOnly />
          </div>
        </div>
      )}
    </form>
  )
}

export default SEOForm
