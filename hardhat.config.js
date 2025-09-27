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
      url: "https://rpc.evm-testnet.kadena.io/rpc/chain/20",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 20,
    },
    "kadena-chain21": {
      url: "https://rpc.evm-testnet.kadena.io/rpc/chain/21",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 21,
    },
    "kadena-chain22": {
      url: "https://rpc.evm-testnet.kadena.io/rpc/chain/22",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 22,
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