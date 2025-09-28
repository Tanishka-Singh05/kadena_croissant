import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import LandingPage from './LandingPage.jsx'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
})

import { WalletProvider, useWallet } from './contexts/WalletContext'

function Main() {
  const { connectWallet, account } = useWallet();

  const handleConnect = async () => {
    await connectWallet();
    // No need to manually set showHome, just rely on account
  };

  return account ? <App /> : <LandingPage onConnect={handleConnect} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <Main />
      </WalletProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)