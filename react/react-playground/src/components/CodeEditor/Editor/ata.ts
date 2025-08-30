import { setupTypeAcquisition } from '@typescript/ata'
import typescript from 'typescript';

export function createATA(onDownloadFile: (code: string, path: string) => void) {
  const ata = setupTypeAcquisition({
    projectName: 'my-ata',
    typescript: typescript,
    logger: console,
    delegate: {
      receivedFile: (code, path) => {  // code 是编辑器中输入的代码
        console.log('自动下载的包', path);
        onDownloadFile(code, path);
      }
    },
  })

  return ata;
}