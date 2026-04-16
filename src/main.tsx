// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ClerkWrapper } from './auth/Clerk.tsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/store.ts'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ClerkWrapper>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </ClerkWrapper>
  // </StrictMode>,
)
