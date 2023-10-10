import axios from 'axios';
import cheerio from 'cheerio';
import { updateProduct } from './ProductFunctions';

export function extractSiteName(url: string) {
  url = url.replace(/(https?:\/\/)?(www\.)?/, '');

  const match = url.match(/^([^.]+)/);

  return match ? match[0] : null;
}

async function aliexpressExtractProductInfo(id: string, url: string) {
  var status = false
  await axios.get(url)
    .then(response => {
      if (response.status === 200) {
        console.log(response.data)
        // const $ = cheerio.load(response.data);

        // var title: string = ""

        // var titleElement = $('[data-pl="product-title"]');
        // price = titleElement.text() || "";

        // var price: string = ""
        // $('.es--char53--VKKip5c').each((index, element) => {
        //   price += $(element).text()
        // });

        // updateProduct(id, title, "", price)
      }
      status = true
    })
    .catch(error => {
      status = false
      console.error('Erro ao buscar dados:', error);
    })
  return status
}

async function mercadolivreExtractProductInfo(id: string, url: string) {
  var status = false
  await axios.get(url)
    .then(response => {
      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        var title: string = ""
        $('.ui-pdp-title').each((index, element) => {
          title = $(element).text()
        });

        var price: string = ""
        $('.sc-d6a30908-1.WlsMM.finalPrice').each((index, element) => {
          price = $(element).text()
        });

        var priceElement = $('[itemprop="price"]');
        price = priceElement.attr('content') || "";

        updateProduct(id, title, "", price)
      }
      status = true
    })
    .catch(error => {
      status = false
      console.error('Erro ao buscar dados:', error);
    })
  return status
}

async function kabumExtractProductInfo(id: string, url: string) {
  var status = false
  await axios.get(url)
    .then(response => {
      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        var title: string = ""
        $('.sc-89bddf0f-6.dDYTAu').each((index, element) => {
          title = $(element).text()
        });

        ////////////////////////////////////////////////////////////////////////////////////////
        const firstDivWithImageClass = $('.sc-c6b13bf7-0.iPjIhU').first();
        const elementosComTitleTeste = firstDivWithImageClass.find(`[title="${title}"]`)

        const images = elementosComTitleTeste.find('img');
        // const firstDivWithImageClass = $('.sc-c6b13bf7-0.iPjIhU').first();
        // const images = firstDivWithImageClass.find('img');

        const img = $(images[1]).attr('src');
        console.log(img)

        var price: string = ""
        $('.sc-d6a30908-1.WlsMM.finalPrice').each((index, element) => {
          price = $(element).text()
        });

        updateProduct(id, title, "", price)
      }
      status = true
    })
    .catch(error => {
      status = false
      console.error('Erro ao buscar dados:', error);
    })
  return status
}

export async function searchProduct(id: any, url: any) {
  var status = false
  const siteName = extractSiteName(url)
  console.log(siteName)
  console.log(url)

  if (siteName == "kabum") {
    status = await kabumExtractProductInfo(id, url)
  } else if (siteName == "produto") {
    status = await mercadolivreExtractProductInfo(id, url)
  } else if (siteName == "pt") {
    status = false //await aliexpressExtractProductInfo(id, url)
  }
  return status
}