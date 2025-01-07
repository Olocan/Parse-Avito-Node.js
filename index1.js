import puppeteer from "puppeteer";
import { scrollPageToBottom } from "puppeteer-autoscroll-down";
// import { scrollPageToTop } from "puppeteer-autoscroll-down";
import fs from "fs";
import { abort } from "process";
// export const LAUNCH_PUPPETEER_OPTS = {
//     args: [
//       '--no-sandbox',
//       '--disable-setuid-sandbox',
//       '--disable-dev-shm-usage',
//       '--disable-accelerated-2d-canvas',
//       '--disable-gpu',
//       '--window-size=1920x1080'
//     ]
//   };
  
//   export const PAGE_PUPPETEER_OPTS = {
//     networkIdle2Timeout: 5000,
//     waitUntil: 'networkidle2',
//     timeout: 3000000
//   };
  // let c = true;
  // let incr = 0;
  let res = []; // массив пропарсенных объектов
  let iter = 0; // счетчик
let url = "https://www.avito.ru/sankt-peterburg?cd=1&q=тестомес"; // url для парсинга товаров
(
async () => {
const browser = await puppeteer.launch({ 
  headless: true,
  defaultViewport: null,
  args: ['--start-maximized'] 
});
let page = await browser.newPage();
await page.setDefaultNavigationTimeout(0);
while(url)
  {
    iter++;
  await page.goto(url,{waitUntil: 'domcontentloaded'});
  const lastPosition = await scrollPageToBottom(page, {
    size: 500,
    delay: 250
  });
const res2 = await page.evaluate( () => {
  const items = document.querySelectorAll("[data-marker=item]");
  const res1 = [];
   for (let i = 0; i < items.length; i++)    
            {
           const title = items[i].querySelector("h3").textContent;
           const price = items[i].querySelector("[itemprop=price]").getAttribute("content");
           let img = items[i].querySelector("[itemprop=image]")?.getAttribute("src"); 
           if(!img) 
           {img = items[i].querySelector(".native-video-thumbnail-XABIA")?.getAttribute("src"); }
           else
           {}
           res1.push({name: title, pr: price, i: img});
            }   
            return res1;
}
)
url = await page.evaluate( () => {
    if(document.querySelector('[aria-label="Следующая страница"]'))
    {
return 'https://www.avito.ru' + document.querySelector('[aria-label="Следующая страница"]').getAttribute("href");
    }
    else
    {
return false;
    }
})
  res.push(...res2); // записываем результаты парсинга каждой страницы в массив
  console.log(iter);
  if(iter == 100)
  {
   break;
  }
}
await browser.close();
const json = JSON.stringify(res,null," "); // преобразуем массив с объектами в JSON
 fs.writeFile("thing.json",json,function(err, result) {
  if(err) console.log('error', err);
}); // записывам результаты парсинга всех страниц в JSON файл

}
)()
// function addZero(num) {
//   if (num >= 0 && num <= 9) {
//     return '0' + num;
//   } else {
//     return num;
//   }
// }
// const test = []
// let c = true;
//   let incr = 0;
//   const date = new Date()
//   let date1
// (async () => {
//   const browser = await puppeteer.launch({ 
//   headless: false,
//   defaultViewport: null,
//   args: ['--start-maximized'] 
// });
// let page = await browser.newPage();
// await page.setDefaultNavigationTimeout(0);
// await page.goto("https://www.booking.com//hotel//ge//villa-gantiadi-batumi1.ru.html",{waitUntil: ['load', 'domcontentloaded', 'networkidle0'],});
//   let lastPosition = await scrollPageToBottom(page, {
//     size: 500,
//     delay: 250
//   });
// const s = await page.$$(".ebbedaf8ac.ab26a5d2bd.e33c97ff6b");
// await s[2].click();

//  lastPosition = await scrollPageToBottom(page, {
//   size: 500,
//   delay: 250
// });
// date.setDate(date.getDate() + 1) 
// while(c && incr != 90)
// {
//    date1 = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`
// if(await page.$(`[data-date='${date1}']`) == null)
// {
// const v = await page.$('[aria-label="Следующий месяц"]')
//    await v.click()
//    lastPosition = await scrollPageToBottom(page, {
//     size: 500,
//     delay: 250
//   });
//   console.log("sss")
// }

// const j = await page.$eval(`[data-date='${date1}'] > div > span`,el => el.textContent)

// if(j == "—")
// {
//   incr++
//   date.setDate(date.getDate() + 1) 
//   c = true
// }
// else
// {
//   c = false
// }

// // })
// }
// if(incr == 90)
// {
//   const block = await page.$$eval(".a83ed08757.f88a5204c2.d1c4779e7a.b98133fb50", options => {
//     return options.map(option => option.getAttribute("href"))})
//   let id = ""
//   for (let i = 0; i < block.length; i++)
//   {
   
//     id = block[i]
   
//     test.push({0: id,1: 0,2: 0})
//   }
// }
// else
// {
// await page.$eval(`[data-date='${date1}']`,el => el.click())
// const s1 = await page.$$(".e22b782521.d12ff5f5bf > button")
// await s1[1].click()
// await page.waitForNavigation({
//   waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
// });
// const s2 = await page.$eval(".aab71f8e4e > a",el => el.getAttribute("href"))
// await page.goto(s2,{waitUntil: ['load', 'domcontentloaded', 'networkidle0']})
// lastPosition = await scrollPageToBottom(page, {
//   size: 500,
//   delay: 250
// });

// let id = ""
// const block = await page.$$(".js-rt-block-row.e2e-hprt-table-row")
// for (let i = 0; i < block.length; i++)
// {
//   const guest = await block[i].$eval(".c-occupancy-icons__adults ",el => el.querySelectorAll("i").length)
//   const price = await block[i].$eval(".prco-valign-middle-helper", el => el.textContent)
//   if(await block[i].$(".hprt-roomtype-link")) id = await block[i].$eval(".hprt-roomtype-link", el => el.getAttribute("href"))
// test.push({0: id,1: price,2: guest})
// }
// }
// console.log(test)
// // await page.$eval(,el => el.click())

// // console.log(d);
// // await browser.close();
// })()
//  const p = new Date();
//  p.setDate(p.getDate() + 1050)

//  console.log(`${p.getFullYear()}-${addZero(p.getMonth() + 1)}-${addZero(p.getDate())}`);
