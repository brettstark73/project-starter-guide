# Mobile App Template - Claude Configuration

## Project Overview
React Native Expo starter with TypeScript, navigation, and essential mobile features.

**Tech Stack:** React Native 0.81, Expo 54, TypeScript, React Navigation

---

## Codebase Structure

```
mobile-app/
├── app/                  # Expo Router pages (file-based routing)
│   ├── (tabs)/           # Tab navigator screens
│   ├── _layout.tsx       # Root layout
│   └── index.tsx         # Entry screen
├── components/           # Reusable components
│   ├── ui/               # Base UI components
│   └── ThemedView.tsx    # Theme-aware container
├── hooks/                # Custom React hooks
├── constants/            # App constants, colors, config
├── assets/               # Images, fonts, icons
├── __tests__/
│   ├── unit/             # Component tests
│   ├── integration/      # Feature tests
│   └── smoke/            # Quick sanity checks
└── app.json              # Expo config
```

---

## Development Workflow

### Running the App
```bash
npm start             # Start Expo dev server
npm run ios           # iOS simulator
npm run android       # Android emulator
npm run web           # Web browser
```

### Running Tests
```bash
npm test              # All tests
npm run test:unit     # Unit tests only
npm run test:smoke    # Quick sanity checks
npm run test:watch    # Watch mode
```

### Building
```bash
npm run build:ios     # EAS build for iOS
npm run build:android # EAS build for Android
```

---

## Navigation

Uses Expo Router (file-based routing):

### Basic Navigation
```typescript
import { router } from 'expo-router'

// Navigate
router.push('/profile')

// Navigate with params
router.push({ pathname: '/user/[id]', params: { id: '123' } })

// Go back
router.back()
```

### Tab Navigation
Tabs are defined in `app/(tabs)/_layout.tsx`:
```typescript
<Tabs.Screen
  name="index"
  options={{
    title: 'Home',
    tabBarIcon: ({ color }) => <IconSymbol name="house.fill" color={color} />,
  }}
/>
```

---

## Theming

### Using Theme Colors
```typescript
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

const colorScheme = useColorScheme()
const backgroundColor = Colors[colorScheme ?? 'light'].background
```

### Themed Components
```typescript
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

<ThemedView>
  <ThemedText>Automatically themed content</ThemedText>
</ThemedView>
```

---

## Code Conventions

### Components
- Use functional components with hooks
- Keep components focused and small
- Use TypeScript for all props

### Styling
- Use StyleSheet.create for performance
- Extract common styles to constants
- Use theme colors for consistency

### State Management
- Use React hooks for local state
- Consider Zustand for global state
- Avoid prop drilling

---

## Common Tasks

### Add a new screen
1. Create file in `app/` directory
2. Add to navigation if needed
3. Use ThemedView for consistent styling

```typescript
// app/settings.tsx
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

export default function SettingsScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText type="title">Settings</ThemedText>
    </ThemedView>
  )
}
```

### Add a new component
```typescript
// components/Button.tsx
import { Pressable, StyleSheet } from 'react-native'
import { ThemedText } from './ThemedText'

interface ButtonProps {
  title: string
  onPress: () => void
}

export function Button({ title, onPress }: ButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <ThemedText>{title}</ThemedText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
  },
})
```

### Add a tab
Edit `app/(tabs)/_layout.tsx` and add a new `Tabs.Screen`.

---

## Platform-Specific Code

### Conditional rendering
```typescript
import { Platform } from 'react-native'

{Platform.OS === 'ios' ? <IOSComponent /> : <AndroidComponent />}
```

### Platform-specific files
- `Component.ios.tsx` - iOS only
- `Component.android.tsx` - Android only

---

## Test Strategy

| Type | Location | Purpose |
|------|----------|---------|
| Unit | `__tests__/unit/` | Component behavior |
| Integration | `__tests__/integration/` | Feature flows |
| Smoke | `__tests__/smoke/` | Basic sanity checks |

Uses Jest with jest-expo preset for React Native compatibility.

---

## AI Assistant Guidelines

When working on this template:
- Follow React Native conventions
- Use TypeScript for all new code
- Test on both iOS and Android when possible
- Run `npm run type-check` after changes
- Run `npm test` before committing
- Use themed components for consistency
- Don't add native modules without discussion
