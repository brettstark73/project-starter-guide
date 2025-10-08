# Mobile App Starter Template

A minimal React Native starter with Expo, TypeScript, and a working counter example.

## Prerequisites

- **Node.js:** >=20.0.0
- **npm:** >=10.0.0
- **Expo CLI:** Latest (installed automatically with npx)
- iOS Simulator (macOS only) or Android Emulator or Expo Go app on physical device
- Basic understanding of React and React Native

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
npm install  # Install dependencies
npm start  # Start development server

# Or run on specific platform:
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
- 🚧 Testing (add Jest + React Native Testing Library when ready)

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

## Security & Data Handling

### Secure Storage

**Use Expo SecureStore for sensitive data:**

```typescript
import * as SecureStore from 'expo-secure-store';

// Store auth token securely (encrypted)
await SecureStore.setItemAsync('userToken', token);

// Retrieve token
const token = await SecureStore.getItemAsync('userToken');

// Delete on logout
await SecureStore.deleteItemAsync('userToken');
```

**❌ Never use AsyncStorage for:**
- Authentication tokens
- API keys
- User passwords
- Payment information

**✅ AsyncStorage is OK for:**
- User preferences (theme, language)
- Non-sensitive cache data
- UI state

### Secure Logging

**❌ Never log sensitive data:**
- User credentials, tokens
- Personal information (email, phone, address)
- Payment details
- API keys

**✅ Safe logging in development:**
```typescript
if (__DEV__) {
  console.log('User action:', {
    userId: user.id,  // ID only, not full user object
    action: 'button_press',
    screen: 'HomeScreen',
    // Never log: user.email, user.token, etc.
  });
}
```

**Production:** Use analytics services (Firebase Analytics, Mixpanel) instead of console logs.

### API Security

```typescript
// Store API URL in environment config
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com';

// Send auth token in headers (not in URL)
const response = await fetch(`${API_URL}/user`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

### Data Privacy

- **Permissions**: Request only necessary permissions (camera, location, etc.)
- **GDPR/CCPA**: Implement user data deletion
- **Offline Data**: Encrypt sensitive cached data
- **Biometric Auth**: Use for sensitive operations

See the [Security Guide](../../docs/security-guide.md) and [Mobile Apps Guide](../../docs/project-types/mobile-apps.md) for detailed best practices.

## Resources

- [Mobile Applications Guide](../../docs/project-types/mobile-apps.md)
- [Technology Matrix](../../docs/technology-matrix.md)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Docs](https://reactnavigation.org/)

## License

MIT License - see [LICENSE](../../LICENSE) for details.

**Author:** Customize the `author` field in `package.json` for your project.
