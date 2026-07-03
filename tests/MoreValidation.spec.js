const {test, expect} = require('@playwright/test');

//test.describe.configure({mode : 'parallel'});
//test.describe.configure({mode : 'serial'});
test("Popups validation", async({page}) => 
{
    await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");
   // await page.goto("http://google.com");
   // await page.goBack();
   // await page.goForward();
   await expect(page.locator("#displayed-text")).toBeVisible();
   await page.locator("#hide-textbox").click();
   await expect(page.locator("#displayed-text")).toBeHidden();
   //await page.pause();
   page.on("dialog", dialog => dialog.accept());
   await page.locator("#confirmbtn").click();
   await page.locator("#mousehover").hover();
   const framesPage = page.frameLocator("#courses-iframe");
   //await page.goto("https://legacy.rahulshettyacademy.com/");
   framesPage.locator("li a[href*='lifetime-access']:Visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
   console.log(textCheck.split(" ") [1]);

})

test("Screenshot & Visual Comparison", async({page}) =>
{
    
  await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#displayed-text").screenshot({path: 'partialScreenshot.png'});
  await page.locator("#hide-textbox").click();
  await page.screenshot({path: 'screenshot.png'});
  await expect(page.locator("#displayed-text")).toBeHidden();
    
});

//screenshot - store --> screenshot ->
/* test.only("visual", async({page}) =>
{
    await page.goto("https://www.langnation.com/");
    await expect(await page.screenshot()).toMatchSnapshot('landing.png');
}); */