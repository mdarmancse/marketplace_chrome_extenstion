# Facebook Marketplace Product Uploader

This project automates the process of uploading products to the **French Facebook Marketplace** using **Puppeteer**.

## 🚀 Features
- Logs into Facebook automatically (saves session cookies for future use).
- Navigates to **French Facebook Marketplace**.
- Handles **CAPTCHA** (requires manual solving).
- Fills in product details: **Title, Price, Description**.
- Uploads images.
- Clicks the "Publish" button.

## 📦 Installation

### 1️⃣ Clone the repository :
```sh
git clone https://github.com/mdarmancse/marketplace_chrome_extenstion.git
cd backend (for backend)
cd extension (for extension)
```

### 2️⃣ Install dependencies:
```sh
npm install
```

### 3️⃣ Configure Environment Variables:
Create a `.env` file in the root directory and add:
```ini
PORT=9000
MONGO_URI=your mongo uri
FB_EMAIL=your-email@example.com
FB_PASSWORD=your-facebook-password
```

## 🔧 Usage

### 1️⃣ Start the script:
```sh
node server.js
```

### 2️⃣ API Endpoint
Documentation link of API endpoint to receive product details:
https://documenter.getpostman.com/view/31446687/2sAYXCidTi


## 🛠️ How It Works
1. **Need to first Upload Product through API or frontend.**
2. **Fetch Product (Show last added product) then click upload to marketplace.**
3. **Opens Facebook in French** (`https://www.facebook.com/?locale=fr_FR`).
4. **Checks if already logged in** (uses session cookies).
**Handles CAPTCHA** (if detected, waits for manual solving).
5. **Navigates to Marketplace** (`https://www.facebook.com/marketplace/create?locale=fr_FR`).
6. **Fills in Title, Price, Description, and uploads images**.
7. **Clicks "Publish" and exits**.

## ⚠️ Troubleshooting
### ❌ Issue: "No element found for selector: [aria-label='Description']"

## 📜 License
MIT License. Feel free to modify and use!

