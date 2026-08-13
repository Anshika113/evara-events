# Images — drop your photos here

Out of the box the site shows **free stock photos** so it looks finished
immediately. The load order for every image is:

> **your local file → themed stock photo → generic stock photo → gradient tile**

So the moment you drop a file at one of the paths below, it **overrides** the
stock photo — no code changes. If a photo fails to load, the gradient shows, so
nothing ever breaks (online or offline).

Quickest way to fill them all with stock photos: run `node download-images.js`
in the `frontend` folder.

## Files used

**Hero** (`hero/`)
`main.jpg` · `a.jpg` · `b.jpg`

**Services** (`services/`)
`weddings.jpg` · `corporate.jpg` · `birthdays.jpg` · `decor.jpg` · `catering.jpg`

**Portfolio** (`portfolio/`)
`p1.jpg` … `p9.jpg`

## Tips
- Compress before uploading (squoosh.app / tinypng.com) — aim for < 300 KB each.
- Images are cropped to fill (`object-fit: cover`); portrait or landscape both work.
- To change captions/categories or add items, edit `src/data.js`.
