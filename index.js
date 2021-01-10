const puppeteer = require('puppeteer');

  const setlike = async (url, msj) => {
    const browser = await puppeteer.launch({headless: false})
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto(url)
    await page.waitForSelector('textarea')
    await page.waitForTimeout(2500)
    const element = await page.$x(`//*[@class="question-item__body" and contains(., "${msj}")]/../div[1]/div[3]/div[2]/button`)
    await page.waitForTimeout(500)
    await element[0].click();
  }


  const scrap = async (url, msj, likes) => {
    const browser = await puppeteer.launch({headless: false})
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto(url)
    await page.waitForSelector('textarea')
    await page.waitForTimeout(2500)
    const exist = await page.$x(`//*[@class="question-item__body" and contains(., "${msj}")]`);
    if(exist.length > 0) {
      for(let i = 0; i < likes; i++) {
        await page.waitForTimeout(500)
        setlike(url, msj)
      }
    } else {
      await page.type('#question-field', msj, {delay: 200})
        await page.click('.question-form__footer > button')
        await page.waitForTimeout(1500)
        for(let i = 0; i < likes; i++) {
          await page.waitForTimeout(500)
          setlike(url, msj)
        }
    }

    await browser.close()
  }


scrap(process.argv.slice(2)[0], process.argv.slice(2)[1], process.argv.slice(2)[2])