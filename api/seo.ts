// api/seo.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ⚠️ NE PAS utiliser VITE_ ici, réservé au frontend
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  try {
    const { title } = req.body

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Tu es un expert SEO qui génère des balises optimisées pour des fiches produits e-commerce.',
        },
        {
          role: 'user',
          content: `Voici le titre du produit : ${title}`,
        },
      ],
    })

    return res.status(200).json({ result: completion.choices[0].message })
  } catch (error) {
    console.error('❌ Erreur OpenAI:', error)
    return res.status(500).json({ error: 'Erreur lors de la génération SEO' })
  }
}
