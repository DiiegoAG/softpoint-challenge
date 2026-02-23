import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'

import router from './router'
import Loader from './components/Loader'

function App() {
    return (
        <>
            <Suspense fallback={<Loader />}>
                <RouterProvider router={router} />
            </Suspense>

            <Toaster
                position="top-right"
                containerClassName="fixed !z-[99999]"
                toastOptions={{
                    style: {
                        fontFamily: '"Outfit", ui-sans-serif, system-ui, sans-serif'
                    },
                }}
            />
        </>
    )
}

export default App
