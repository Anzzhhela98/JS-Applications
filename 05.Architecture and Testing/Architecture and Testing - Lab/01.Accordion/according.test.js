const { expect } = require('chai');
const { chromium } = require('playwright-chromium');

let browser, page; // Declare reusable variables

describe('E2E tests', function() {
    this.timeout(6000); //?
    before(async() => {
        // browser = await chromium.launch({ headless: false, slowMo: 500 }); // visualizing the actions
        browser = await chromium.launch();
    });

    after(async() => {
        await browser.close();
    });

    beforeEach(async() => {
        page = await browser.newPage();
    });

    afterEach(async() => {
        await page.close();
    });

    it('loads static page and checks if all topics are present', async() => {
        await page.goto('http://localhost:3000/');
        // Click text=Scalable Vector Graphics
        await page.click('text=Scalable Vector Graphics');
        // Click text=Unix
        await page.click('text=Unix');
        // Click span:has-text("Open standard")
        await page.click('span:has-text("Open standard")');
        // Click text=ALGOL
        await page.click('text=ALGOL');
    })

    it('loads static page and checks if More button show toggles content', async() => {
        await page.goto('http://localhost:3000/');
        // Click text=More
        await page.click('text=More');
        // Click text=Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based vect
        const isVisible = await page
            .isVisible('text=Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based vect');

        expect(isVisible).to.be.true;
    });

    it('loads static page and checks when More button is click the page should change to Less button', async() => {
        await page.goto('http://localhost:3000/');
        // Click text=More
        await page.click('text=More');
        // Click text=Less
        const isVisible = await page.isVisible('text=Less');
        expect(isVisible).to.be.true;
    });
})