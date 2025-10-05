# 📱 Mobile Applications Guide

## Overview

Mobile applications are software designed for smartphones and tablets. This guide covers native, cross-platform, and hybrid approaches for building modern mobile apps for iOS and Android.

**Complexity Levels:** 2-5
**Timeline:** 2 weeks - 8+ months
**Budget:** $100 - $10,000+/month

---

## Mobile Development Approaches

### Native Development (Level 3-5)
**Platform-specific languages and tools**

#### iOS (Swift/SwiftUI)
```
Language: Swift
UI Framework: SwiftUI, UIKit
IDE: Xcode
Distribution: App Store
```

**Pros:**
- Best performance and user experience
- Full access to platform APIs
- Latest features immediately available
- Optimal integration with device

**Cons:**
- Separate codebase for each platform
- Requires platform-specific knowledge
- Higher development cost
- Longer time to market

#### Android (Kotlin/Jetpack Compose)
```
Language: Kotlin (or Java)
UI Framework: Jetpack Compose, XML
IDE: Android Studio
Distribution: Google Play Store
```

**Pros:**
- Native performance
- Material Design integration
- Full Android ecosystem access
- Google services integration

**Cons:**
- Platform fragmentation
- Separate iOS codebase needed
- Testing across devices complex

### Cross-Platform Development (Level 2-4)
**Write once, deploy to both platforms**

#### React Native (Recommended)
```
Language: JavaScript/TypeScript
Framework: React Native
UI: React components
Backend: Any REST/GraphQL API
State: Redux, Zustand, Jotai
```

**Pros:**
- Large community and ecosystem
- Hot reload for faster development
- Code sharing with web apps
- Native modules available
- Expo for easier setup

**Cons:**
- Performance overhead vs native
- Platform-specific code sometimes needed
- Large app bundle size
- Third-party library dependency

#### Flutter
```
Language: Dart
Framework: Flutter
UI: Widgets
State: Provider, Riverpod, Bloc
Backend: Any API + Firebase
```

**Pros:**
- Excellent performance
- Beautiful UI out of the box
- Single codebase for iOS, Android, Web
- Hot reload, fast development
- Google backing

**Cons:**
- Dart learning curve
- Smaller community than React Native
- Larger app size
- Limited native module ecosystem

#### Other Cross-Platform Options

**Ionic/Capacitor**
- Web technologies (HTML/CSS/JS)
- Any web framework (React, Vue, Angular)
- Good for simple apps
- Web-first approach

**.NET MAUI**
- C# and .NET
- Microsoft ecosystem
- Windows, iOS, Android support
- Good for enterprise

---

## Technology Stack by Level

### Level 2: Simple Mobile App (2-4 weeks)

#### Expo (React Native)
```
Framework: Expo (React Native)
Backend: Supabase, Firebase
State: React Context, Zustand
Navigation: React Navigation
UI: React Native Paper, NativeBase
Deployment: EAS (Expo Application Services)
```

**Perfect for:**
- MVPs and prototypes
- Content-driven apps
- Simple CRUD applications
- Learning mobile development

### Level 3: Production App (1-3 months)

#### React Native
```
Framework: React Native CLI
Language: TypeScript
Backend: Custom API (Node.js/Python)
Database: PostgreSQL + Redis
State Management: Redux Toolkit, Zustand
Navigation: React Navigation
UI Library: React Native Elements, Tamagui
Push Notifications: Firebase Cloud Messaging
Analytics: Firebase Analytics, Mixpanel
Crash Reporting: Sentry
Testing: Jest, Detox
CI/CD: GitHub Actions, Bitrise
```

#### Flutter
```
Language: Dart
Backend: Custom API + Firebase
State: Riverpod, Bloc
Navigation: GoRouter
UI: Material/Cupertino widgets
Notifications: Firebase Cloud Messaging
Analytics: Firebase Analytics
Testing: Flutter test framework
CI/CD: Codemagic, GitHub Actions
```

### Level 4: Advanced App (3-6 months)

```
Offline Support: Local database (SQLite, Realm)
Real-time: WebSockets, Firebase Realtime
Payment: Stripe, In-app purchases
Maps: Google Maps, Mapbox
Camera/Media: Custom native modules
Biometric: Face ID, Touch ID, Fingerprint
Background Tasks: Workers, services
Deep Linking: Universal links
A/B Testing: Firebase Remote Config
Feature Flags: LaunchDarkly
Performance: Custom monitoring
```

### Level 5: Enterprise App (6+ months)

```
Multi-tenant architecture
Advanced security (encryption, certificates)
Offline-first with conflict resolution
Complex state synchronization
Enterprise SSO integration
MDM (Mobile Device Management)
Custom native modules
Advanced CI/CD pipelines
Comprehensive testing (unit, integration, E2E)
```

---

## Getting Started

### React Native with Expo (Easiest)

```bash
# Install Expo CLI
npm install -g expo-cli

# Create new app
npx create-expo-app my-app
cd my-app

# Start development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android

# Run on physical device (scan QR code with Expo Go app)
```

### React Native CLI (More Control)

```bash
# Install React Native CLI
npm install -g react-native-cli

# Create new app
npx react-native init MyApp --template react-native-template-typescript

# iOS
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android
```

### Flutter Setup

```bash
# Install Flutter SDK (macOS)
brew install flutter

# Create new app
flutter create my_app
cd my_app

# Run on iOS
flutter run -d ios

# Run on Android
flutter run -d android

# Build for production
flutter build apk  # Android
flutter build ios  # iOS
```

---

## Core Features Implementation

### 1. Authentication

#### React Native + Supabase
```typescript
import { supabase } from './lib/supabase';

// Sign up
const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

// Sign in
const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

// OAuth (Google, Apple)
const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) throw error;
  return data;
};
```

#### Flutter + Firebase
```dart
import 'package:firebase_auth/firebase_auth.dart';

final FirebaseAuth _auth = FirebaseAuth.instance;

// Sign up
Future<User?> signUp(String email, String password) async {
  try {
    UserCredential result = await _auth.createUserWithEmailAndPassword(
      email: email,
      password: password,
    );
    return result.user;
  } catch (e) {
    print(e);
    return null;
  }
}

// Sign in
Future<User?> signIn(String email, String password) async {
  try {
    UserCredential result = await _auth.signInWithEmailAndPassword(
      email: email,
      password: password,
    );
    return result.user;
  } catch (e) {
    print(e);
    return null;
  }
}

// Google Sign-In
Future<User?> signInWithGoogle() async {
  final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
  final GoogleSignInAuthentication googleAuth = await googleUser!.authentication;

  final credential = GoogleAuthProvider.credential(
    accessToken: googleAuth.accessToken,
    idToken: googleAuth.idToken,
  );

  UserCredential result = await _auth.signInWithCredential(credential);
  return result.user;
}
```

### 2. Data Fetching & State Management

#### React Native (Zustand + React Query)
```typescript
import { create } from 'zustand';
import { useQuery, useMutation } from '@tanstack/react-query';

// Global state
interface AppState {
  user: User | null;
  setUser: (user: User) => void;
}

const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// Data fetching
const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await fetch('https://api.example.com/todos');
      return response.json();
    },
  });
};

// Mutations
const useCreateTodo = () => {
  return useMutation({
    mutationFn: async (todo: NewTodo) => {
      const response = await fetch('https://api.example.com/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
      });
      return response.json();
    },
  });
};

// Component usage
function TodoList() {
  const { data: todos, isLoading } = useTodos();
  const createTodo = useCreateTodo();

  if (isLoading) return <ActivityIndicator />;

  return (
    <FlatList
      data={todos}
      renderItem={({ item }) => <TodoItem todo={item} />}
    />
  );
}
```

#### Flutter (Riverpod)
```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

// Provider
final todosProvider = FutureProvider<List<Todo>>((ref) async {
  final response = await http.get(Uri.parse('https://api.example.com/todos'));
  final List<dynamic> data = json.decode(response.body);
  return data.map((json) => Todo.fromJson(json)).toList();
});

// Widget usage
class TodoList extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final todosAsync = ref.watch(todosProvider);

    return todosAsync.when(
      data: (todos) => ListView.builder(
        itemCount: todos.length,
        itemBuilder: (context, index) => TodoItem(todo: todos[index]),
      ),
      loading: () => CircularProgressIndicator(),
      error: (error, stack) => Text('Error: $error'),
    );
  }
}
```

### 3. Navigation

#### React Navigation
```typescript
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

#### Flutter Navigation
```dart
import 'package:go_router/go_router.dart';

final router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => HomeScreen(),
    ),
    GoRoute(
      path: '/profile/:userId',
      builder: (context, state) {
        final userId = state.pathParameters['userId']!;
        return ProfileScreen(userId: userId);
      },
    ),
    GoRoute(
      path: '/settings',
      builder: (context, state) => SettingsScreen(),
    ),
  ],
);

// Usage
MaterialApp.router(
  routerConfig: router,
);

// Navigate
context.go('/profile/123');
```

### 4. Local Storage

#### React Native (AsyncStorage)
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data
await AsyncStorage.setItem('user_token', token);

// Get data
const token = await AsyncStorage.getItem('user_token');

// Remove data
await AsyncStorage.removeItem('user_token');

// Complex objects
await AsyncStorage.setItem('user', JSON.stringify(userObject));
const user = JSON.parse(await AsyncStorage.getItem('user') || '{}');
```

#### Flutter (SharedPreferences)
```dart
import 'package:shared_preferences/shared_preferences.dart';

// Save data
final prefs = await SharedPreferences.getInstance();
await prefs.setString('user_token', token);

// Get data
final token = prefs.getString('user_token');

// Remove data
await prefs.remove('user_token');
```

### 5. Push Notifications

#### React Native (Firebase)
```typescript
import messaging from '@react-native-firebase/messaging';

// Request permission
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Permission granted');
  }
}

// Get FCM token
const fcmToken = await messaging().getToken();

// Handle foreground messages
messaging().onMessage(async remoteMessage => {
  console.log('Notification:', remoteMessage);
});

// Handle background messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background message:', remoteMessage);
});
```

#### Flutter (Firebase)
```dart
import 'package:firebase_messaging/firebase_messaging.dart';

// Request permission
await FirebaseMessaging.instance.requestPermission();

// Get FCM token
final token = await FirebaseMessaging.instance.getToken();

// Handle foreground messages
FirebaseMessaging.onMessage.listen((RemoteMessage message) {
  print('Got a message: ${message.notification?.title}');
});

// Handle background messages
FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  print('Background message: ${message.messageId}');
}
```

---

## App Store Deployment

### iOS App Store

**Requirements:**
- Apple Developer Account ($99/year)
- macOS with Xcode
- Provisioning profiles and certificates

**Steps:**
```bash
# 1. Update version in Info.plist or package.json
# 2. Build release version
npx expo build:ios  # Expo
# or
xcodebuild -workspace ios/MyApp.xcworkspace -scheme MyApp archive

# 3. Upload to App Store Connect
# 4. Submit for review
```

**Review Guidelines:**
- App must be functional and bug-free
- Clear privacy policy
- Appropriate content
- Good user experience
- Follow Human Interface Guidelines

### Google Play Store

**Requirements:**
- Google Play Console account ($25 one-time)
- Android Studio or CLI tools

**Steps:**
```bash
# 1. Generate signed APK/AAB
npx expo build:android  # Expo
# or
cd android && ./gradlew bundleRelease

# 2. Upload to Play Console
# 3. Fill out store listing
# 4. Submit for review
```

**Review Guidelines:**
- App must be stable
- Clear description and screenshots
- Appropriate content rating
- Privacy policy link
- Follow Material Design (recommended)

---

## Testing Mobile Apps

### Unit Testing

**React Native (Jest)**
```typescript
import { render, screen } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';

test('renders login button', () => {
  render(<LoginScreen />);
  expect(screen.getByText('Login')).toBeTruthy();
});

test('validates email', () => {
  const { getByPlaceholderText, getByText } = render(<LoginScreen />);
  const input = getByPlaceholderText('Email');

  fireEvent.changeText(input, 'invalid-email');
  fireEvent.press(getByText('Login'));

  expect(screen.getByText('Invalid email')).toBeTruthy();
});
```

**Flutter (Widget Tests)**
```dart
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('Login button test', (WidgetTester tester) async {
    await tester.pumpWidget(LoginScreen());

    final loginButton = find.text('Login');
    expect(loginButton, findsOneWidget);

    await tester.tap(loginButton);
    await tester.pump();
  });
}
```

### E2E Testing

**Detox (React Native)**
```typescript
describe('Login Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should login successfully', async () => {
    await element(by.id('email-input')).typeText('user@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.id('login-button')).tap();

    await expect(element(by.id('home-screen'))).toBeVisible();
  });
});
```

**Flutter Integration Tests**
```dart
import 'package:integration_test/integration_test.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('Login flow test', (WidgetTester tester) async {
    await tester.pumpWidget(MyApp());

    await tester.enterText(find.byKey(Key('email')), 'user@example.com');
    await tester.enterText(find.byKey(Key('password')), 'password123');
    await tester.tap(find.byKey(Key('login-button')));
    await tester.pumpAndSettle();

    expect(find.byKey(Key('home-screen')), findsOneWidget);
  });
}
```

---

## Performance Optimization

### React Native
```typescript
// 1. Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <View>{/* Render data */}</View>;
});

// 2. FlatList optimization
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={10}
  removeClippedSubviews={true}
/>

// 3. Image optimization
<FastImage
  source={{ uri: imageUrl }}
  resizeMode="cover"
  priority={FastImage.priority.high}
/>

// 4. Hermes engine (enabled by default in new RN)
```

### Flutter
```dart
// 1. Const constructors
const Text('Hello');

// 2. ListView.builder for long lists
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) => ItemWidget(item: items[index]),
);

// 3. Image caching
CachedNetworkImage(
  imageUrl: imageUrl,
  placeholder: (context, url) => CircularProgressIndicator(),
  errorWidget: (context, url, error) => Icon(Icons.error),
);

// 4. Avoid rebuilds
class MyWidget extends StatelessWidget {
  const MyWidget({Key? key}) : super(key: key);
  // ...
}
```

---

## Common Pitfalls

1. **Not testing on real devices** → Simulators don't catch all issues
2. **Ignoring platform differences** → iOS vs Android UX
3. **Poor offline handling** → Network failures break app
4. **Memory leaks** → Not cleaning up listeners/subscriptions
5. **Large bundle sizes** → Slow downloads, storage issues
6. **No error boundary** → App crashes completely
7. **Hardcoded values** → Use environment variables
8. **Poor navigation structure** → Confusing user experience

---

## Further Resources

- [React Native Documentation](https://reactnative.dev/)
- [Flutter Documentation](https://flutter.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design Guidelines](https://material.io/design)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

---

*Next: Check out [E-commerce Guide](ecommerce.md) or [SaaS Applications](saas-applications.md)*
