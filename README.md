# QCA-THG: Interactive Demo

**Query-Context Aware Automatic Topic Hierarchy Generation for Educational Web Resources**

Interactive demo for the paper presented at IEM-ICDC 2026 by Divyansh Bhatia & N. Mehala.

---

## 🚀 Deploy to GitHub Pages (Step-by-Step)

### Prerequisites
- [Git](https://git-scm.com/) installed
- [Node.js](https://nodejs.org/) v18+ installed
- A [GitHub](https://github.com/) account

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `qca-thg-demo` (or any name you prefer)
3. Keep it **Public** (required for free GitHub Pages)
4. Do **NOT** initialize with README (we already have one)
5. Click **Create repository**

### Step 2: Update the Base Path

> ⚠️ **Important:** If you chose a repo name different from `qca-thg-demo`, open `vite.config.js` and change the `base` value:

```js
base: '/your-repo-name/',
```

### Step 3: Test Locally (Optional)

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser to preview.

### Step 4: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: QCA-THG interactive demo"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/qca-thg-demo.git
git push -u origin main
```

### Step 5: Enable GitHub Pages

1. Go to your repo on GitHub
2. Navigate to **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **GitHub Actions**
4. That's it! The workflow will trigger automatically.

### Step 6: Wait & Visit

- Go to the **Actions** tab to watch the build progress
- Once the green checkmark appears (1-2 minutes), your site is live at:

```
https://YOUR_USERNAME.github.io/qca-thg-demo/
```

---

## 🔄 Updating the Demo

Just edit the files and push:

```bash
git add .
git commit -m "Update demo"
git push
```

GitHub Actions will automatically rebuild and redeploy.

---

## 📁 Project Structure

```
qca-thg-demo/
├── .github/workflows/deploy.yml   ← Auto-deploy on push
├── src/
│   ├── App.jsx                    ← The interactive demo (all-in-one)
│   └── main.jsx                   ← React entry point
├── index.html                     ← HTML shell
├── vite.config.js                 ← Build config (base path here)
├── package.json                   ← Dependencies
└── README.md                      ← This file
```

---

## 📄 Citation

If you use this demo, please cite our paper:

> Bhatia, D. & Mehala, N. (2026). Query-Context Aware Automatic Topic Hierarchy Generation for Educational Web Resources. In *Proceedings of 4th International Conference on Computational Intelligence, Data Science and Cloud Computing (IEM-ICDC 2026)*.
