import RNFS from 'react-native-fs';

export const getPathDownloads = () => RNFS.DownloadDirectoryPath;

export const fsDownloadFile = async (url: string, destinationPath: string) => {
  try {
    const result = await RNFS.downloadFile({
      fromUrl: url,
      toFile: destinationPath,
    }).promise;

    if (result.statusCode === 200) {
      console.log('Archivo descargado con éxito', destinationPath);
    } else {
      console.log('Error al descargar el archivo', result.statusCode);
    }
  } catch (error) {
    console.error(error);
  }
};

export const fsMoveFile = (sourcePath: string, destinationPath: string) => {
  RNFS.moveFile(sourcePath, destinationPath)
    .then(() => {
      console.log(
        `Archivo movido con éxito de ${sourcePath} a ${destinationPath}`,
      );
    })
    .catch(error => {
      console.error('Error al mover el archivo:', error);
    });
};
