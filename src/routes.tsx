import React from 'react'

import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
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
import Register from './pages/Register'

export const routes = [
  { path: '/', element: <Home /> },
  { path: '/auth', element: <Auth /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/import', element: <Import /> },
  { path: '/tracking', element: <Tracking /> },
  { path: '/seo', element: <SEO /> },
  { path: '/blog', element: <Blog /> },
  { path: '/crm', element: <CRM /> },
  { path: '/winners', element: <Winners /> },
  { path: '/marketplace', element: <Marketplace /> },
  { path: '/marketing', element: <Marketing /> },
  { path: '/reviews', element: <Reviews /> },
  { path: '/sync-shopify', element: <SyncShopifyAdvanced /> },
  { path: '/optimisation', element: <OptimisationAI /> },
  { path: '/register', element: <Register /> },
]
