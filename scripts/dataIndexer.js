const axios = require('axios');
const { ethers } = require('hardhat');
require('dotenv').config();

const BLOCKSCOUT_APIS = {
    20: process.env.CHAIN20_API_URL || 'https://chain-20.evm-testnet-blockscout.chainweb.com/api',
    21: process.env.CHAIN21_API_URL || 'https://chain-21.evm-testnet-blockscout.chainweb.com/api',
    22: process.env.CHAIN22_API_URL || 'https://chain-22.evm-testnet-blockscout.chainweb.com/api'
};

const DOMAIN_MAPPING = {
    20: 0, // DEFI
    21: 1, // GAMING
    22: 2  // DEV
};

class ReputationIndexer {
    constructor(contractAddress, chainId) {
        this.contractAddress = contractAddress;
        this.chainId = chainId;
        this.contract = null;
    }

    async initialize() {
        const ReputationTracker = await ethers.getContractFactory("ReputationTracker");
        this.contract = ReputationTracker.attach(this.contractAddress);
        console.log(`Initialized indexer for chain ${this.chainId}`);
    }

    async fetchAddressTransactions(address, chainId, page = 1) {
        try {
            const apiUrl = BLOCKSCOUT_APIS[chainId];
            const response = await axios.get(`${apiUrl}/v2/addresses/${address}/transactions`, {
                params: {
                    page: page,
                    type: 'JSON'
                },
                timeout: 10000
            });

            return response.data;
        } catch (error) {
            console.error(`Error fetching transactions for ${address} on chain ${chainId}:`, error.message);
            return { items: [] };
        }
    }

    async fetchAddressTokenTransfers(address, chainId, page = 1) {
        try {
            const apiUrl = BLOCKSCOUT_APIS[chainId];
            const response = await axios.get(`${apiUrl}/v2/addresses/${address}/token-transfers`, {
                params: {
                    page: page,
                    type: 'JSON'
                },
                timeout: 10000
            });

            return response.data;
        } catch (error) {
            console.error(`Error fetching token transfers for ${address} on chain ${chainId}:`, error.message);
            return { items: [] };
        }
    }

    async analyzeUserActivity(address, chainId) {
        const transactions = await this.fetchAddressTransactions(address, chainId);
        const tokenTransfers = await this.fetchAddressTokenTransfers(address, chainId);

        const metrics = {
            transactionCount: 0,
            volumeUSD: 0,
            uniqueContracts: new Set(),
            liquidityDays: 0,
            achievements: 0,
            deployments: 0
        };

        // Analyze regular transactions
        if (transactions.items) {
            for (const tx of transactions.items) {
                metrics.transactionCount++;

                // Check if it's a contract deployment
                if (!tx.to_address) {
                    metrics.deployments++;
                }

                // Track unique contracts interacted with
                if (tx.to_address) {
                    metrics.uniqueContracts.add(tx.to_address.toLowerCase());
                }

                // Calculate volume (convert from hex to decimal, then to USD equivalent)
                if (tx.value && tx.value !== '0') {
                    const valueInEth = parseFloat(ethers.formatEther(tx.value));
                    metrics.volumeUSD += valueInEth * 2000; // Assuming 1 ETH = $2000 for demo
                }
            }
        }

        // Analyze token transfers for DeFi activity
        if (tokenTransfers.items) {
            for (const transfer of tokenTransfers.items) {
                // DeFi-specific logic
                if (chainId === 20) {
                    // Check for LP tokens or DEX interactions
                    if (transfer.token && transfer.token.name &&
                        (transfer.token.name.includes('LP') || transfer.token.name.includes('Pair'))) {
                        metrics.liquidityDays += 1; // Simplified: 1 day per LP transaction
                    }
                }

                // Gaming-specific logic
                if (chainId === 21) {
                    // Check for NFT transfers or game tokens
                    if (transfer.token && transfer.token.type === 'ERC-721') {
                        metrics.achievements += 1; // Treat NFT acquisitions as achievements
                    }
                }
            }
        }

        return {
            transactionCount: metrics.transactionCount,
            volumeUSD: Math.floor(metrics.volumeUSD * 1e18), // Convert to wei equivalent
            uniqueContracts: metrics.uniqueContracts.size,
            liquidityDays: metrics.liquidityDays,
            achievements: metrics.achievements,
            deployments: metrics.deployments
        };
    }

    async updateUserReputation(address, chainId) {
        if (!this.contract) {
            throw new Error('Contract not initialized');
        }

        const metrics = await this.analyzeUserActivity(address, chainId);
        const domain = DOMAIN_MAPPING[chainId];

        console.log(`Updating reputation for ${address} on chain ${chainId}:`, metrics);

        // Record each type of activity
        const activities = [
            ['transaction', metrics.transactionCount],
            ['volume', metrics.volumeUSD],
            ['contract', metrics.uniqueContracts],
            ['liquidity', metrics.liquidityDays],
            ['achievement', metrics.achievements],
            ['deployment', metrics.deployments]
        ];

        for (const [activityType, value] of activities) {
            if (value > 0) {
                try {
                    const tx = await this.contract.recordActivity(
                        address,
                        domain,
                        activityType,
                        value
                    );
                    await tx.wait();
                    console.log(`Recorded ${activityType}: ${value} for ${address}`);
                } catch (error) {
                    console.error(`Error recording ${activityType}:`, error.message);
                }
            }
        }
    }

    async indexMultipleUsers(addresses, chainIds) {
        for (const address of addresses) {
            for (const chainId of chainIds) {
                try {
                    await this.updateUserReputation(address, chainId);
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limiting
                } catch (error) {
                    console.error(`Error indexing ${address} on chain ${chainId}:`, error.message);
                }
            }
        }
    }

    async getReputationSummary(address) {
        if (!this.contract) {
            throw new Error('Contract not initialized');
        }

        try {
            const reputation = await this.contract.getUserReputation(address);
            return {
                defiScore: reputation.defiScore.toString(),
                gamingScore: reputation.gamingScore.toString(),
                devScore: reputation.devScore.toString(),
                totalScore: reputation.totalScore.toString(),
                lastUpdated: new Date(Number(reputation.lastUpdated) * 1000),
                isActive: reputation.isActive
            };
        } catch (error) {
            console.error(`Error fetching reputation for ${address}:`, error.message);
            return null;
        }
    }
}

// CLI interface
async function main() {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.log('Usage: node dataIndexer.js <contract_address> <command> [args...]');
        console.log('Commands:');
        console.log('  index <address> <chain_id>   - Index a single user on a specific chain');
        console.log('  batch <addresses...>         - Index multiple users across all chains');
        console.log('  query <address>              - Get reputation summary for an address');
        return;
    }

    const contractAddress = args[0];
    const command = args[1];

    const indexer = new ReputationIndexer(contractAddress, 20); // Default to chain 20
    await indexer.initialize();

    switch (command) {
        case 'index':
            if (args.length < 4) {
                console.log('Usage: node dataIndexer.js <contract> index <address> <chain_id>');
                return;
            }
            const address = args[2];
            const chainId = parseInt(args[3]);
            await indexer.updateUserReputation(address, chainId);
            break;

        case 'batch':
            const addresses = args.slice(2);
            await indexer.indexMultipleUsers(addresses, [20, 21, 22]);
            break;

        case 'query':
            if (args.length < 3) {
                console.log('Usage: node dataIndexer.js <contract> query <address>');
                return;
            }
            const queryAddress = args[2];
            const summary = await indexer.getReputationSummary(queryAddress);
            console.log('Reputation Summary:', JSON.stringify(summary, null, 2));
            break;

        default:
            console.log('Unknown command:', command);
    }
}

module.exports = { ReputationIndexer };

if (require.main === module) {
    main().catch(console.error);
}