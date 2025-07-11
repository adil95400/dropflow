import React from 'react'

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
import Auth from './pages/Auth'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

export interface AppRoute {
  path: string
  element: React.ReactElement
  label: string
}

const routes: AppRoute[] = [
  { path: '/', element: <Home />, label: 'Accueil' },
  { path: '/import', element: <Import />, label: 'Import' },
  { path: '/tracking', element: <Tracking />, label: 'Tracking' },
  { path: '/seo', element: <SEO />, label: 'SEO' },
  { path: '/blog', element: <Blog />, label: 'Blog' },
  { path: '/crm', element: <CRM />, label: 'CRM' },
  { path: '/winners', element: <Winners />, label: 'Winners' },
  { path: '/marketplace', element: <Marketplace />, label: 'Marketplace' },
  { path: '/marketing', element: <Marketing />, label: 'Marketing' },
  { path: '/reviews', element: <Reviews />, label: 'Reviews' },
  { path: '/sync-shopify', element: <SyncShopifyAdvanced />, label: 'Sync Shopify' },
  { path: '/optimisation', element: <OptimisationAI />, label: 'Optimisation' },
  { path: '/auth', element: <Auth />, label: 'Connexion' },
  { path: '/register', element: <Register />, label: 'Inscription' },
  { path: '/dashboard', element: <Dashboard />, label: 'Dashboard' },
]

export default routes