import axios from 'axios';
import cheerio from 'cheerio';
import { updateProduct } from './ProductFunctions';

export function searchProduct(id: any, url: any){
    // axios.get(url)
    //   .then(response => {
    //     if (response.status === 200) {
    //       // Analisar o HTML da página com Cheerio
    //       const $ = cheerio.load(response.data);

    //       // Exemplo: extrair texto de elementos com a classe 'titulo'
    //       const titles: string[] = [];
    //       $('.titulo').each((index, element) => {
    //         titles.push($(element).text());
    //       });

    //       // Atualizar o estado com os dados extraídos
    //       updateProduct(id, "name", "link", "img", "price") 
    //       return true;
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Erro ao buscar dados:', error);
    //     return false
    // });
    return false
}