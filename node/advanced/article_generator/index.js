import { loadCorpus } from './lib/corpus.js'
import { createRandomPicker } from './lib/random.js'
import { generate } from './lib/generate.js'

const corpus = loadCorpus('./corpus/data.json')

const title = createRandomPicker(corpus.title)()
const article = generate(title, {corpus, min:2000, max:3000})
console.log(title);
console.log(article);