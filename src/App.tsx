import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Sidebar from './components/Sidebar'

// Pages principales
import Home from './pages/Home'
import Import from './pages/Import'
import Tracking from './pages/Tracking'
import SEO from './pages/SEO'
import Blog from './pages/Blog'
import CRM from './pages/CRM'
import Winners from './pages/Winners'
import Marketplace from './pages/Marketplace'
import Marketing from './pages/Marketing'
import Reviews from './pages/Reviews'
import SyncShopifyAdvanced from './pages/SyncShopifyAdvanced'
import OptimisationAI from './pages/OptimisationAI'

// Auth & Dashboard
import Auth from './pages/Auth'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-muted text-muted-foreground">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Routes>
          {/* Pages principales */}
          <Route path="/" element={<Home />} />
          <Route path="/import" element={<Import />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/seo" element={<SEO />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/winners" element={<Winners />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/sync-shopify" element={<SyncShopifyAdvanced />} />
          <Route path="/optimisation" element={<OptimisationAI />} />

          {/* Authentification */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
