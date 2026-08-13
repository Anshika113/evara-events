import { useState } from 'react'

// Renders the first working image from one or more sources; if none load it
// removes itself, revealing the gradient on the parent. Precedence:
// local file → themed stock → generic stock → gradient.
export default function SmartImage({ src, alt = '', className = '' }) {
  const sources = (Array.isArray(src) ? src : [src]).filter(Boolean)
  const [idx, setIdx] = useState(0)
  if (idx >= sources.length) return null
  return (
    <img
      src={sources[idx]}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setIdx((i) => i + 1)}
    />
  )
}
