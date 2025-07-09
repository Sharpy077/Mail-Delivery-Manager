# Deployment Guide - GitHub Pages

This guide will help you deploy your Work Schedule Manager to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your computer
3. Your project files ready

## Step-by-Step Deployment

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., "work-schedule-manager")
5. Make it **Public** (required for free GitHub Pages)
6. Don't initialize with README (since you already have one)
7. Click "Create repository"

### 2. Upload Your Files

#### Option A: Using Git (Recommended)

1. Open your terminal/command prompt
2. Navigate to your project folder:
   ```bash
   cd "path/to/MailPlus - Hawthorn Delivery App"
   ```

3. Initialize Git repository:
   ```bash
   git init
   ```

4. Add all files:
   ```bash
   git add .
   ```

5. Commit the files:
   ```bash
   git commit -m "Initial commit"
   ```

6. Add your GitHub repository as remote:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

7. Push to GitHub:
   ```bash
   git push -u origin main
   ```

#### Option B: Using GitHub Web Interface

1. Go to your new repository on GitHub
2. Click "uploading an existing file"
3. Drag and drop all your project files
4. Add a commit message
5. Click "Commit changes"

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section (or click "Pages" in the left sidebar)
4. Under "Source", select "GitHub Actions"
5. The deployment will start automatically when you push changes

### 4. Configure GitHub Pages (if needed)

If you need to manually configure:

1. In repository Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: "gh-pages" (created by the GitHub Action)
4. Folder: "/ (root)"
5. Click "Save"

### 5. Access Your Deployed App

Your app will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## Automatic Deployment

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:

- Deploy your app when you push to the main branch
- Update the live site with any changes
- Handle the build and deployment process

## Troubleshooting

### Common Issues

1. **Page not found (404)**
   - Wait a few minutes for the first deployment
   - Check if the repository is public
   - Verify the repository name matches the URL

2. **Files not loading**
   - Ensure all file paths are relative
   - Check that all files are committed to the repository

3. **Deployment not working**
   - Check the "Actions" tab in your repository
   - Look for any error messages in the deployment logs

### Manual Deployment

If automatic deployment fails:

1. Go to repository Settings → Pages
2. Change source to "Deploy from a branch"
3. Select "main" branch
4. Save the settings

## Custom Domain (Optional)

To use a custom domain:

1. In repository Settings → Pages
2. Enter your domain in "Custom domain"
3. Add a CNAME file to your repository with your domain
4. Configure DNS settings with your domain provider

## Security Notes

- Keep your repository public for free GitHub Pages
- Don't include sensitive data in your repository
- Consider using environment variables for any API keys

## Support

If you encounter issues:

1. Check the GitHub Actions logs
2. Verify all files are properly committed
3. Ensure the repository is public
4. Wait a few minutes for deployment to complete

Your Work Schedule Manager should now be live on GitHub Pages! 🚀 