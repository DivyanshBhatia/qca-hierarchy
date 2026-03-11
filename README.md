# QCA-THG: Interactive Demo

**Query-Context Aware Automatic Topic Hierarchy Generation for Educational Web Resources**

Interactive demo for the paper presented at IEM-ICDC 2026 by Divyansh Bhatia & N. Mehala.

---

## Deploy to GitHub Pages

### Step 1: Install dependencies

```bash
cd qca-hierarchy
npm install
```

### Step 2: Test locally (optional)

```bash
npm run dev
```

### Step 3: Deploy

```bash
npm run deploy
```

This builds the site and pushes it to the `gh-pages` branch automatically.

### Step 4: Enable GitHub Pages (first time only)

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Under **Branch**, select **`gh-pages`** and **`/ (root)`**
4. Click **Save**

Your site will be live within a minute at:
```
https://divyanshbhatia.github.io/qca-hierarchy/
```

### Updating

After any changes, just run `npm run deploy` again.
