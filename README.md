# Chainweb ZK Reputation System

A multi-chain reputation system built on Kadena's Chainweb EVM. Track and aggregate reputation across DeFi, Gaming, and Development domains while maintaining privacy through zero-knowledge proofs.

**Project Live**: (https://kadenacroissant.vercel.app)

## Features

- **Multi-Chain Reputation**: Track reputation across Kadena EVM chains 20, 21, 22
- **Privacy-Preserving**: ZK proofs to verify reputation without revealing transaction details
- **Real-Time Updates**: Live reputation scoring based on on-chain activity
- **Cross-Domain Aggregation**: Combine DeFi, Gaming, and Development reputation scores

## Deployment Guide

### Prerequisites

- **Node.js 18+** 
- **MetaMask Browser Extension** 

### Step-by-Step Installation

#### 1. **Get the Code**
```bash
# Navigate to the directory
cd kadena_croissant
```

#### 2. **Install All Dependencies**
```bash
# Install smart contract dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

#### 3. **Setup Environment Variables**
```bash
# The .env file should already exist, if not:
# Windows: copy .env.example .env
# Linux/Mac: cp .env.example .env

# Edit .env file and replace "your_private_key_here" with your actual private key
```

**IMPORTANT: Get Your Private Key**
1. Open MetaMask
2. Click the 3 dots menu → Account Details → Export Private Key
3. Enter your password and copy the private key
4. Paste it in `.env` file (without the 0x prefix)

#### 4. **Compile Smart Contracts**
```bash
npx hardhat compile
```
Should show: "Compiled 4 Solidity files successfully"

#### 5. **Get Test KDA Tokens**
1. Go to [Kadena EVM Testnet Faucet](https://faucet.evm-testnet.kadena.io)
2. Connect your MetaMask wallet
3. Request test tokens for all chains (20, 21, 22)

#### 6. **Deploy Smart Contracts**
```bash
# Deploy to Chain 20 (DeFi)
npx hardhat run scripts/deploy.js --network kadena-chain20

# Save the contract address from the output!
```

#### 7. **Start the Frontend**
```bash
cd frontend
npm run dev
```

#### 8. **Setup MetaMask Networks**
Add these networks to MetaMask manually:

**Chain 20 (DeFi)**
- Network Name: `Kadena EVM Chain 20 (DeFi)`
- RPC URL: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc`
- Chain ID: `5920`
- Currency Symbol: `KDA`

**Chain 21 (Gaming)**
- Network Name: `Kadena EVM Chain 21 (Gaming)`
- RPC URL: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/21/evm/rpc`
- Chain ID: `5921`
- Currency Symbol: `KDA`

**Chain 22 (Development)**
- Network Name: `Kadena EVM Chain 22 (Development)`
- RPC URL: `https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/22/evm/rpc`
- Chain ID: `5922`
- Currency Symbol: `KDA`

#### 9. **Test the Application**
1. Connect your MetaMask wallet
2. Switch between chains using the chain selector
3. Execute test transactions to see reputation updates

## Testing

### Run Test Transactions

1. Connect your wallet to the desired chain
2. Use the "Test Transaction" feature in the UI
3. Confirm the transaction in MetaMask
4. Watch your reputation score update in real-time

## API Endpoints

### Kadena EVM Testnet

- **Chain 20 RPC**: `https://rpc.evm-testnet.kadena.io/rpc/chain/20`
- **Chain 21 RPC**: `https://rpc.evm-testnet.kadena.io/rpc/chain/21`
- **Chain 22 RPC**: `https://rpc.evm-testnet.kadena.io/rpc/chain/22`

### Blockscout APIs

- **Chain 20**: `https://chain-20.evm-testnet-blockscout.chainweb.com/api`
- **Chain 21**: `https://chain-21.evm-testnet-blockscout.chainweb.com/api`
- **Chain 22**: `https://chain-22.evm-testnet-blockscout.chainweb.com/api`

