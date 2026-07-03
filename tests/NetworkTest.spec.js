const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../utils/ApiUtils');
const loginPayload = { userEmail: "sheikhseraj2@gmail.com", userPassword: "PlayWright@1" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakepayLoadOrder = { "data": [], "message": "No Orders" };

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


    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {

            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakepayLoadOrder);
            route.fulfill({

                response,
                body,
            });

            //intercepting the response - API response -> {playwright fake response} -> browser -> render data on front end

        });
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator(".mt-4").textContent());
    //await page.locator("tbody").waitFor();
    //const rows = await page.locator("tbody tr");


});


