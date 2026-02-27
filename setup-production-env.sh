#!/bin/bash

# Deployment Environment Variables Setup Script
# This script helps you quickly set all required environment variables

echo "🚀 GoHighLevel Integration - Environment Variables Setup"
echo "=========================================================="
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
  echo "❌ Error: .env file not found!"
  echo "   Please make sure you're in the project root directory."
  exit 1
fi

echo "✅ Found .env file"
echo ""

# Detect hosting platform
echo "Which hosting platform are you using?"
echo "1) Netlify"
echo "2) Vercel"
echo "3) Other (show environment variables to copy manually)"
echo ""
read -p "Enter choice (1, 2, or 3): " platform_choice

echo ""

case $platform_choice in
  1)
    echo "📦 Setting up for Netlify..."
    echo ""
    
    # Check if Netlify CLI is installed
    if ! command -v netlify &> /dev/null; then
      echo "⚠️  Netlify CLI not found. Installing..."
      npm install -g netlify-cli
    fi
    
    echo "🔑 Setting environment variables in Netlify..."
    echo ""
    
    # Read .env and set each variable
    while IFS='=' read -r key value; do
      # Skip empty lines and comments
      if [[ ! -z "$key" && ! "$key" =~ ^# ]]; then
        # Remove quotes if present
        value=$(echo "$value" | sed 's/^"//;s/"$//')
        echo "Setting: $key"
        netlify env:set "$key" "$value"
      fi
    done < .env
    
    echo ""
    echo "✅ Environment variables set in Netlify!"
    echo "⚠️  You must now trigger a new deployment:"
    echo "   Run: netlify deploy --prod"
    echo "   Or go to Netlify dashboard → Deploys → Trigger deploy"
    ;;
    
  2)
    echo "📦 Setting up for Vercel..."
    echo ""
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
      echo "⚠️  Vercel CLI not found. Installing..."
      npm install -g vercel
    fi
    
    echo "🔑 Adding environment variables to Vercel..."
    echo ""
    echo "For each variable, you'll be prompted to paste the value."
    echo ""
    
    # Read .env and set each variable
    while IFS='=' read -r key value; do
      # Skip empty lines and comments
      if [[ ! -z "$key" && ! "$key" =~ ^# ]]; then
        # Remove quotes if present
        value=$(echo "$value" | sed 's/^"//;s/"$//')
        echo "Setting: $key"
        echo "$value" | vercel env add "$key" production
      fi
    done < .env
    
    echo ""
    echo "✅ Environment variables set in Vercel!"
    echo "⚠️  You must now redeploy:"
    echo "   Run: vercel --prod"
    ;;
    
  3)
    echo "📋 Copy these environment variables to your hosting platform:"
    echo "=============================================================="
    echo ""
    
    # Display all environment variables
    while IFS='=' read -r key value; do
      # Skip empty lines and comments
      if [[ ! -z "$key" && ! "$key" =~ ^# ]]; then
        echo "$key=$value"
      fi
    done < .env
    
    echo ""
    echo "=============================================================="
    echo ""
    echo "📝 Instructions:"
    echo "1. Copy all the above environment variables"
    echo "2. Go to your hosting platform's dashboard"
    echo "3. Navigate to Settings → Environment Variables"
    echo "4. Add each variable (key and value)"
    echo "5. Save and trigger a new deployment"
    ;;
    
  *)
    echo "❌ Invalid choice. Please run the script again and select 1, 2, or 3."
    exit 1
    ;;
esac

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. ✅ Environment variables are configured"
echo "2. 🚀 Trigger a new deployment on your hosting platform"
echo "3. 🧪 Test the form at: https://lpaespanol.denali-health.com"
echo "4. ✓  Check GoHighLevel for new leads"
echo ""
