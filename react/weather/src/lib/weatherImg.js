import qing from '../images/qingtian.png'
import duoyun from '../images/qingduoyun.png'
import yin from '../images/mti-yin.png'
import xiaoyu from '../images/xiaoyu.png'
import leizhenyu from '../images/tianqitubiao_leizhenyu.png'

export function formateWeatherImg(str) {
  switch (str) {
    case '晴':
      return qing
    case '多云':
      return duoyun
    case '阴':
      return yin
    case '小雨':
      return xiaoyu
    case '雷阵雨':
      return leizhenyu
  }
}