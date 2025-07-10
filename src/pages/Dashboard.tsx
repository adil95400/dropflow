import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const [email, setEmail] = useState<string | null>(null)
  const [stats, setStats] = useState({
    products: 0,
    shops: 0,
    synced: 0,
    winners: 0,
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate('/auth')
      } else {
        setEmail(session.user.email)
        // Simulation des stats - à remplacer par des requêtes réelles Supabase
        setStats({
          products: 124,
          shops: 3,
          synced: 58,
          winners: 9,
        })
      }
    }
    fetchSession()
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/auth')
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold mb-2">Bienvenue sur DropFlow 👋</h1>
      {email && <p className="text-gray-500 mb-6">Connecté en tant que : <strong>{email}</strong></p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold">{stats.products}</h2>
          <p className="text-gray-600">Produits Importés</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold">{stats.shops}</h2>
          <p className="text-gray-600">Boutiques Connectées</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold">{stats.synced}</h2>
          <p className="text-gray-600">Produits Synchronisés</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold">{stats.winners}</h2>
          <p className="text-gray-600">Produits Gagnants</p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow"
      >
        Se déconnecter
      </button>
    </div>
  )
}
