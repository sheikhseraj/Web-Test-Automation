const {test, expect} = require('@playwright/test');


test('Browser Context Playwrit test', async ({page}) => 
{

const email = "sheikhseraj2@gmail.com";
const productName = "ZARA COAT 3";
const products = page.locator(".card-body");    
await page.goto("https://rahulshettyacademy.com/client/");
await page.getByPlaceholder("email@example.com").fill(email);
await page.getByPlaceholder("enter your passsword").fill("PlayWright@1");
await page.getByRole("button", {name: "Login"}).click();
// await page.locator("#login").click();
await page.waitForLoadState('networkidle');
await page.locator(".card-body b").first().waitFor();
await page.locator(".card-body b").filter({hasText: productName}).first().waitFor();

await page.locator(".card-body").filter({hasText: productName}).first()
.getByRole("button", {name: "Add To Cart"}).click();

await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();

await page.locator("div li").first().waitFor();
//const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();    //we use below cammand
await expect(page.getByText("ZARA COAT 3")).toBeVisible();

// await page.locator("text=Checkout").click();
await page.getByRole("button", {name: "Checkout"}).click();

// await page.locator("[placeholder*='Country']").pressSequentially("ind");
await page.getByPlaceholder("Select Country").pressSequentially("ind");

await page.getByRole("button", {name: "India"}).nth(1).click();
//expect(await page.locator(".user__name [type='text']").first()).toHaveText(email);
//await page.locator("input.input.txt").nth(1).fill("666");
//await page.locator("input.input.txt").nth(2).fill("Sheikh Seraj");
//await page.locator("input.input.txt").nth(3).fill("123");
//await page.locator(".btn-primary").click();
await page.getByText("PLACE ORDER").click();
//await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.");
await expect (page.getByText("Thankyou for the order.")).toBeVisible();


});

