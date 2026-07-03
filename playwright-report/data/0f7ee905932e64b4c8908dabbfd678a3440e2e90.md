# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppOtherWay.spec.js >> Browser Context Playwrit test
- Location: tests\ClientAppOtherWay.spec.js:4:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e11] [cursor=pointer]:
      - /url: https://techsmarthire.com/
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1  | const {test, expect} = require('@playwright/test');
  2  | 
  3  | 
  4  | test('Browser Context Playwrit test', async ({page}) => 
  5  | {
  6  | 
  7  | const email = "sheikhseraj2@gmail.com";
  8  | const productName = "ZARA COAT 3";
  9  | const products = page.locator(".card-body");    
  10 | await page.goto("https://rahulshettyacademy.com/client/");
  11 | await page.getByPlaceholder("email@example.com").fill(email);
  12 | await page.getByPlaceholder("enter your passsword").fill("PlayWright@1");
  13 | await page.getByRole("button", {name: "Login"}).click();
  14 | // await page.locator("#login").click();
  15 | await page.waitForLoadState('networkidle');
  16 | await page.locator(".card-body b").first().waitFor();
  17 | await page.locator(".card-body b").filter({hasText: productName}).first().waitFor();
  18 | 
  19 | await page.locator(".card-body").filter({hasText: productName}).first()
  20 | .getByRole("button", {name: "Add To Cart"}).click();
  21 | 
  22 | await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();
  23 | 
> 24 | await page.locator("div li").first().waitFor();
     |                                      ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  25 | //const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();    //we use below cammand
  26 | await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  27 | 
  28 | // await page.locator("text=Checkout").click();
  29 | await page.getByRole("button", {name: "Checkout"}).click();
  30 | 
  31 | // await page.locator("[placeholder*='Country']").pressSequentially("ind");
  32 | await page.getByPlaceholder("Select Country").pressSequentially("ind");
  33 | 
  34 | await page.getByRole("button", {name: "India"}).nth(1).click();
  35 | //expect(await page.locator(".user__name [type='text']").first()).toHaveText(email);
  36 | //await page.locator("input.input.txt").nth(1).fill("666");
  37 | //await page.locator("input.input.txt").nth(2).fill("Sheikh Seraj");
  38 | //await page.locator("input.input.txt").nth(3).fill("123");
  39 | //await page.locator(".btn-primary").click();
  40 | await page.getByText("PLACE ORDER").click();
  41 | //await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.");
  42 | await expect (page.getByText("Thankyou for the order.")).toBeVisible();
  43 | 
  44 | 
  45 | });
  46 | 
  47 | 
```