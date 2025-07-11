import React from 'react'
import { Routes, Route } from 'react-router-dom'
import routes from './routes'

import Sidebar from './components/Sidebar'

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-muted text-muted-foreground">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Routes>
          {routes.map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}
        </Routes>
      </main>
    </div>
  )
}

export default App
