# 🚀 AI-First Expo Mobile Template

A modern, production-ready React Native mobile application template built with Expo, Firebase, and TypeScript. Perfect for building cross-platform mobile apps with AI assistance from GitHub Copilot or Cursor.

## 📱 App Preview

<div align="center">
  
| Questionnaire Flow | Travel Illustration | Welcome Screen | Home Dashboard |
|:--:|:--:|:--:|:--:|
| ![Goals Screen](.github/images/goals-screen.png) | ![Travel Screen](.github/images/onboarding-travel.png) | ![Welcome Screen](.github/images/welcome-screen.png) | ![Home Screen](.github/images/home-screen.png) |
| Interactive goal selection | Beautiful world animation | Onboarding with Lottie | Main app dashboard |

</div>

## ✨ Features

### 🔐 Authentication & User Management
- Email/password authentication
- Apple Sign-In integration
- Google Sign-In ready
- Persistent authentication state
- User profile management
- Account deletion

### 🎯 Onboarding Experience
- Multi-step questionnaire flow
- Goal selection with beautiful UI
- Progress tracking
- Lottie animations
- Smooth navigation transitions

### 🎨 Modern UI/UX
- TailwindCSS styling with NativeWind
- Dark/light theme support
- Responsive design
- Haptic feedback
- Beautiful animations
- Icon system with Expo Symbols

### 🔥 Firebase Integration
- Firestore database
- Authentication services
- Real-time data sync
- Offline support
- Security rules ready

### 📱 Cross-Platform
- iOS and Android support
- Web compatibility
- Native performance
- Platform-specific optimizations

## 🛠 Tech Stack

- **Framework**: Expo (SDK 53+) with React Native
- **Language**: TypeScript
- **Routing**: Expo Router (file-based)
- **Styling**: TailwindCSS + NativeWind
- **State Management**: Zustand
- **Backend**: Firebase (Auth + Firestore)
- **Animations**: Lottie + Reanimated
- **Icons**: Expo Symbols
- **Development**: ESLint + Prettier

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g @expo/cli`
- iOS Simulator (Mac) or Android Studio

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone [your-repo-url]
   cd your-app-name
   npm install
   ```

2. **Set up Firebase**
   - Create a new Firebase project
   - Enable Authentication and Firestore
   - Copy your config and create `.env`:
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```

3. **Customize your app**
   - Update `app.json` with your app name and identifiers
   - Replace logo and splash screen in `assets/images/`
   - Modify app colors in `constants/theme-colors.ts`

4. **Start development**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
├── app/                    # 📱 Expo Router screens
│   ├── (auth)/            # 🔐 Authentication flow
│   ├── (onboarding)/      # 👋 User onboarding
│   ├── (tabs)/            # 📑 Main app navigation
│   └── _layout.tsx        # 🏗 Root layout
├── components/            # 🧩 Reusable components
│   ├── ui/               # 🎨 Base UI components
│   ├── onboarding/       # 👋 Onboarding components
│   └── questionnaire/    # ❓ Questionnaire flow
├── lib/                  # 🛠 Core utilities
│   └── firebase/         # 🔥 Firebase services
├── stores/               # 📦 Zustand state stores
├── types/                # 📝 TypeScript definitions
├── assets/               # 🎭 Images, fonts, animations
└── constants/            # ⚙️ App configuration
```

## 🎯 Key Screens

### Authentication Flow
- **Login**: Email/password + social sign-in
- **Signup**: Account creation with validation
- **Password Reset**: Secure password recovery

### Onboarding Experience
- **Welcome**: App introduction with animation
- **Questionnaire**: Multi-step goal selection
- **Progress**: Visual progress tracking

### Main Application
- **Home**: Main dashboard
- **Profile**: User settings and preferences

## 🔧 Customization Guide

### 1. App Branding
```typescript
// app.json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "scheme": "yourapp",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp"
    }
  }
}
```

### 2. Theme Colors
```typescript
// constants/theme-colors.ts
export const Colors = {
  light: {
    primary: '#4F46E5',
    secondary: '#7C3AED',
    // ... your colors
  },
  dark: {
    primary: '#6366F1',
    secondary: '#8B5CF6',
    // ... your colors
  }
};
```

### 3. Add New Screens
```typescript
// app/new-screen.tsx
import { Text } from '@/components/ui';
import { SafeAreaView } from 'react-native';

export default function NewScreen() {
  return (
    <SafeAreaView className="flex-1">
      <Text>Your new screen</Text>
    </SafeAreaView>
  );
}
```

### 4. Firebase Collections
```typescript
// lib/firebase/firestore.ts
export const FirestoreService = {
  // Add your custom database operations
  async createCustomDocument(data: any) {
    // Implementation
  }
};
```

## 🤖 AI-First Development

This template is optimized for AI-assisted development:

### GitHub Copilot
- Comprehensive code context in `AI_INSTRUCTIONS.md`
- Consistent patterns for better suggestions
- TypeScript interfaces for accurate completions

### Cursor AI
- Custom rules in `.cursorrules`
- Project-specific context
- Common patterns documented

### Best Practices
- Clear component structure
- Consistent naming conventions
- Detailed TypeScript types
- Comprehensive comments

## 📱 Building for Production

### Development Build
```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

### Production Build with EAS
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas init

# Build for stores
eas build --platform all
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Component testing (add your tests)
npm test
```

## 📄 License

MIT License - feel free to use this template for your projects!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

- 📖 [Expo Documentation](https://docs.expo.dev/)
- 🔥 [Firebase Documentation](https://firebase.google.com/docs)
- 🎨 [NativeWind Documentation](https://www.nativewind.dev/)
- ⚡ [Zustand Documentation](https://zustand-demo.pmnd.rs/)

---

**Happy coding!** 🎉 This template provides everything you need to build amazing mobile apps with AI assistance.
