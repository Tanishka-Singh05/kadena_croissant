#!/bin/bash

echo "🚀 Setting up Chainweb ZK Reputation System..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'.' -f1 | cut -d'v' -f2)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install smart contract dependencies
echo "📦 Installing smart contract dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "⚙️  Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created. Please add your private key to .env"
else
    echo "✅ .env file already exists"
fi

# Compile smart contracts
echo "🔨 Compiling smart contracts..."
npx hardhat compile

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your private key to the .env file"
echo "2. Deploy contracts: npx hardhat run scripts/deploy.js --network kadena-chain20"
echo "3. Start frontend: cd frontend && npm run dev"
echo ""
echo "🌐 The app will be available at http://localhost:3000"
echo ""
echo "📚 Check the README.md for detailed instructions"