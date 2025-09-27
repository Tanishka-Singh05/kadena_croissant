@echo off
echo 🚀 Setting up Chainweb ZK Reputation System...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version

REM Install smart contract dependencies
echo 📦 Installing smart contract dependencies...
call npm install

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
cd ..

REM Create .env file if it doesn't exist
if not exist .env (
    echo ⚙️  Creating .env file...
    copy .env.example .env
    echo ✅ .env file created. Please add your private key to .env
) else (
    echo ✅ .env file already exists
)

REM Compile smart contracts
echo 🔨 Compiling smart contracts...
call npx hardhat compile

echo.
echo 🎉 Setup complete!
echo.
echo Next steps:
echo 1. Add your private key to the .env file
echo 2. Deploy contracts: npx hardhat run scripts/deploy.js --network kadena-chain20
echo 3. Start frontend: cd frontend ^&^& npm run dev
echo.
echo 🌐 The app will be available at http://localhost:3000
echo.
echo 📚 Check the README.md for detailed instructions
pause