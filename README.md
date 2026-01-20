# Virtual Pet - Progressive Web App

An interactive virtual pet game where you care for your adorable digital companion. This is a Progressive Web App (PWA) that can be installed on your device and works offline!

## Features

- 🐾 Interactive animated pet with expressive emotions
- 📊 Stats tracking (hunger, happiness, energy)
- 🍖 Feed your pet to keep it happy and healthy
- 🎾 Play games to increase happiness
- 😴 Sleep mode to restore energy
- 💕 Click to pet your pet
- 📥 Install as a standalone app
- 🌐 Works offline

## Quick Start

1. Open `index.html` in a web browser
2. Care for your pet by feeding, playing, and putting it to sleep
3. Click the "📥 Install App" button (when available) to install it on your device

## Generating App Icons

Before deploying to GitHub Pages, you need to generate the app icons:

1. Open `generate-icons.html` in your browser
2. Click "Generate Icons"
3. Download both `icon-192.png` and `icon-512.png`
4. Place them in the root directory of the project

## Deploying to GitHub Pages

### Option 1: Using GitHub CLI (gh)

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub and push
gh repo create virtual-pet --public --source=. --push

# Enable GitHub Pages
gh api repos/:owner/virtual-pet/pages -X PUT -f source[branch]=main
```

### Option 2: Manual Deployment

1. Create a new repository on GitHub
2. Initialize git and push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/virtual-pet.git
git push -u origin main
```

3. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Select "main" branch as source
   - Click Save

4. Your app will be available at `https://YOUR_USERNAME.github.io/virtual-pet/`

### Option 3: Using GitHub Desktop

1. Create a new repository on GitHub
2. Clone it to your computer using GitHub Desktop
3. Copy all project files to the cloned repository folder
4. Commit and push the changes
5. Enable GitHub Pages in repository settings

## PWA Requirements for GitHub Pages

GitHub Pages serves from the root or a subdirectory. The service worker is configured to work with both:

- Root: `https://YOUR_USERNAME.github.io/`
- Subdirectory: `https://YOUR_USERNAME.github.io/virtual-pet/`

The app will automatically detect the correct base path.

## Testing the PWA

1. Deploy to GitHub Pages
2. Open your app in Chrome/Edge on desktop or Android
3. Look for the install icon in the address bar
4. Click it to install the app
5. Test offline by disconnecting from the internet

## Files

- `index.html` - Main application HTML
- `style.css` - Application styles and animations
- `script.js` - Game logic and PWA functionality
- `manifest.json` - PWA manifest
- `service-worker.js` - Offline functionality
- `icon-192.png` - App icon (192x192)
- `icon-512.png` - App icon (512x512)
- `generate-icons.html` - Icon generator tool

## Browser Support

- Chrome/Edge (desktop and Android) - Full PWA support
- Firefox - Limited PWA support
- Safari (iOS) - Some PWA features supported

## License

Feel free to use this project for learning and personal use!