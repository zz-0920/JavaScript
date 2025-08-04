export function randomInt(min, max) {  // 生成一个 >= min 且 < max 之间的随机整数
  const p = Math.random()
  return Math.floor(min * (1 - p) + max * p)
}

export function createRandomPicker(arr) {
  arr = [...arr]
  function randomPick() {
    const len = arr.length - 1
    const index = randomInt(0, len)
    const picked = arr[index];
    [arr[index], arr[len]] = [arr[len], arr[index]]
    return picked
  }
  randomPick()  // 抛弃第一次的选中结果
  return randomPick
}