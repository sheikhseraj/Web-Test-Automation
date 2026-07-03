# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: upload-download.spec.js >> Upload download excel validation
- Location: tests\upload-download.spec.js:38:1

# Error details

```
Error: File not found: C:/Users/sheik/Downloads/download.xlsx
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - 'heading "RAHUL SHETTY ACADEMY PRACTISE Note: Data will be reset after page refresh." [level=1] [ref=e6]':
      - text: RAHUL SHETTY ACADEMY PRACTISE
      - generic [ref=e7]: "Note: Data will be reset after page refresh."
  - generic [ref=e8]:
    - table [ref=e11]:
      - rowgroup [ref=e12]:
        - row "S No ▲ Fruit Name ▲ Color ▲ Price ▲ Season ▲" [ref=e13]:
          - columnheader "S No ▲" [ref=e15] [cursor=pointer]:
            - generic [ref=e16]: S No
            - generic [ref=e17]: ▲
          - columnheader "Fruit Name ▲" [ref=e19] [cursor=pointer]:
            - generic [ref=e20]: Fruit Name
            - generic [ref=e21]: ▲
          - columnheader "Color ▲" [ref=e23] [cursor=pointer]:
            - generic [ref=e24]: Color
            - generic [ref=e25]: ▲
          - columnheader "Price ▲" [ref=e27] [cursor=pointer]:
            - generic [ref=e28]: Price
            - generic [ref=e29]: ▲
          - columnheader "Season ▲" [ref=e31] [cursor=pointer]:
            - generic [ref=e32]: Season
            - generic [ref=e33]: ▲
      - rowgroup [ref=e34]:
        - row "1 Mango Yellow 299 Summer" [ref=e35]:
          - cell "1" [ref=e36]:
            - generic [ref=e37]: "1"
          - cell "Mango" [ref=e38]:
            - generic [ref=e39]: Mango
          - cell "Yellow" [ref=e40]:
            - generic [ref=e41]: Yellow
          - cell "299" [ref=e42]:
            - generic [ref=e43]: "299"
          - cell "Summer" [ref=e44]:
            - generic [ref=e45]: Summer
        - row "2 Apple Red 345 Winter" [ref=e46]:
          - cell "2" [ref=e47]:
            - generic [ref=e48]: "2"
          - cell "Apple" [ref=e49]:
            - generic [ref=e50]: Apple
          - cell "Red" [ref=e51]:
            - generic [ref=e52]: Red
          - cell "345" [ref=e53]:
            - generic [ref=e54]: "345"
          - cell "Winter" [ref=e55]:
            - generic [ref=e56]: Winter
        - row "3 Papaya Orange 187 Spring" [ref=e57]:
          - cell "3" [ref=e58]:
            - generic [ref=e59]: "3"
          - cell "Papaya" [ref=e60]:
            - generic [ref=e61]: Papaya
          - cell "Orange" [ref=e62]:
            - generic [ref=e63]: Orange
          - cell "187" [ref=e64]:
            - generic [ref=e65]: "187"
          - cell "Spring" [ref=e66]:
            - generic [ref=e67]: Spring
        - row "4 Banana Yellow 69 All" [ref=e68]:
          - cell "4" [ref=e69]:
            - generic [ref=e70]: "4"
          - cell "Banana" [ref=e71]:
            - generic [ref=e72]: Banana
          - cell "Yellow" [ref=e73]:
            - generic [ref=e74]: Yellow
          - cell "69" [ref=e75]:
            - generic [ref=e76]: "69"
          - cell "All" [ref=e77]:
            - generic [ref=e78]: All
        - row "5 Kivi Green 399 Winter" [ref=e79]:
          - cell "5" [ref=e80]:
            - generic [ref=e81]: "5"
          - cell "Kivi" [ref=e82]:
            - generic [ref=e83]: Kivi
          - cell "Green" [ref=e84]:
            - generic [ref=e85]: Green
          - cell "399" [ref=e86]:
            - generic [ref=e87]: "399"
          - cell "Winter" [ref=e88]:
            - generic [ref=e89]: Winter
        - row "6 Orange Orange 199 Summer" [ref=e90]:
          - cell "6" [ref=e91]:
            - generic [ref=e92]: "6"
          - cell "Orange" [ref=e93]:
            - generic [ref=e94]: Orange
          - cell "Orange" [ref=e95]:
            - generic [ref=e96]: Orange
          - cell "199" [ref=e97]:
            - generic [ref=e98]: "199"
          - cell "Summer" [ref=e99]:
            - generic [ref=e100]: Summer
    - navigation [ref=e102]:
      - generic [ref=e103]: "Rows per page:"
      - generic [ref=e104]:
        - combobox "Rows per page:" [ref=e105] [cursor=pointer]:
          - option "10" [selected]
          - option "15"
          - option "20"
          - option "25"
          - option "30"
        - img
      - generic [ref=e106]: 1-6 of 6
      - generic [ref=e107]:
        - button "First Page" [disabled] [ref=e108]:
          - img [ref=e109]
        - button "Previous Page" [disabled] [ref=e112]:
          - img [ref=e113]
        - button "Next Page" [disabled] [ref=e116]:
          - img [ref=e117]
        - button "Last Page" [disabled] [ref=e120]:
          - img [ref=e121]
  - generic [ref=e125]:
    - button "Download" [active] [ref=e126] [cursor=pointer]
    - button "Choose File" [ref=e127]
```

# Test source

```ts
  1  | const ExcelJs = require('exceljs');
  2  | const {test, expect} = require('@playwright/test');
  3  | 
  4  | // Function 1
  5  | async function writeExcelTest(searchText,replaceText,change,filePath) 
  6  | {
  7  |     const workbook = new ExcelJs.Workbook();
> 8  |     await workbook.xlsx.readFile(filePath);
     |     ^ Error: File not found: C:/Users/sheik/Downloads/download.xlsx
  9  |     const worksheet = workbook.getWorksheet('Sheet1');
  10 |     const output = await readExcel(worksheet, searchText);
  11 |     
  12 |     const cell = worksheet.getCell(output.row,output.column+change.colChange);
  13 |     cell.value = replaceText;
  14 |     await workbook.xlsx.writeFile(filePath);
  15 |     // console.log("Excel updated successfully");
  16 | 
  17 | };
  18 | // Function 2
  19 | function readExcel (worksheet, searchText)
  20 | {
  21 |     let output = {row:-1,column:-1};
  22 |     worksheet.eachRow((row, rowNumber) => 
  23 |     {     
  24 |         row.eachCell((cell, colNumber) => 
  25 |         {
  26 |             if (cell.value === searchText) 
  27 |             {
  28 |                 output.row = rowNumber;
  29 |                 output.column = colNumber;
  30 |             }           
  31 |         });
  32 |     });
  33 |     return output;
  34 | }
  35 |  // Update Mango price to 350
  36 |  // writeExcelTest("Mango",350,{rowChange:0,colChange:2},"C:/Users/sheik/ExcelJSUtil/excelTest.xlsx");
  37 | 
  38 | test('Upload download excel validation', async ({page}) => 
  39 | {
  40 |     await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
  41 |     const downloadPromise = page.waitForEvent('download');
  42 |     await page.getByRole('button',{name: 'Download'}).click();
  43 |     await downloadPromise;
  44 |     //const filePath = 'C:/Users/sheik/Downloads/download.xlsx';
  45 |     await writeExcelTest("Mango",350,{rowChange:0,colChange:2},"C:/Users/sheik/Downloads/download.xlsx");
  46 |     await page.locator('#fileinput').click();
  47 |     await page.locator('#fileinput').setInputFiles("C:/Users/sheik/Downloads/download.xlsx");
  48 | 
  49 | 
  50 | 
  51 | })
```