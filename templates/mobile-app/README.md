# Mobile App Starter Template

A React Native Expo starter template with TypeScript, navigation, and essential mobile app features.

**Complexity Level:** 2 | **Timeline:** 2-3 days | **Tech Stack:** React Native + Expo + TypeScript

> Need the one-page checklist? See the shared [Template Quick-Start Guide](../../docs/template-quickstart.md#mobile-app-expo--react-native).

## Features

- 📱 **React Native** with Expo SDK for cross-platform development
- 🔷 **TypeScript** for type safety and better development experience
- 🧭 **React Navigation** for screen navigation
- 🎨 **Modern UI** with consistent styling
- 📱 **Safe Area Support** for modern devices
- ✅ **ESLint** configuration for code quality
- 🧪 **Jest** testing setup
- 🚀 **EAS Build** ready for app store deployment

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Quality Automation** (Recommended)
   ```bash
   # Add comprehensive quality automation
   npx create-quality-automation@latest
   npm install && npm run prepare

   # React Native + TypeScript quality checks
   npm run lint        # ESLint for React Native + TypeScript
   npm run format      # Prettier for JSX/TypeScript
   npm run security:audit  # Mobile security vulnerability scanning
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

3. **Run on Device/Simulator**
   ```bash
   # iOS Simulator
   npm run ios

   # Android Emulator
   npm run android

   # Web Browser
   npm run web
   ```

4. **Scan QR Code** with Expo Go app on your device

## Project Structure

```
mobile-app/
├── src/
│   ├── screens/             # App screens
│   │   ├── HomeScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── components/          # Reusable components
│   ├── types/               # TypeScript type definitions
│   │   └── navigation.ts
│   └── utils/               # Utility functions
├── App.tsx                  # App entry point
├── package.json
└── README.md
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Building for Production

### Expo Application Services (EAS)

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Configure EAS**
   ```bash
   eas build:configure
   ```

3. **Build for Android**
   ```bash
   npm run build:android
   ```

4. **Build for iOS**
   ```bash
   npm run build:ios
   ```

## Customization

### 1. App Configuration
Add an Expo configuration file (`app.config.ts` or `app.json`) to customize:
- App name and description
- Icon and splash screen
- App store information
- Permissions

### 2. Navigation
Add new screens in `src/screens/` and register them in `App.tsx`:
```typescript
<Stack.Screen
  name="NewScreen"
  component={NewScreen}
  options={{ title: 'New Screen' }}
/>
```

### 3. Styling
The template uses StyleSheet for consistent styling:
- Colors: Update color palette in styles
- Typography: Consistent font sizes and weights
- Spacing: Standardized padding and margins

### 4. Components
Create reusable components in `src/components/`:
```typescript
// src/components/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}

export default function Button({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
```

## Adding Features

### State Management
For complex state, add Redux Toolkit or Zustand:
```bash
npm install @reduxjs/toolkit react-redux
```

### API Integration
Add Axios or fetch for API calls:
```bash
npm install axios
```

### Push Notifications
Add Expo Notifications:
```bash
expo install expo-notifications
```

### Local Storage
Add AsyncStorage:
```bash
expo install @react-native-async-storage/async-storage
```

### Camera
Add Expo Camera:
```bash
expo install expo-camera
```

## Testing

### Unit Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test
npm test -- App.test.tsx
```

The template includes starter tests in `__tests__/` that verify the navigation shell and profile screen layout. Use them as a reference when adding new screens.

### Example Test
```typescript
// __tests__/HomeScreen.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';

const mockNavigation = {
  navigate: jest.fn(),
} as any;

test('renders welcome message', () => {
  const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
  expect(getByText('Welcome to Your App')).toBeTruthy();
});
```

## Deployment

### App Store (iOS)
1. Build with EAS: `npm run build:ios`
2. Submit to App Store: `npm run submit:ios`
3. Complete App Store Connect setup

### Google Play Store (Android)
1. Build with EAS: `npm run build:android`
2. Submit to Play Store: `npm run submit:android`
3. Complete Play Console setup

## Performance Tips

1. **Optimize Images**: Use appropriate image formats and sizes
2. **Lazy Loading**: Load screens and components when needed
3. **Memory Management**: Properly cleanup listeners and subscriptions
4. **Bundle Size**: Use metro-bundler analysis to optimize
5. **Navigation**: Use lazy loading for screens

## Common Issues

### Metro Bundler Issues
```bash
# Clear cache
npx expo start --clear

# Reset metro cache
npx expo start --reset-cache
```

### iOS Simulator Issues
```bash
# Reset iOS Simulator
xcrun simctl erase all
```

### Android Emulator Issues
```bash
# Cold boot emulator
emulator -avd YOUR_AVD_NAME -cold-boot
```

## Expo SDK Features

The template is ready to use Expo SDK features:
- **Camera**: expo-camera
- **Location**: expo-location
- **Notifications**: expo-notifications
- **File System**: expo-file-system
- **Media Library**: expo-media-library
- **Contacts**: expo-contacts

## TypeScript Support

Full TypeScript support with:
- Type definitions for navigation
- Strict type checking
- IntelliSense support
- Type-safe props and state

## License

MIT License - free to use for personal and commercial projects.
