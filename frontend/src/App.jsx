import React, { Suspense, lazy } from 'react';
import { WalletProvider } from './contexts/WalletContext';
import { ActivityProvider } from './contexts/ActivityContext';
import { ReputationProvider } from './contexts/ReputationContext';
import Header from './components/Header';
import { useWallet } from './contexts/WalletContext';
import LandingPage from './LandingPage';

const Dashboard = lazy(() => import('./components/Dashboard'));

function AppContent() {
  const { account, connectWallet, isConnecting } = useWallet()
  if (!account) {
    return <LandingPage onConnect={connectWallet} isConnecting={isConnecting} />
  }
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>}>
          <Dashboard />
        </Suspense>
      </main>
    </>
  )
}

function App() {
  return (
    <WalletProvider>
      <ActivityProvider>
        <ReputationProvider>
          <AppContent />
        </ReputationProvider>
      </ActivityProvider>
    </WalletProvider>
  )
}

export default App