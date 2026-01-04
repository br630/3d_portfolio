# Portfolio Setup Guide

## Quick Start - GitHub Pages Deployment

### Step 1: Create GitHub Repository

1. Go to GitHub.com and create a new repository
2. Name it exactly: `yourusername.github.io` (replace "yourusername" with your actual GitHub username)
3. Make it public
4. Don't initialize with README (we already have files)

### Step 2: Prepare Your Files

Download these 3 main files:
- `index.html`
- `style.css`
- `viewer.js`

Create this folder structure on your computer:
```
your-portfolio/
├── index.html
├── style.css
├── viewer.js
├── models/
│   └── your-model.glb
└── images/
    ├── wireframe.png
    ├── clay.png
    └── detail.png
```

### Step 3: Add Your Content

**Export your 3D model:**
- From Maya/ZBrush/Blender export as .glb format
- Place in the `models/` folder
- Update line 58 in `viewer.js` to: `loader.load('models/YOUR-MODEL-NAME.glb', ...)`

**Add screenshots:**
- Create wireframe view, clay render, and detail shots
- Save them in the `images/` folder
- Update image paths in `index.html` (lines 65-77)

**Customize text in index.html:**
- Line 15: Your name
- Line 27-29: Hero section tagline
- Line 42-51: Project title and description
- Line 96-102: Your bio
- Line 120-126: Your contact links (email, GitHub, LinkedIn, ArtStation)

### Step 4: Deploy to GitHub

Open terminal/command prompt in your portfolio folder:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio"

# Connect to your GitHub repository
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" → "Pages"
3. Under "Source", select your main branch
4. Click "Save"
5. Wait 2-5 minutes

Your portfolio will be live at: `https://yourusername.github.io`

## Testing Locally First

Before deploying, test on your computer:

```bash
# If you have Python installed:
python -m http.server 8000

# Then open browser to:
http://localhost:8000
```

## File Explanations

**index.html** - Main page structure
- Header with navigation
- Hero section
- 3D model viewer area
- Image gallery
- Work in progress section
- About section with bio and skills
- Contact section
- Links to Three.js libraries

**style.css** - All styling
- Responsive design (works on mobile)
- Professional color scheme
- Modern layout
- Hover effects

**viewer.js** - 3D model viewer
- Loads your .glb model
- Mouse controls (rotate, zoom)
- Professional lighting
- Auto-centers model
- Shows placeholder if model doesn't load

## Updating Your Portfolio Later

To add new models or make changes:

```bash
# Make your changes to files
# Then:
git add .
git commit -m "Added new project"
git push
```

Changes go live in 1-2 minutes!

## Troubleshooting

**Model not showing:**
- Check browser console (F12) for errors
- Verify model path in viewer.js matches your filename
- Make sure .glb file is in the models folder
- Try the placeholder first to verify viewer works

**Images not loading:**
- Check image paths in index.html match your filenames
- Make sure images are in the images folder
- Use relative paths (images/filename.png)

**Site not updating:**
- Wait 2-5 minutes for GitHub Pages to rebuild
- Try hard refresh (Ctrl + F5 or Cmd + Shift + R)
- Check GitHub Actions tab for deployment status

## Tips

- Keep model under 100k triangles for smooth web performance
- Use 2K textures maximum
- GLB format is better than GLTF (single file, includes textures)
- Optimize images for web (use TinyPNG or similar)
- Test on mobile devices too

## Need More Help?

- Three.js Docs: https://threejs.org/docs/
- GitHub Pages Guide: https://pages.github.com/
- GLB Export: https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html

Good luck with your portfolio! 🎨
