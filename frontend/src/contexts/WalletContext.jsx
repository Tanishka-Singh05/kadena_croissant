import React, { createContext, useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'

const WalletContext = createContext()

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState(null)

  const KADENA_NETWORKS = {
    5920: {
      chainId: '0x1720',
      chainName: 'Kadena EVM Chain 20 (DeFi)',
      nativeCurrency: {
        name: 'KDA',
        symbol: 'KDA',
        decimals: 18
      },
      rpcUrls: ['https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc'],
      blockExplorerUrls: ['https://chain-20.evm-testnet-blockscout.chainweb.com/']
    },
    5921: {
      chainId: '0x1721',
      chainName: 'Kadena EVM Chain 21 (Gaming)',
      nativeCurrency: {
        name: 'KDA',
        symbol: 'KDA',
        decimals: 18
      },
      rpcUrls: ['https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/21/evm/rpc'],
      blockExplorerUrls: ['https://chain-21.evm-testnet-blockscout.chainweb.com/']
    },
    5922: {
      chainId: '0x1722',
      chainName: 'Kadena EVM Chain 22 (Development)',
      nativeCurrency: {
        name: 'KDA',
        symbol: 'KDA',
        decimals: 18
      },
      rpcUrls: ['https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/22/evm/rpc'],
      blockExplorerUrls: ['https://chain-22.evm-testnet-blockscout.chainweb.com/']
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed')
      return
    }

    setIsConnecting(true)
    setError(null)

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      const provider = new ethers.BrowserProvider(window.ethereum)
      const network = await provider.getNetwork()

      setAccount(accounts[0])
      setProvider(provider)
      setChainId(Number(network.chainId))

      // If not on a Kadena chain, prompt to switch to chain 5920
      if (![5920, 5921, 5922].includes(Number(network.chainId))) {
        await switchChain(5920)
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      setError(error.message)
    } finally {
      setIsConnecting(false)
    }
  }

  const switchChain = async (targetChainId) => {
    if (!window.ethereum) return

    const chainConfig = KADENA_NETWORKS[targetChainId]
    if (!chainConfig) return

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainConfig.chainId }]
      })

      // Wait for provider and network to update after chain switch
      await new Promise(resolve => setTimeout(resolve, 700))

      // Optionally, re-initialize provider and chainId
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const network = await provider.getNetwork()
        setProvider(provider)
        setChainId(Number(network.chainId))
      }
    } catch (switchError) {
      // Log full error for debugging
      console.error('Switch chain error:', switchError)
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [chainConfig]
          })
          // Wait for provider and network to update after adding chain
          await new Promise(resolve => setTimeout(resolve, 700))
          if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const network = await provider.getNetwork()
            setProvider(provider)
            setChainId(Number(network.chainId))
          }
        } catch (addError) {
          console.error('Add chain error:', addError)
          setError('Failed to add Kadena network: ' + (addError.message || JSON.stringify(addError)))
        }
      } else {
        setError(`Failed to switch network: ${switchError.message || JSON.stringify(switchError)}`)
      }
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setProvider(null)
    setChainId(null)
    setError(null)
  }

  const getChainName = (chainId) => {
    const names = {
      5920: 'DeFi Chain',
      5921: 'Gaming Chain',
      5922: 'Development Chain'
    }
    return names[chainId] || `Chain ${chainId}`
  }

  const isKadenaChain = (chainId) => {
    return [5920, 5921, 5922].includes(chainId)
  }

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          setAccount(accounts[0])
        }
      }

      const handleChainChanged = (chainId) => {
        setChainId(parseInt(chainId, 16))
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [])

  const value = {
    account,
    provider,
    chainId,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    switchChain,
    getChainName,
    isKadenaChain,
    KADENA_NETWORKS
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}