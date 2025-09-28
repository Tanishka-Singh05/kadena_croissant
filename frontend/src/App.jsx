import React from 'react';
import { WalletProvider } from './contexts/WalletContext';
import { ActivityProvider } from './contexts/ActivityContext';
import { ReputationProvider } from './contexts/ReputationContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { useWallet } from './contexts/WalletContext';
import LandingPage from './LandingPage';

function AppContent() {
  const { account, connectWallet, isConnecting } = useWallet()
  if (!account) {
    return <LandingPage onConnect={connectWallet} isConnecting={isConnecting} />
  }
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Dashboard />
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