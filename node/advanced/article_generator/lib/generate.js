import { randomInt, createRandomPicker } from './random.js'

function sentence(pick, replacer) {
  let ret = pick()
  for (const key in replacer) {  // key: said, title ....
    ret = ret.replace(new RegExp(`{{${key}}}`, 'g'),  replacer[key])
  }
  return ret
}


export function generate(title, {corpus, min=1000, max=2000}) {
  const articleLength = randomInt(min, max)
  const { famous, bosh_before, bosh, said, conclude } = corpus
  const [pickFamous, pickBoshBefore, pickBosh, pickSaided, pickConclude] = [famous, bosh_before, bosh, said, conclude].map(createRandomPicker)

  const article = []
  let totalLength = 0

  while (totalLength < articleLength) {
    let section = ''
    const sectionLength = randomInt(200, 500)
    // 生成段落
    while (section.length < sectionLength) {
      const n = randomInt(0, 100)
      if (n < 20) {
        section += sentence(pickFamous, {said: pickSaided(), conclude: pickConclude()})
      } else if (n < 50) {
        section += sentence(pickBoshBefore, {title}) + sentence(pickBosh, {title})
      } else {
        section += sentence(pickBosh, {title})
      }
    }
    article.push(section)
    totalLength += sectionLength
  }

  return article
}

