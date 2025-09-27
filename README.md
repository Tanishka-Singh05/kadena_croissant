# Chainweb ZK Reputation System

A privacy-preserving, multi-chain reputation system built on Kadena's Chainweb EVM. Track and aggregate reputation across DeFi, Gaming, and Development domains while maintaining privacy through zero-knowledge proofs.

![Chainweb ZK Reputation](https://img.shields.io/badge/Kadena-EVM-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Build](https://img.shields.io/badge/build-passing-brightgreen)

## 🌟 Features

- **Multi-Chain Reputation**: Track reputation across Kadena EVM chains 20-22
- **Privacy-Preserving**: ZK proofs to verify reputation without revealing transaction details
- **Real-Time Updates**: Live reputation scoring based on on-chain activity
- **Beautiful UI**: Stunning interface with custom color palette
- **Cross-Domain Aggregation**: Combine DeFi, Gaming, and Development reputation scores

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Chain 20      │    │   Chain 21      │    │   Chain 22      │
│   (DeFi)        │    │   (Gaming)      │    │   (Development) │
│                 │    │                 │    │                 │
│ • Trading       │    │ • NFT Trading   │    │ • Contract      │
│ • Liquidity     │    │ • Achievements  │    │   Deployment    │
│ • Lending       │    │ • Gaming        │    │ • Code Quality  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Reputation     │
                    │  Aggregator     │
                    │  (ZK Proofs)    │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Hedera         │
                    │  Consensus      │
                    │  Anchor         │
                    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MetaMask or compatible wallet
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/chainweb-zkrep.git
   cd chainweb-zkrep
   ```

2. **Install dependencies**
   ```bash
   # Install smart contract dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your private key and configuration
   ```

4. **Compile smart contracts**
   ```bash
   npx hardhat compile
   ```

5. **Deploy to Kadena testnet**
   ```bash
   # Deploy to Chain 20 (DeFi)
   npx hardhat run scripts/deploy.js --network kadena-chain20
   ```

6. **Start the frontend**
   ```bash
   cd frontend
   npm run dev
   ```

Visit `http://localhost:3000` to see the application!

## 🔧 Configuration

### MetaMask Setup

Add Kadena EVM testnet networks to MetaMask:

**Chain 20 (DeFi)**
- Network Name: `Kadena EVM Chain 20 (DeFi)`
- RPC URL: `https://rpc.evm-testnet.kadena.io/rpc/chain/20`
- Chain ID: `20`
- Currency Symbol: `KDA`
- Block Explorer: `https://chain-20.evm-testnet-blockscout.chainweb.com/`

**Chain 21 (Gaming)**
- Network Name: `Kadena EVM Chain 21 (Gaming)`
- RPC URL: `https://rpc.evm-testnet.kadena.io/rpc/chain/21`
- Chain ID: `21`
- Currency Symbol: `KDA`
- Block Explorer: `https://chain-21.evm-testnet-blockscout.chainweb.com/`

**Chain 22 (Development)**
- Network Name: `Kadena EVM Chain 22 (Development)`
- RPC URL: `https://rpc.evm-testnet.kadena.io/rpc/chain/22`
- Chain ID: `22`
- Currency Symbol: `KDA`
- Block Explorer: `https://chain-22.evm-testnet-blockscout.chainweb.com/`

## 📊 Reputation Scoring

### DeFi Chain (Chain 20)
- **Transaction Volume**: `log(volume_USD) * 10 points`
- **Transaction Frequency**: `tx_count * 2 points`
- **Liquidity Provision**: `days_active * 5 points`
- **Smart Contract Interactions**: `unique_contracts * 3 points`

### Gaming Chain (Chain 21)
- **Game Transactions**: `tx_count * 1.5 points`
- **NFT Trading Volume**: `nft_volume * 0.1 points`
- **Achievements**: `achievements * 10 points`

### Development Chain (Chain 22)
- **Contract Deployments**: `deployments * 50 points`
- **Contract Interactions**: `interactions * 1 point`
- **Code Quality**: `efficiency_score * 20 points`

### Total Score Calculation
```
Total = (DeFi_Score * 0.4) + (Gaming_Score * 0.3) + (Dev_Score * 0.3)
```

## 🧪 Testing

### Run Test Transactions

1. Connect your wallet to the desired chain
2. Use the "Test Transaction" feature in the UI
3. Confirm the transaction in MetaMask
4. Watch your reputation score update in real-time

### Smart Contract Testing

```bash
npx hardhat test
```

### Data Indexing

```bash
# Index a specific user on all chains
node scripts/dataIndexer.js <contract_address> batch <user_address>

# Query reputation for a user
node scripts/dataIndexer.js <contract_address> query <user_address>
```

## 🎨 Color Palette

The UI uses a carefully crafted color palette:

- **Primary Light**: `#F9E0D9` - Warm background tones
- **Secondary**: `#E6DBD0` - Soft accents
- **Primary**: `#7D6167` - Main brand color
- **Accent Brown**: `#754F5B` - Rich accent
- **Accent Dark**: `#5D4954` - Deep contrast

## 📁 Project Structure

```
chainweb-zkrep/
├── contracts/              # Smart contracts
│   └── ReputationTracker.sol
├── scripts/                # Deployment and utility scripts
│   ├── deploy.js
│   └── dataIndexer.js
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   └── utils/          # Utility functions
│   └── public/
├── docs/                   # Documentation
└── README.md
```

## 🔗 API Endpoints

### Kadena EVM Testnet

- **Chain 20 RPC**: `https://rpc.evm-testnet.kadena.io/rpc/chain/20`
- **Chain 21 RPC**: `https://rpc.evm-testnet.kadena.io/rpc/chain/21`
- **Chain 22 RPC**: `https://rpc.evm-testnet.kadena.io/rpc/chain/22`

### Blockscout APIs

- **Chain 20**: `https://chain-20.evm-testnet-blockscout.chainweb.com/api`
- **Chain 21**: `https://chain-21.evm-testnet-blockscout.chainweb.com/api`
- **Chain 22**: `https://chain-22.evm-testnet-blockscout.chainweb.com/api`

## 🚧 Roadmap

- [x] Multi-chain reputation tracking
- [x] Beautiful UI with wallet integration
- [x] Real-time reputation updates
- [ ] ZK proof generation (Circom/Sindri)
- [ ] Self Protocol identity integration
- [ ] Hedera consensus anchoring
- [ ] Cross-chain ZK aggregation
- [ ] Advanced Sybil resistance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Kadena](https://kadena.io/) for the scalable Chainweb architecture
- [Self Protocol](https://selfprotocol.xyz/) for identity solutions
- [Hedera](https://hedera.com/) for consensus services
- [Blockscout](https://blockscout.com/) for blockchain exploration

## 📞 Support

- 🐛 [Report Issues](https://github.com/your-username/chainweb-zkrep/issues)
- 💬 [Join Discord](https://discord.gg/kadena)
- 📧 [Email Support](mailto:support@yourproject.com)

---

Built with ❤️ for ETHGlobal New Delhi 2025