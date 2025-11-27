# Portfolio Website

A clean and modern portfolio website hosted on GitHub Pages.

## 🚀 Viewing the Site

To view this site locally:
1. Open `index.html` in your web browser

## 📦 Deploying to GitHub Pages

Follow these steps to deploy your portfolio to GitHub Pages:

### 1. Create a GitHub Repository
- Go to [GitHub](https://github.com) and sign in
- Click the "+" icon in the top right and select "New repository"
- Name your repository (e.g., `portfolio` or `username.github.io` for a user site)
- Keep it public (required for free GitHub Pages)
- Don't initialize with README, .gitignore, or license (we already have files)

### 2. Push Your Code to GitHub
```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit your files
git commit -m "Initial commit: Portfolio website"

# Add your GitHub repository as remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select the branch `main` and folder `/ (root)`
5. Click "Save"
6. Your site will be published at `https://yourusername.github.io/repository-name/`

### 4. Wait for Deployment
- GitHub Pages will build and deploy your site (usually takes 1-2 minutes)
- Once deployed, a green checkmark will appear and your site URL will be displayed
- Visit the URL to see your live portfolio!

## ✏️ Customizing Your Portfolio

Edit the following in `index.html`:
- Replace `[Your Name]` with your actual name
- Update the "Developer | Designer | Creator" subtitle
- Add your real projects in the Projects section
- Update skills to match your expertise
- Add your email, GitHub, and LinkedIn links in the Contact section

Customize styling in `styles.css`:
- Modify colors in the `:root` section
- Adjust fonts, spacing, and layout as needed

## 🔧 Technologies Used

- HTML5
- CSS3
- GitHub Pages (for hosting)

## 📝 License

Feel free to use this template for your own portfolio!
