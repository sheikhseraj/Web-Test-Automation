const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../utils/ApiUtils');
const loginPayload = { userEmail: "sheikhseraj2@gmail.com", userPassword: "PlayWright@1" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    response = await apiUtils.creatOrder(orderPayload);

});

//create prder is success
test('Place the order', async ({ page }) => {

    await page.addInitScript(value => {

        window.localStorage.setItem("token", value);

    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (response.orderID.includes(rowOrderID)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderID.includes(orderDetails)).toBeTruthy();

});

//Verrify if order created is showing in history page
//Precondition - create order -