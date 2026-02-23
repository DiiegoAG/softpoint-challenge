import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from './app/queryClient'
import Loader from './components/Loader'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<Loader />}>
                <App />
            </Suspense>
        </QueryClientProvider>
    </StrictMode>
)
