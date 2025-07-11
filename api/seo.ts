// api/seo.ts
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

export const config = {
  runtime: 'edge',
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Méthode non autorisée' }), { status: 405 })
  }

  try {
    const { title } = await req.json()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `Tu es un expert SEO. Génère les balises optimisées suivantes en JSON :
{
  "title": "...",
  "description": "...",
  "keywords": "..."
}`,
        },
        {
          role: 'user',
          content: `Titre du produit : ${title}`,
        },
      ],
    })

    const json = completion.choices[0].message?.content?.trim()
    const result = JSON.parse(json || '{}')

    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('❌ Erreur SEO OpenAI:', error)
    return new Response(JSON.stringify({ error: 'Erreur génération SEO' }), {
      status: 500,
    })
  }
}
