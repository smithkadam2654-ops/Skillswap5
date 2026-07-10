import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text(), msg.location().url));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('response', response => {
    if (response.status() === 404) {
      console.log('404:', response.url());
    }
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  await page.evaluate(() => {
    localStorage.setItem('isAuthenticated', 'true');
  });

  await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle0' });
  
  console.log("PAGE LOADED");
  await browser.close();
})();
