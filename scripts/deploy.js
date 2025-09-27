const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying ReputationTracker to Kadena EVM chains...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Deploy the ReputationTracker contract
  const ReputationTracker = await ethers.getContractFactory("ReputationTracker");
  const reputationTracker = await ReputationTracker.deploy();

  await reputationTracker.waitForDeployment();
  const contractAddress = await reputationTracker.getAddress();

  console.log("ReputationTracker deployed to:", contractAddress);

  // Save deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    deployer: deployer.address,
    network: hre.network.name,
    deploymentTime: new Date().toISOString(),
    blockNumber: await deployer.provider.getBlockNumber()
  };

  console.log("Deployment Info:", JSON.stringify(deploymentInfo, null, 2));

  return contractAddress;
}

main()
  .then((contractAddress) => {
    console.log(`\nDeployment completed successfully!`);
    console.log(`Contract Address: ${contractAddress}`);
    console.log(`\nNext steps:`);
    console.log(`1. Verify the contract on Blockscout`);
    console.log(`2. Run the indexer: node scripts/dataIndexer.js ${contractAddress} batch <addresses>`);
    console.log(`3. Start the frontend with the contract address`);
  })
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exitCode = 1;
  });