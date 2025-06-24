// const arr = [1, 1, 2, 2, 3, 3]
// const s = [...new Set(arr)]
// console.log(s);


const s = new Set()
s.add(1)
s.add(2)
s.add(3)
// s.delete(2)
// s.has(3)
// s.clear()
console.log(s);

// for (const item of s.values()) {
//   console.log(item);
// }

for (const item of s.keys()) {
  console.log(item);
}

