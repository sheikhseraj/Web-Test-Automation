# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Record.spec.js >> test
- Location: tests\Record.spec.js:3:5

# Error details

```
Error: locator.press: Unknown key: "BrowserFavorites"
Call log:
  - waiting for getByRole('textbox', { name: 'Please choose your delivery' })
    - locator resolved to <input type="text" id="country" class="validate filter-input form-control ng-untouched ng-pristine ng-valid"/>
  - elementHandle.press("BrowserFavorites")

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e5]:
    - link "ProtoCommerce" [ref=e6] [cursor=pointer]:
      - /url: "#"
    - list [ref=e7]:
      - listitem [ref=e8]:
        - link "Home" [ref=e9] [cursor=pointer]:
          - /url: /angularpractice
      - listitem [ref=e10]:
        - link "Shop" [ref=e11] [cursor=pointer]:
          - /url: /angularpractice/shop
  - generic [ref=e12]:
    - navigation [ref=e13]:
      - generic [ref=e14]:
        - link "ProtoCommerce Home" [ref=e15] [cursor=pointer]:
          - /url: "#"
        - list [ref=e17]:
          - listitem [ref=e18]:
            - generic [ref=e19] [cursor=pointer]:
              - text: Checkout ( 1 )
              - generic [ref=e20]: (current)
    - generic [ref=e23]:
      - generic [ref=e24]:
        - generic [ref=e25]:
          - text: Please choose your delivery location.
          - text: Then click on purchase button
        - textbox "Please choose your delivery location. Then click on purchase button" [active] [ref=e26]
      - generic [ref=e27]:
        - checkbox "I agree with the term & Conditions" [ref=e28]
        - generic [ref=e29] [cursor=pointer]: I agree with the term & Conditions
      - button "Purchase" [ref=e31] [cursor=pointer]
    - contentinfo [ref=e32]:
      - paragraph [ref=e34]: Copyright © ProtoCommerce 2018
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('test', async ({ page }) => {
  4  |   await page.goto('https://rahulshettyacademy.com/angularpractice/');
  5  |   await page.getByRole('link', { name: 'Shop' }).click();
  6  |   await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
  7  |   await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).click();
  8  |   await page.getByText('Checkout ( 1 ) (current)').click();
  9  |   await page.getByRole('button', { name: 'Checkout' }).click();
> 10 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).press('BrowserFavorites');
     |                                                                            ^ Error: locator.press: Unknown key: "BrowserFavorites"
  11 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('i');
  12 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).press('BrowserFavorites');
  13 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).press('BrowserFavorites');
  14 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('in');
  15 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).press('BrowserFavorites');
  16 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).press('BrowserFavorites');
  17 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('ind');
  18 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).press('BrowserFavorites');
  19 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).press('BrowserFavorites');
  20 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('indi');
  21 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).press('BrowserFavorites');
  22 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).press('BrowserFavorites');
  23 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('india');
  24 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).press('BrowserFavorites');
  25 |   await page.getByText('India').click();
  26 |   await page.getByText('I agree with the term &').click();
  27 |   await page.getByRole('button', { name: 'Purchase' }).click();
  28 |   await expect(page.getByText('× Success! Thank you! Your')).toBeVisible();
  29 |   await page.getByText('Please choose your delivery').click();
  30 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  31 |   await page.getByRole('button', { name: 'Purchase' }).click();
  32 | });
```