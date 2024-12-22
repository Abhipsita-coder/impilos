import React from 'react';
import './App.scss'
import { lazy, Suspense } from 'react';
const PublicRoutes = lazy(()=>import('../PublicRoutes'))
function App() {
  return (
    <div id='app'>
      <Suspense fallback={<p>App Loading...</p>}>
      <PublicRoutes/>
      </Suspense>
    </div>
  )
}

export default App
