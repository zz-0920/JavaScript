import { createCrawl, createCrawlOpenAI } from 'x-crawl'  // 爬虫工具
import dotenv from 'dotenv'  // 环境变量
dotenv.config()

// 创建爬虫
const crawlApp = createCrawl({
  maxRetry: 3,  // 重试次数
  intervalTime: {min: 1000, max: 3000},  // 重试间隔时间
})

// 创建 openai 爬虫
const crawlOpenAI = createCrawlOpenAI({
  clientOptions: {  // 配置参数
    apikey: process.env.OPENAI_API_KEY,
  },
  defaultModel: 'gpt-4.1',  // 默认模型
})


crawlApp.crawlPage('https://movie.douban.com/chart').then(async(res) => {
  // 获取到页面内容
  // console.log(res);
  
  const { page, browser } = res.data

  // 获取页面上的结构
  const targetSelector = '.article'
  await page.waitForSelector(targetSelector)
  const highlyHTML = await page.$eval(targetSelector, (el) => el.innerHTML) // 准换为 html 字符串

  // console.log(highlyHTML);
  // 让 ai 解析这份 html 字符串，解析出我们要的数据
  const result = await crawlOpenAI.parseElements(
    highlyHTML,
    `获取电影评分，将评分不小于 8.0 的电影的图片链接，电影名称，电影评分获取到。输格式为：
    [
      {
        img: '图片链接',
        name: '电影名称',
        score: '电影评分'
      }
    ]
    `
  )

  browser.close()
  console.log(result);
  
})