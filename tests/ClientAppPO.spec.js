const {test, expect} = require('@playwright/test');
const {customtest} = require('../utils/test-base');

const {POManager} = require('../pageobjects/POManager');
//Json->string->js object
const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));


for(const data of dataset)
{

test(`@Web Client App login for ${data.productName}`, async ({page}) => 
{

const poManager = new POManager(page);
//js file- login js, DashboardPage js, CartPage.js, CheckoutPage.js, OrderPage.js

const products = page.locator(".card-body");
const loginPage = poManager.getLoginPage();
await loginPage.goTo();
await loginPage.validLogin(data.username, data.password);
const dashboardPage = poManager.getDashboardPage();
await dashboardPage.searchProductAddToCart(data.productName);
await dashboardPage.navigateToCart();

await page.locator("div li").first().waitFor();
const bool = await page.locator(`h3:has-text('${data.productName}')`).isVisible();
expect(bool).toBeTruthy();
await page.locator("text=Checkout").click();

await page.locator("[placeholder*='Country']").pressSequentially("ind");
const dropdown = page.locator(".ta-results");
await dropdown.waitFor();
const optionsCount = await dropdown.locator("button").count();
for (let i=0; i<optionsCount; ++i)
{
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India")
    {
        await dropdown.locator("button").nth(i).click();
        break;
    }
}

expect(await page.locator(".user__name [type='text']").first()).toHaveText(data.username);
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
for (let i=0; i<await rows.count(); ++i)
{
    const rowOrderID = await rows.nth(i).locator("th").textContent();
    if (orderID.includes(rowOrderID))
    {
        await rows.nth(i).locator("button").first().click();
        break;
    }
}

const orderDetails = await page.locator(".col-text").textContent();
expect(orderID.includes(orderDetails)).toBeTruthy();



});
}
//---------------------------------

customtest(`@Web Client App login`, async ({page, testDataForOrder}) => 
{

const poManager = new POManager(page);
//js file- login js, DashboardPage js, CartPage.js, CheckoutPage.js, OrderPage.js

const products = page.locator(".card-body");
const loginPage = poManager.getLoginPage();
await loginPage.goTo();
await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
const dashboardPage = poManager.getDashboardPage();
await dashboardPage.searchProductAddToCart(testDataForOrder.productName);
await dashboardPage.navigateToCart();

await page.locator("div li").first().waitFor();
const bool = await page.locator(`h3:has-text('${testDataForOrder.productName}')`).isVisible();
expect(bool).toBeTruthy();
await page.locator("text=Checkout").click();

});
