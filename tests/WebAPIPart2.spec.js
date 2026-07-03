// Login with UI --> .json
//testbrowser, cart-, order, orderdetails, order history


const { test, expect } = require('@playwright/test');
let webContext;

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("sheikhseraj2@gmail.com");
    await page.locator("#userPassword").fill("PlayWright@1");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: "state.json" });
    webContext = await browser.newContext({ storageState: "state.json" });


});

test('Client App login', async () => {

    const email = "";
    const productName = "ZARA COAT 3";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    const products = page.locator(".card-body");
    const title = await page.locator(".card-body b").allTextContents();
    console.log(title);
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }

    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    expect(await page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator("input.input.txt").nth(1).fill("666");
    await page.locator("input.input.txt").nth(2).fill("Sheikh Seraj");
    //await page.locator("input.input.txt").nth(3).fill("123");
    //await page.locator(".btn-primary").click();
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (orderID.includes(rowOrderID)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderDetails)).toBeTruthy();


});


test('Test Case 2', async () => {

    const email = "";
    const productName = "ZARA COAT 3";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    const products = page.locator(".card-body");
    const title = await page.locator(".card-body b").allTextContents();
    console.log(title);

})