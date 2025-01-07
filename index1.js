import puppeteer from "puppeteer";
import { scrollPageToBottom } from "puppeteer-autoscroll-down";
// import { scrollPageToTop } from "puppeteer-autoscroll-down";
import fs from "fs";
import { abort } from "process";
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

