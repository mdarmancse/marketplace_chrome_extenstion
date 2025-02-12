import { fileURLToPath } from 'url';
import path from 'path';
import puppeteer from 'puppeteer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function uploadToMarketplace(req, res) {
    try {
        const { title, description, price, images } = req.body;
        const cookiesPath = path.join(__dirname, 'cookies.json');

        console.log(" Launching Puppeteer...");
        const browser = await puppeteer.launch({
            headless: false,
            userDataDir: path.join(__dirname, 'user_data')
        });

        const page = await browser.newPage();
        if (fs.existsSync(cookiesPath)) {
            const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf8'));
            await page.setCookie(...cookies);
            console.log("✅ Loaded saved session cookies.");
        }

        await page.goto('https://www.facebook.com/?locale=fr_FR', { waitUntil: 'networkidle2' });

        const isLoggedIn = await page.evaluate(() => {
            return !!document.querySelector('[aria-label="Créer une publication"], [role="banner"]');
        });

        if (!isLoggedIn) {
            console.log("🔐 Logging into Facebook...");
            await page.goto('https://www.facebook.com/login?locale=fr_FR', { waitUntil: 'networkidle2' });

            await page.type('#email', process.env.FB_EMAIL);
            await page.type('#pass', process.env.FB_PASSWORD);
            await page.click('button[name="login"]');

            await page.waitForNavigation({ waitUntil: 'networkidle2' });

            const cookies = await page.cookies();
            fs.writeFileSync(cookiesPath, JSON.stringify(cookies));
            console.log("✅ Session saved!");
        } else {
            console.log("✅ Already logged in!");
        }

        const isCaptchaPresent = await page.evaluate(() => {
            return !!document.querySelector('[id*="captcha"], [name="captcha"]');
        });

        if (isCaptchaPresent) {
            console.log("⚠️ CAPTCHA detected! Please solve it manually.");
            await page.waitForTimeout(30000);
        }


        await page.goto('https://www.facebook.com/marketplace/create?locale=fr_FR', { waitUntil: 'networkidle2' });

        await page.waitForSelector('[aria-label="Titre"], input[name="title"]', { timeout: 10000 });


        await page.type('[aria-label="Titre"], input[name="title"]', title);
        await page.type('[aria-label="Prix"], input[name="price"]', price.toString() + ' €');




        await new Promise(resolve => setTimeout(resolve, 5000));

        // await browser.close();
        res.json({ success: true, message: '' });
    } catch (error) {
        console.error("❌ Upload Error:", error);
        res.status(500).json({ error: 'Error uploading product' });
    }
}

export { uploadToMarketplace };
