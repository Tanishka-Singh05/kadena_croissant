require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    "kadena-chain20": {
      url: "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc",
      accounts: process.env.PRIVATE_KEY && process.env.PRIVATE_KEY !== "your_private_key_here" ? [process.env.PRIVATE_KEY] : [],
      chainId: 5920,
    },
    "kadena-chain21": {
      url: "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/21/evm/rpc",
      accounts: process.env.PRIVATE_KEY && process.env.PRIVATE_KEY !== "your_private_key_here" ? [process.env.PRIVATE_KEY] : [],
      chainId: 5921,
    },
    "kadena-chain22": {
      url: "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/22/evm/rpc",
      accounts: process.env.PRIVATE_KEY && process.env.PRIVATE_KEY !== "your_private_key_here" ? [process.env.PRIVATE_KEY] : [],
      chainId: 5922,
    },
  },
  etherscan: {
    apiKey: {
      "kadena-chain20": "dummy", // Blockscout doesn't require API key
      "kadena-chain21": "dummy",
      "kadena-chain22": "dummy",
    },
    customChains: [
      {
        network: "kadena-chain20",
        chainId: 20,
        urls: {
          apiURL: "https://chain-20.evm-testnet-blockscout.chainweb.com/api",
          browserURL: "https://chain-20.evm-testnet-blockscout.chainweb.com",
        },
      },
      {
        network: "kadena-chain21",
        chainId: 21,
        urls: {
          apiURL: "https://chain-21.evm-testnet-blockscout.chainweb.com/api",
          browserURL: "https://chain-21.evm-testnet-blockscout.chainweb.com",
        },
      },
      {
        network: "kadena-chain22",
        chainId: 22,
        urls: {
          apiURL: "https://chain-22.evm-testnet-blockscout.chainweb.com/api",
          browserURL: "https://chain-22.evm-testnet-blockscout.chainweb.com",
        },
      },
    ],
  },
};