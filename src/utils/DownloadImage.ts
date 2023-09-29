import axios from 'axios';
import RNFS from 'react-native-fs';

const folderPath = `${RNFS.DocumentDirectoryPath}/imgs`; // Pasta onde você deseja salvar a imagem

export async function downloadImage(idItem: string, imageUrl: string) {

    RNFS.mkdir(folderPath)

    await axios.get(imageUrl, { responseType: 'arraybuffer' })
        .then(response => {
            // Extrair a extensão do arquivo da URL
            const urlParts = imageUrl.split('.');
            const extension = urlParts[urlParts.length - 1];

            // Definir um nome de arquivo aleatório
            const fileName = `${idItem}.${extension}`;

            // Caminho completo do arquivo, incluindo a pasta
            const imagePath = `${folderPath}/${fileName}`;

            RNFS.exists(imagePath)
            .then(fileExists => {
              if (fileExists) {
                // Se o arquivo já existe, exclua-o primeiro
                RNFS.unlink(imagePath)
                  .then(() => {
                    console.log('Arquivo existente excluído com sucesso:', imagePath);
                    // Continue com o processo de download aqui
                    saveImage();
                  })
                  .catch(err => {
                    console.error('Erro ao excluir arquivo existente:', err);
                  });
              } else {
                // Se o arquivo não existe, continue com o processo de download
                saveImage();
              }
            })
            .catch(err => {
              console.error('Erro ao verificar existência do arquivo:', err);
            });
      
          // Função para salvar a imagem
          const saveImage = () => {
            RNFS.writeFile(imagePath, response.data, 'base64')
              .then(() => {
                console.log('Imagem salva com sucesso:', imagePath);
      
                // Agora você pode armazenar o caminho da imagem (imagePath) em uma variável de estado, por exemplo.
              })
              .catch(err => {
                console.error('Erro ao salvar imagem:', err);
              });
          };
        })
        .catch(err => {
          console.error('Erro ao baixar imagem:', err);
        });
}
