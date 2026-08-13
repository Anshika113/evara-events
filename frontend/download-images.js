/**
 * Downloads free-licensed event/wedding photos into public/images/ so the site
 * shows real photography that also works offline. Themed photos come from
 * LoremFlickr; if one isn't available it falls back to a generic Picsum photo.
 *
 * Run once from the `frontend` folder:
 *     node download-images.js
 *
 * To use your OWN pictures, drop files with the same names into public/images/
 * (they take priority automatically).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, 'public', 'images')

// [outputPath, keywords, lock, picsumSeed, width, height]
const targets = [
  ['hero/main.jpg', 'wedding,decor,celebration', 31, 'evara-main', 900, 1100],
  ['hero/a.jpg', 'wedding,flowers', 32, 'evara-a', 700, 700],
  ['hero/b.jpg', 'party,event', 33, 'evara-b', 700, 700],
  ['services/weddings.jpg', 'wedding,mandap', 41, 'svc-wed', 900, 700],
  ['services/corporate.jpg', 'conference,corporate,event', 42, 'svc-corp', 900, 700],
  ['services/birthdays.jpg', 'birthday,party,balloons', 43, 'svc-bday', 900, 700],
  ['services/decor.jpg', 'floral,decor,stage', 44, 'svc-decor', 900, 700],
  ['services/catering.jpg', 'catering,food,buffet', 45, 'svc-cater', 900, 700],
  ['portfolio/p1.jpg', 'wedding,beach', 51, 'pf1', 800, 1000],
  ['portfolio/p2.jpg', 'corporate,stage', 52, 'pf2', 800, 1000],
  ['portfolio/p3.jpg', 'birthday,kids', 53, 'pf3', 800, 1000],
  ['portfolio/p4.jpg', 'floral,mandap', 54, 'pf4', 800, 1000],
  ['portfolio/p5.jpg', 'wedding,dance', 55, 'pf5', 800, 1000],
  ['portfolio/p6.jpg', 'conference,audience', 56, 'pf6', 800, 1000],
  ['portfolio/p7.jpg', 'party,gala', 57, 'pf7', 800, 1000],
  ['portfolio/p8.jpg', 'stage,lights,decor', 58, 'pf8', 800, 1000],
  ['portfolio/p9.jpg', 'wedding,palace', 59, 'pf9', 800, 1000],
]

async function get(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, redirect: 'follow' })
  if (!res.ok) throw new Error('HTTP ' + res.status)
  return Buffer.from(await res.arrayBuffer())
}

async function download(out, kw, lock, seed, w, h) {
  const full = path.join(OUT, out)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  let buf
  try {
    buf = await get(`https://loremflickr.com/${w}/${h}/${kw}?lock=${lock}`)
    if (buf.length < 3000) throw new Error('too small')
  } catch {
    buf = await get(`https://picsum.photos/seed/${seed}/${w}/${h}`)
  }
  fs.writeFileSync(full, buf)
  console.log(`✓ ${out.padEnd(26)} ${(buf.length / 1024).toFixed(0)} KB`)
}

console.log('Downloading photos into public/images/ …\n')
let ok = 0
for (const t of targets) {
  try { await download(...t); ok++ }
  catch (e) { console.log(`✗ ${t[0]} — ${e.message} (gradient will show)`) }
}
console.log(`\nDone: ${ok}/${targets.length} images saved. Refresh the site to see them.`)
