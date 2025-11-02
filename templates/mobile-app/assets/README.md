# Assets Directory

This directory contains app icons, splash screens, and other static assets for your mobile app.

## Required Assets

To complete your mobile app setup, add these image files:

### App Icons
- `icon.png` (1024x1024) - App icon for iOS and Android
- `adaptive-icon.png` (1024x1024) - Android adaptive icon foreground
- `favicon.png` (48x48) - Web favicon

### Splash Screen
- `splash.png` (1284x2778) - iOS splash screen image
- Background color is set to white in app.json

## Asset Guidelines

### App Icon (icon.png)
- Size: 1024x1024 pixels
- Format: PNG with transparency
- Design: Simple, recognizable icon that works at small sizes
- Avoid text or fine details

### Adaptive Icon (adaptive-icon.png)
- Size: 1024x1024 pixels
- Format: PNG with transparency
- Design: Icon should fit within safe area (central 640x640 pixels)
- Used for Android adaptive icons

### Splash Screen (splash.png)
- Size: 1284x2778 pixels (iPhone 14 Pro Max)
- Format: PNG
- Design: Simple loading screen or app logo
- Will be resized for different screen sizes

### Favicon (favicon.png)
- Size: 48x48 pixels
- Format: PNG
- Design: Simplified version of your app icon
- Used when running on web

## Generating Assets

You can use these tools to generate all required sizes:

- **Expo CLI**: `npx expo install expo-app-loading` for splash screens
- **App Icon Generator**: Online tools like appicon.co
- **Figma/Sketch**: Design and export at required sizes

## Updating app.json

After adding your assets, update the bundle identifiers in `app.json`:

```json
{
  "ios": {
    "bundleIdentifier": "com.yourcompany.yourapp"
  },
  "android": {
    "package": "com.yourcompany.yourapp"
  }
}
```
