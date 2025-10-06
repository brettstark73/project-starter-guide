# Mobile App Starter Template

A minimal React Native starter with Expo, TypeScript, and a working counter example.

## Stack

- **Framework:** React Native with Expo SDK 52
- **Language:** TypeScript
- **Architecture:** Expo Managed Workflow
- **Navigation:** Ready for React Navigation
- **State:** Ready for Zustand/Redux
- **API Client:** Ready for React Query
- **Backend:** Ready for Supabase/Firebase
- **UI Library:** Ready for React Native Paper

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Or run on specific platform
npm run ios       # iOS Simulator
npm run android   # Android Emulator
npm run web       # Web browser
```

Scan the QR code with Expo Go app (iOS/Android) to preview on your device.

## Features

- ✅ TypeScript configuration
- ✅ Working counter example
- ✅ Expo Router ready
- ✅ Status bar component
- ✅ Responsive styling
- 🚧 Authentication (integration needed)
- 🚧 Navigation (React Navigation)
- 🚧 State management (Zustand/Redux)
- 🚧 API integration
- 🚧 Push notifications
- 🚧 Dark mode

## Project Structure

```
mobile-app/
├── App.tsx              # Main app component
├── app.json             # Expo configuration
├── assets/              # Images, fonts, etc.
├── tsconfig.json        # TypeScript configuration
└── package.json
```

## Development Tips

1. **Run on Physical Device**:
   - Install Expo Go from App Store/Play Store
   - Scan QR code from terminal

2. **iOS Simulator** (macOS only):
   ```bash
   npm run ios
   ```

3. **Android Emulator**:
   ```bash
   npm run android
   ```

4. **Web Browser**:
   ```bash
   npm run web
   ```

## Next Steps

1. **Navigation**: Add React Navigation
   ```bash
   npm install @react-navigation/native @react-navigation/native-stack
   npx expo install react-native-screens react-native-safe-area-context
   ```

2. **State Management**: Add Zustand
   ```bash
   npm install zustand
   ```

3. **Backend**: Integrate Supabase
   ```bash
   npm install @supabase/supabase-js
   npx expo install @react-native-async-storage/async-storage
   ```

4. **UI Library**: Add React Native Paper
   ```bash
   npm install react-native-paper react-native-safe-area-context
   ```

5. **Build for Production**:
   ```bash
   # iOS
   eas build --platform ios

   # Android
   eas build --platform android
   ```

## Resources

- [Mobile Applications Guide](../../docs/project-types/mobile-apps.md)
- [Technology Matrix](../../docs/technology-matrix.md)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
