import { chromium } from 'playwright';

(async () => {
  console.log('🚀 Launching browser to test app...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Capture console messages
  const consoleMessages = [];
  page.on('console', msg => {
    const text = msg.text();
    consoleMessages.push(`[${msg.type()}] ${text}`);
    console.log(`  [${msg.type()}] ${text}`);
  });
  
  // Capture page errors
  page.on('pageerror', error => {
    console.log(`  [ERROR] ${error.message}`);
    consoleMessages.push(`[ERROR] ${error.message}`);
  });
  
  try {
    console.log('📍 Navigating to http://localhost:5173...\n');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 10000 });
    
    // Wait a bit for React to render
    await page.waitForTimeout(2000);
    
    // Check if there are any visible errors on page
    const bodyText = await page.textContent('body');
    console.log('\n📄 Page content preview:');
    console.log(bodyText.substring(0, 200) + '...\n');
    
    // Take a screenshot
    await page.screenshot({ path: 'app-screenshot.png', fullPage: true });
    console.log('📸 Screenshot saved to app-screenshot.png\n');
    
    console.log('✅ Browser test complete!');
    
  } catch (error) {
    console.error('❌ Error during test:', error.message);
  } finally {
    await browser.close();
  }
})();
