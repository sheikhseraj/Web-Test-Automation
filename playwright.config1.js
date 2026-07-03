// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { workers } from 'node:cluster';
import { permission } from 'node:process';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries : 1,
  workers : 2,
  timeout: 30 * 1000,
    expect : {
        timeout: 5000,
    },
  reporter : 'html',
  projects : [
  {
    name : 'safari',
    use: 
    {

      browserName : 'webkit',
      headless : false,
      screenshot : 'only-on-failure',
      trace : 'retain-on-failure',
      //...devices['iPhone 12'],
    
    },
  },
    {

      name : 'chrome',
      use: 
      {

        browserName : 'chromium',
        headless : false,
        screenshot : 'only-on-failure',
        video : 'retain-on-failure',
        trace : 'retain-on-failure',
        //viewport : {width : 1280, height : 720},
        //ignoreHTTPSErrors : true,
        //permissions : ['geolocation'],
    
      }
    },
    {

      name : 'firefox',
      use: 
      {

        browserName : 'firefox',
        headless : false,
        screenshot : 'only-on-failure',
        trace : 'retain-on-failure',
    
      }
       
    }

  ]
  
});
module.exports = config
