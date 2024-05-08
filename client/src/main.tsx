import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ThemeProviderLayout} from './components/ThemeProviderLayout.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className></div>
    <QueryClientProvider client={queryClient}>
      <ThemeProviderLayout>
        <App />
      </ThemeProviderLayout>
    </QueryClientProvider>
  </React.StrictMode>,
)
