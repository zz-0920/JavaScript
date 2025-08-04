import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

if (typeof __dirname === 'undefined') {
  globalThis.__dirname = dirname(fileURLToPath(import.meta.url))
}

export function loadCorpus(src) {  // ./corpus/data.json
  const path = resolve(__dirname, '..', src)
  const data = readFileSync(path, { encoding: 'utf-8' })
  return JSON.parse(data)
}