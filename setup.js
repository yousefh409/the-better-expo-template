#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
}

async function setupProject() {
  console.log('🚀 Welcome to the AI-First Expo Mobile Template Setup!\n');
  
  // Get app details
  const appName = await ask('What is your app name? (e.g., "My Awesome App"): ');
  const appSlug = await ask('What is your app slug? (e.g., "my-awesome-app"): ');
  const bundleId = await ask('What is your bundle identifier? (e.g., "com.yourcompany.yourapp"): ');
  const scheme = await ask('What is your URL scheme? (e.g., "myawesomeapp"): ');
  
  console.log('\n📱 Updating app configuration...');
  
  // Update app.json
  const appJsonPath = path.join(__dirname, 'app.json');
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  
  appJson.expo.name = appName || 'My Mobile App';
  appJson.expo.slug = appSlug || 'my-mobile-app';
  appJson.expo.scheme = scheme || 'mymobileapp';
  appJson.expo.ios.bundleIdentifier = bundleId || 'com.yourcompany.mymobileapp';
  
  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
  
  // Update package.json
  const packageJsonPath = path.join(__dirname, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  packageJson.name = appSlug || 'my-mobile-app';
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  console.log('✅ App configuration updated!');
  
  // Create .env file
  const createEnv = await ask('\n🔧 Would you like to set up Firebase now? (y/n): ');
  
  if (createEnv.toLowerCase() === 'y' || createEnv.toLowerCase() === 'yes') {
    console.log('\n🔥 Firebase Configuration:');
    const apiKey = await ask('Firebase API Key: ');
    const authDomain = await ask('Auth Domain: ');
    const projectId = await ask('Project ID: ');
    const storageBucket = await ask('Storage Bucket: ');
    const messagingSenderId = await ask('Messaging Sender ID: ');
    const appId = await ask('App ID: ');
    
    const envContent = `# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=${apiKey}
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=${authDomain}
EXPO_PUBLIC_FIREBASE_PROJECT_ID=${projectId}
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=${storageBucket}
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${messagingSenderId}
EXPO_PUBLIC_FIREBASE_APP_ID=${appId}

# Optional: Firebase Measurement ID for Analytics
# EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id_here

# App Configuration (Optional)
# EXPO_PUBLIC_APP_VERSION=1.0.0
# EXPO_PUBLIC_API_BASE_URL=https://api.yourapp.com
`;
    
    fs.writeFileSync(path.join(__dirname, '.env'), envContent);
    console.log('✅ .env file created!');
  } else {
    console.log('📋 You can set up Firebase later by copying .env.example to .env and filling in your details.');
  }
  
  console.log('\n🎉 Setup complete!');
  console.log('\nNext steps:');
  console.log('1. Run "npm install" to install dependencies');
  console.log('2. Run "npm start" to start the development server');
  console.log('3. Customize your app by editing the files in the app/ directory');
  console.log('4. Check out AI_INSTRUCTIONS.md for AI development tips');
  console.log('\nHappy coding! 🚀');
  
  rl.close();
}

setupProject().catch(console.error);
