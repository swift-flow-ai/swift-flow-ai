# Theme Switcher Feature

## Overview
Added a comprehensive theme switcher in the Settings page that allows users to choose between Light, Dark, and System themes.

## What Was Added

### 1. Theme Context (Already Existed)
- **File**: `src/contexts/ThemeContext.tsx`
- Provides theme state management
- Supports: `'light'`, `'dark'`, and `'system'` modes
- Persists theme preference in localStorage
- Listens to system theme changes when in 'system' mode

### 2. Theme Hook (Already Existed)
- **File**: `src/hooks/useTheme.ts`
- Simple hook to access theme context
- Throws error if used outside ThemeProvider

### 3. Updated Settings Page
- **File**: `src/pages/settings/SettingsPage.tsx`
- New comprehensive settings page with multiple sections:
  - **Profile Section**: Display user information
  - **Appearance Section**: Theme switcher with three options
  - **Notifications Section**: Toggle switches for various notification preferences
  - **Security Section**: Quick access to security settings

### 4. Updated CSS
- **File**: `src/index.css`
- Added `.dark` class styles (previously only had `:root` and `.light`)
- Both light and dark themes fully defined with CSS variables
- Smooth transitions between themes

### 5. App Integration (Already Done)
- **File**: `src/App.tsx`
- ThemeProvider wraps the entire app
- Settings route already configured

## How It Works

1. **User selects a theme** in Settings → Appearance
2. **ThemeContext updates** the theme state
3. **Theme is saved** to localStorage for persistence
4. **HTML class is updated** on the root `<html>` element (`'light'` or `'dark'`)
5. **CSS variables change** based on the class, updating all colors throughout the app
6. **System mode** follows the OS preference automatically

## Theme Options

### 🌞 Light Mode
- Clean, bright interface with light backgrounds
- Optimized for daytime use and well-lit environments

### 🌙 Dark Mode
- Easy on the eyes with dark backgrounds
- Reduces eye strain in low-light environments

### 💻 System
- Automatically follows your operating system's theme preference
- Switches between light and dark based on system settings
- Updates automatically when system theme changes

## Features

✅ Three theme options (Light, Dark, System)
✅ Visual selection with icons
✅ Persists across sessions (localStorage)
✅ Smooth transitions between themes
✅ System preference detection and auto-switching
✅ Real-time preview of selected theme
✅ Clean, modern UI matching the rest of the app

## Usage

### For Users
1. Navigate to **Settings** from the sidebar
2. Scroll to the **Appearance** section
3. Click on your preferred theme option
4. Theme applies immediately

### For Developers
```tsx
import { useTheme } from '@/hooks/useTheme';

function MyComponent() {
  const { theme, actualTheme, setTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme preference: {theme}</p>
      <p>Actual applied theme: {actualTheme}</p>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  );
}
```

## Color System

The app uses CSS variables that automatically update based on the theme:

- `--background` / `--foreground`
- `--card` / `--card-foreground`
- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--muted` / `--muted-foreground`
- `--accent` / `--accent-foreground`
- `--destructive` / `--destructive-foreground`
- `--border` / `--input` / `--ring`

All components use these variables, ensuring consistent theming across the entire app.

## Testing

To test the theme switcher:

1. Start the dev server:
```bash
VITE_ENABLE_MSW=true npm run dev
```

2. Log in with demo credentials:
   - Email: `demo@flowai.com`
   - Password: `demo123`

3. Navigate to Settings
4. Try switching between Light, Dark, and System themes
5. Observe the smooth transition and color changes
6. Refresh the page - theme should persist

## Notes

- Theme preference is stored in `localStorage` under the key `'theme'`
- System theme detection uses `window.matchMedia('(prefers-color-scheme: dark)')`
- All existing components automatically support both themes via CSS variables
- No component changes needed to support theming
