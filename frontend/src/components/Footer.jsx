import { useState } from 'react'
import { Link } from 'react-router-dom'
import { business, services } from '../data.js'
import { subscribe } from '../api.js'

export default function Footer() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState(null)

  async function onSubscribe(e) {
    e.preventDefault()
    setMsg(null)
    try {
      const res = await subscribe(email)
      setMsg({ ok: true, text: res.message })
      setEmail('')
    } catch (err) {
      setMsg({ ok: false, text: err.fieldErrors?.email || err.message })
    }
  }

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="footer__brand">
            <span className="nav__logo">E</span>
            <span>{business.name}</span>
          </div>
          <p className="footer__muted">{business.tagline}</p>
          <p className="footer__muted">{business.address}</p>
          <p className="footer__muted">{business.hours}</p>
        </div>

        <div>
          <h4>Services</h4>
          {services.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`}>{s.title}</Link>
          ))}
        </div>

        <div>
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h4>Stay in touch</h4>
          <p className="footer__muted">Event tips &amp; offers, occasionally.</p>
          <form className="subscribe" onSubmit={onSubscribe}>
            <input type="email" required placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
            <button className="btn btn--sm btn--gold" type="submit">Join</button>
          </form>
          {msg && <small className={msg.ok ? 'subscribe__ok' : 'subscribe__err'}>{msg.text}</small>}
          <div className="footer__social">
            <a href={business.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={business.social.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a href={business.social.youtube} target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container">
          <span>© {year} {business.name}. All rights reserved.</span>
          <span className="footer__muted">Design & Developed by <a href=tel:8604438328">Anshika</a></span>
        </div>
      </div>
    </footer>
  )
}
