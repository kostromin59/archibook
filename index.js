console.log("f")
import images from "./images.json"

const sort = ["6980", "7354", "7352", "6909", "7020", "3064", "3076", "3069", "3085", "7357"]

const first = sort.map((s) => images.find((img) => img.includes(s)))

const firstDay = images.filter((img) => img.startsWith("WP") && !first.includes(img));
const secondDay = images.filter((img) => !img.startsWith("WP") && !first.includes(img));

const sorted = [...first, ...firstDay, ...secondDay]

const html = sorted.reduce((acc, img) => {
  const url = `./converted/${img}.webp`
  acc += `<a href="${url}" target="_blank"><img src="${url}" alt="Фото с выставки" loading="lazy" /></a>`
  
  return acc
}, "")


document.getElementById("image-container").innerHTML = html
