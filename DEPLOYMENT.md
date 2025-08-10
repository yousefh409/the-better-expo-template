# 🚀 Deployment Guide

This guide will help you deploy your app to the App Store and Google Play Store using EAS Build.

## Prerequisites

1. **EAS CLI**: Install globally
   ```bash
   npm install -g eas-cli
   ```

2. **Expo Account**: Sign up at [expo.dev](https://expo.dev)

3. **Apple Developer Account**: Required for iOS deployment ($99/year)

4. **Google Play Console Account**: Required for Android deployment ($25 one-time)

## Initial Setup

### 1. Login to Expo
```bash
eas login
```

### 2. Initialize EAS in your project
```bash
eas init
```

### 3. Configure your app
Update `app.json` with your production details:
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.yourcompany.yourapp",
      "versionCode": 1
    }
  }
}
```

## Building for Different Environments

### Development Build
Perfect for testing with development tools:
```bash
eas build --profile development --platform all
```

### Preview Build
For internal testing and TestFlight/Internal App Sharing:
```bash
eas build --profile preview --platform all
```

### Production Build
For App Store and Google Play Store:
```bash
eas build --profile production --platform all
```

## Platform-Specific Instructions

### iOS Deployment

1. **Create App Store Connect App**
   - Login to [App Store Connect](https://appstoreconnect.apple.com)
   - Create a new app with matching bundle identifier

2. **Build and Submit**
   ```bash
   # Build for production
   eas build --platform ios --profile production
   
   # Submit to App Store
   eas submit --platform ios
   ```

3. **TestFlight** (Optional)
   - Builds are automatically available in TestFlight
   - Add internal/external testers
   - Collect feedback before App Store release

### Android Deployment

1. **Create Google Play Console App**
   - Login to [Google Play Console](https://play.google.com/console)
   - Create a new app with matching package name

2. **Build and Submit**
   ```bash
   # Build for production
   eas build --platform android --profile production
   
   # Submit to Google Play
   eas submit --platform android
   ```

3. **Internal Testing** (Optional)
   - Use Internal App Sharing for quick testing
   - Set up closed testing tracks

## Environment Variables for Production

Create production environment variables:

```bash
# .env.production
EXPO_PUBLIC_FIREBASE_API_KEY=prod_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=prod_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=prod_project_id
# ... other production values
```

## App Store Optimization

### Assets Required

1. **App Icon**: 1024x1024px (provided in template)
2. **Screenshots**: Various sizes for different devices
3. **App Preview Videos**: Optional but recommended

### App Store Listing

1. **App Description**: Clear, compelling description
2. **Keywords**: Relevant search terms
3. **Categories**: Choose appropriate categories
4. **Age Rating**: Set appropriate content rating

## Continuous Integration

### GitHub Actions Example

Create `.github/workflows/build.yml`:

```yaml
name: EAS Build
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - name: Install dependencies
        run: npm install
      - name: Build
        run: eas build --platform all --non-interactive
```

## Monitoring and Analytics

### Crash Reporting
- Enable Crashlytics in Firebase
- Monitor crash reports regularly
- Fix critical issues quickly

### Performance Monitoring
- Use Firebase Performance Monitoring
- Track key user journeys
- Optimize slow operations

### Analytics
- Implement Firebase Analytics
- Track user engagement
- Monitor conversion funnels

## Post-Launch Checklist

- [ ] Monitor crash reports
- [ ] Check app store reviews
- [ ] Track user acquisition metrics
- [ ] Plan feature updates
- [ ] Set up customer support
- [ ] Monitor performance metrics

## Common Issues and Solutions

### Build Failures
- Check EAS build logs for detailed errors
- Ensure all dependencies are compatible
- Verify app configuration is correct

### Store Rejections
- Follow platform guidelines strictly
- Test thoroughly on real devices
- Ensure proper age ratings and content descriptions

### Performance Issues
- Optimize bundle size
- Use proper image formats and sizes
- Implement lazy loading for screens

## Support Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Policy](https://support.google.com/googleplay/android-developer/answer/9899234)
- [Expo Discord Community](https://chat.expo.dev/)

Good luck with your app launch! 🎉
