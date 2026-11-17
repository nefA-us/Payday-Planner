# Payday Planner

A budgeting calendar that plans each paycheck: what the week's bills need, what to hold back for heavy weeks, and what is left for goals.

This is a plain static site. There is no server and no build step, so it runs on any free web host and installs on phones as an app.

## What is in this folder

| File | What it does |
|---|---|
| `index.html` | The whole app |
| `manifest.webmanifest` | Lets phones install it with its own name and icon |
| `sw.js` | Lets the app open offline after the first visit |
| `icons/` | App icons for Android, iPhone and browser tabs |

## 1. Put it on GitHub

1. Unzip the download.
2. On github.com choose **New repository**. Name it `payday-planner`, choose **Public**, and create it. (Free accounts can only use GitHub Pages with public repositories.)
3. On the empty repository page choose **uploading an existing file**.
4. Drag in everything from inside the unzipped folder, including the `icons` folder, then choose **Commit changes**.

If you prefer the command line, run this inside the unzipped folder:

```
git init
git add .
git commit -m "Payday Planner"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/payday-planner.git
git push -u origin main
```

## 2. Turn on the website

1. In the repository open **Settings**, then **Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**, pick branch `main` and folder `/ (root)`, and save.
3. After a minute or two the app is live at `https://YOUR-USERNAME.github.io/payday-planner/`.

## 3. Use your own domain

1. Buy a domain from any registrar.
2. In the repository open **Settings**, then **Pages**. Under **Custom domain** enter your domain (for example `payday.example.com` or `example.com`) and save. GitHub adds a file named `CNAME` to your repository.
3. At your registrar's DNS settings, add the records below and remove any default records the registrar put there.

   For a main domain such as `example.com`, add four `A` records on `@`:

   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   For a `www` address, add a `CNAME` record on `www` that points to `YOUR-USERNAME.github.io` (no repository name).
   Do not add wildcard records such as `*.example.com`.
4. DNS changes can take up to 24 hours. When the Pages settings show the domain as ready, tick **Enforce HTTPS**. The checkbox can take up to 24 hours to appear.

Netlify, Cloudflare Pages and Vercel can also publish straight from this repository and set up HTTPS for you.

## 4. Install it on a phone

- **iPhone or iPad:** open the site in Safari, tap **Share**, then **Add to Home Screen**.
- **Android:** open the site in Chrome, open the menu, then tap **Install app** (or **Add to Home screen**).

It then opens full screen like an app and works offline after the first visit.

## 5. Where your data lives

This version has no accounts. Each person's planner is stored in their own browser on their own device and is never sent anywhere. That keeps it private, but it also means:

- A phone and a laptop do not share data.
- Clearing browser data erases the planner.

Use **Settings, Export backup** to save a file, and **Import backup** to load it on another device. Export a backup now and then.

Fonts load from Google Fonts. Replace them with self-hosted fonts if you do not want that request.

## 6. Next steps

**Accounts and sync across devices.** For people to create their own account and see the same planner on every device, the app needs a small backend. Supabase is a good fit: it provides sign-up, sign-in and a database, and its row-level security rules let each person read and write only their own planner. The app already keeps everything in one document per person, so the change is mostly swapping the load and save functions.

Never put a secret key in this repository. Supabase's public "anon" key is designed to be in the page, but its service key is not.

**iOS and Android store apps.** Capacitor wraps this same web code in native apps:

```
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npx cap init "Payday Planner" com.yourname.paydayplanner --web-dir .
npx cap add ios
npx cap add android
```

Building for iPhone needs a Mac with Xcode, building for Android needs Android Studio, and both stores require a paid developer account. Add accounts first, so people's data follows them from the web to the apps.
