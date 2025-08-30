import { filenameLanguage } from "./utils"
import main from './template/main.tsx?raw'
import App from './template/App.tsx?raw'
import AppCss from './template/App.css?raw'
import importMap from './template/import-map.json?raw'


export const ENTRY_FILE_NAME = 'main.tsx'  // app入口文件
export const APP_COMPONENT_FILE_NAME = 'App.tsx'  // app组件文件
export const IMPORT_MAP_FILE_NAME = 'import_map.json'  // 导入映射文件

export const initFiles = {
  [ENTRY_FILE_NAME]: {
    name: ENTRY_FILE_NAME,
    language: filenameLanguage(ENTRY_FILE_NAME),
    value: main,
  },
  [APP_COMPONENT_FILE_NAME]: {
    name: APP_COMPONENT_FILE_NAME,
    language: filenameLanguage(APP_COMPONENT_FILE_NAME),
    value: App,
  },
  'App.css': {
    name: 'App.css',
    language: 'css',
    value: AppCss,
  },
  [IMPORT_MAP_FILE_NAME]: {
    name: IMPORT_MAP_FILE_NAME,
    language: filenameLanguage(IMPORT_MAP_FILE_NAME),
    value: importMap,
  }
}