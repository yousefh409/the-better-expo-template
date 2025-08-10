#!/bin/bash

# AI-First Expo Mobile Template - Quick Start Script
# This script helps you get started with development quickly

echo "🚀 AI-First Expo Mobile Template - Quick Start"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node --version)"
    echo "   Please upgrade Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Check if Expo CLI is installed globally
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI globally..."
    npm install -g @expo/cli
fi

echo "✅ Expo CLI ready"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "✅ Dependencies installed"

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️  No .env file found. Would you like to:"
    echo "1) Run the interactive setup (recommended)"
    echo "2) Copy .env.example to .env (manual setup)"
    echo "3) Skip environment setup"
    
    read -p "Choose option (1-3): " choice
    
    case $choice in
        1)
            echo "🔧 Running interactive setup..."
            npm run setup
            ;;
        2)
            cp .env.example .env
            echo "📋 Copied .env.example to .env"
            echo "   Please edit .env with your Firebase configuration"
            ;;
        3)
            echo "⏭️  Skipping environment setup"
            echo "   You can run 'npm run setup' later or manually create .env"
            ;;
        *)
            echo "📋 Copying .env.example to .env (default)"
            cp .env.example .env
            ;;
    esac
fi

echo ""
echo "🎉 Setup complete! Here's what you can do next:"
echo ""
echo "📱 Development Commands:"
echo "   npm start          - Start Expo development server"
echo "   npm run ios        - Run on iOS simulator"
echo "   npm run android    - Run on Android emulator"
echo "   npm run web        - Run on web browser"
echo ""
echo "🔧 Setup Commands:"
echo "   npm run setup      - Interactive project setup"
echo "   npm run lint       - Check code quality"
echo ""
echo "📚 Documentation:"
echo "   README.md          - Complete setup guide"
echo "   AI_INSTRUCTIONS.md - AI development context"
echo "   DEVELOPMENT.md     - Development best practices"
echo "   DEPLOYMENT.md      - Production deployment guide"
echo ""
echo "🚀 To start developing, run: npm start"
echo ""
echo "Need help? Check the documentation or visit:"
echo "   📖 Expo Docs: https://docs.expo.dev"
echo "   🔥 Firebase Docs: https://firebase.google.com/docs"
echo "   🤖 AI Instructions: ./AI_INSTRUCTIONS.md"
echo ""
echo "Happy coding! 🎯"
