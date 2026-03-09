# 🚀 AppVault — Flutter App Store

Apne Flutter apps ke liye personal app store website.
GitHub Pages ya Netlify par **free** host karein.

---

## 📁 Project Structure

```
appvault/
├── index.html              ← Main page (HTML structure)
├── css/
│   ├── style.css           ← Layout & base styles
│   └── components.css      ← Cards, buttons, badges
├── js/
│   ├── apps-data.js        ← ✏️ SIRF YEH EDIT KAREIN (apps add/remove)
│   ├── render.js           ← Card HTML banane ka logic
│   └── main.js             ← Search, filter, events
├── assets/
│   └── icons/              ← Custom icons ya screenshots (optional)
├── downloads/
│   ├── README.txt
│   ├── yourapp.apk         ← APK files yahan rakhein
│   └── yourapp.ipa         ← IPA files yahan rakhein
└── README.md
```

---

## ✏️ Naya App Kaise Add Karein

Sirf `js/apps-data.js` file kholo aur array mein naya object add karo:

```js
{
  name:        "Meri App",
  developer:   "Aapka Naam",
  category:    "utility",       // utility, education, business, social, game, health
  icon:        "🛠️",
  iconBg:      "linear-gradient(135deg, #f7971e, #ffd200)",
  description: "App ki chhoti description...",
  version:     "1.0.0",
  size:        "15 MB",
  rating:      4.5,
  reviews:     50,
  isNew:       true,
  apkUrl:      "downloads/meri-app.apk",   // khali chhodo agar nahi: ""
  ipaUrl:      "downloads/meri-app.ipa",   // khali chhodo agar nahi: ""
},
```

---

## 🚀 GitHub Pages par Deploy Karna

1. GitHub par naya repository banao (e.g. `my-app-store`)
2. Saari files upload karo (ya `git push` karo)
3. Repo → **Settings** → **Pages** → Source: `main` branch → Save
4. Kuch minute baad aapki site live hogi:
   `https://yourusername.github.io/my-app-store`

---

## ⚡ Netlify par Deploy Karna (Aur Bhi Asaan)

1. [netlify.com](https://netlify.com) par free account banao
2. `appvault` folder ko drag & drop karo
3. **30 seconds** mein live! 🎉

---

## 💡 Tips

- APK size zyada ho toh **GitHub Releases** mein upload karo aur wahan ka link use karo
- iOS ke liye users ko **AltStore** ya **Sideloadly** recommend karo
- `iconBg` ke liye [cssgradient.io](https://cssgradient.io) use kar sakte hain
